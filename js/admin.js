// 관리자 대시보드: 로컬스토리지 기반 통계 시각화
// - 카드 클릭수: localStorage.cardClicks (id별 카운트)
// - 즐겨찾기: localStorage.favoriteCards (id 배열)
// - 필터 사용: localStorage.filterHistory (조건별 카운트)
// 모든 주요 코드에 주석 포함

document.addEventListener("DOMContentLoaded", () => {
  // 카드 데이터 불러오기
  fetch("/data/cards.json")
    .then((res) => res.json())
    .then((cards) => {
      // 카드 id → name 매핑
      const cardMap = {};
      cards.forEach((card) => {
        cardMap[card.id] = card.name;
      });

      // 1. 카드별 클릭수 (차트 + 표)
      const clickData = JSON.parse(localStorage.getItem("cardClicks") || "{}");
      const clickTable = document.querySelector("#click-table tbody");
      // 최대 클릭수(시각화용)
      const maxClick = Math.max(1, ...Object.values(clickData));
      clickTable.innerHTML = Object.keys(cardMap)
        .map((id) => {
          const cnt = clickData[id] || 0;
          return `<tr><td>${
            cardMap[id]
          }</td><td>${cnt}</td><td><div class=\"bar\" style=\"width:${
            (cnt / maxClick) * 180
          }px\"></div></td></tr>`;
        })
        .join("");
      // 카드별 클릭수 차트 (Chart.js)
      const clickLabels = Object.keys(cardMap).map((id) => cardMap[id]);
      const clickCounts = Object.keys(cardMap).map((id) => clickData[id] || 0);
      const ctx = document.getElementById("clickChart").getContext("2d");
      new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: clickLabels,
          datasets: [
            {
              label: "카드 클릭수",
              data: clickCounts,
              backgroundColor: "#181818",
              borderRadius: 6,
              maxBarThickness: 48,
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#222", font: { weight: 600 } },
            },
            y: {
              grid: { color: "#eee" },
              ticks: { color: "#222" },
              beginAtZero: true,
            },
          },
        },
      });

      // 2. 카드별 즐겨찾기 여부
      const favs = JSON.parse(localStorage.getItem("favoriteCards") || "[]");
      const favTable = document.querySelector("#fav-table tbody");
      favTable.innerHTML = Object.keys(cardMap)
        .map((id) => {
          const isFav = favs.includes(id);
          return `<tr><td>${cardMap[id]}</td><td>${isFav ? "★" : ""}</td></tr>`;
        })
        .join("");

      // 3. 필터 사용 내역
      const filterData = JSON.parse(
        localStorage.getItem("filterHistory") || "{}"
      );
      const filterTable = document.querySelector("#filter-table tbody");
      // 내림차순 정렬
      const filterRows = Object.entries(filterData).sort((a, b) => b[1] - a[1]);
      filterTable.innerHTML = filterRows
        .map(([cond, cnt]) => `<tr><td>${cond}</td><td>${cnt}</td></tr>`)
        .join("");
    });
});

// ===== 탭 전환 기능 =====
document.getElementById("tab-stats").onclick = function () {
  document.getElementById("section-stats").style.display = "";
  document.getElementById("section-ref").style.display = "none";
  this.style.fontWeight = "700";
  document.getElementById("tab-ref").style.fontWeight = "400";
};
document.getElementById("tab-ref").onclick = function () {
  document.getElementById("section-stats").style.display = "none";
  document.getElementById("section-ref").style.display = "";
  this.style.fontWeight = "700";
  document.getElementById("tab-stats").style.fontWeight = "400";
};

// ===== 유입경로 통계 시각화 =====
(function () {
  const refData = JSON.parse(localStorage.getItem("refStats") || "{}");
  const total = Object.values(refData).reduce((a, b) => a + b, 0) || 1;
  const refRows = Object.entries(refData).sort((a, b) => b[1] - a[1]);
  // 표
  const refTable = document.querySelector("#ref-table tbody");
  refTable.innerHTML = refRows
    .map(
      ([ref, cnt]) =>
        `<tr><td>${ref}</td><td>${cnt}</td><td>${((cnt / total) * 100).toFixed(
          1
        )}%</td></tr>`
    )
    .join("");
  // 차트
  if (refRows.length > 0 && window.Chart) {
    const ctx = document.getElementById("refChart").getContext("2d");
    new window.Chart(ctx, {
      type: "pie",
      data: {
        labels: refRows.map(([ref]) =>
          ref.length > 40 ? ref.slice(0, 37) + "..." : ref
        ),
        datasets: [
          {
            data: refRows.map(([_, cnt]) => cnt),
            backgroundColor: [
              "#181818",
              "#444",
              "#888",
              "#bbb",
              "#222",
              "#555",
              "#999",
              "#ccc",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#222", font: { weight: 600 } },
          },
        },
      },
    });
  }
})();
