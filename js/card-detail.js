// DOMContentLoaded: 문서가 모두 로드되면 실행
// 카드 상세, 즐겨찾기, 공유 등 모든 주요 기능에 주석 추가

document.addEventListener("DOMContentLoaded", () => {
  // 쿼리스트링에서 id 추출
  const params = new URLSearchParams(window.location.search);
  const cardId = params.get("id");
  const detailDiv = document.getElementById("card-detail");

  // 즐겨찾기 상태 확인 함수 (로컬스토리지)
  function isFavorite(id) {
    const favs = JSON.parse(localStorage.getItem("favoriteCards") || "[]");
    return favs.includes(id);
  }

  // 즐겨찾기 토글 함수
  function toggleFavorite(id) {
    let favs = JSON.parse(localStorage.getItem("favoriteCards") || "[]");
    if (favs.includes(id)) {
      favs = favs.filter((f) => f !== id);
    } else {
      favs.push(id);
    }
    localStorage.setItem("favoriteCards", JSON.stringify(favs));
  }

  // 카드 데이터 fetch
  fetch("/data/cards.json")
    .then((res) => res.json())
    .then((cards) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card) {
        detailDiv.innerHTML = "<p>카드를 찾을 수 없습니다.</p>";
        return;
      }

      // 즐겨찾기 버튼 텍스트 결정
      const favText = isFavorite(card.id)
        ? "★ 즐겨찾기 해제"
        : "☆ 즐겨찾기 추가";

      // 카드 상세 HTML 생성 (즐겨찾기, 공유 버튼 포함)
      detailDiv.innerHTML = `
        <div class="card card-detail-view" style="max-width:400px;margin:2rem auto;">
          <img src="${card.image}" alt="${
        card.name
      }" class="card-img" style="width:120px;height:70px;" />
          <h2 class="card-name">${card.name}</h2>
          <p class="card-brand">${card.brand}</p>
          <p class="card-fee">연회비: ${card.fee.toLocaleString()}원</p>
          <ul class="card-benefits">
            ${card.benefits.map((b) => `<li>${b}</li>`).join("")}
          </ul>
          <p class="card-desc" style="margin-top:1rem;">${card.description}</p>
          <!-- 카드 신청하기 버튼 (제휴 링크) -->
          ${
            card.applyUrl
              ? `<a href="${card.applyUrl}" target="_blank" class="apply-btn" style="display:inline-block;margin-top:1.5rem;padding:0.7rem 1.5rem;background:#0077c2;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">카드 신청하기</a>`
              : ""
          }
          <div style="margin-top:1.5rem;display:flex;gap:0.7rem;justify-content:center;">
            <!-- 즐겨찾기 버튼 -->
            <button id="fav-btn" style="padding:0.5rem 1.2rem;">${favText}</button>
            <!-- 공유 버튼 -->
            <button id="share-btn" style="padding:0.5rem 1.2rem;">공유하기</button>
          </div>
          <button onclick="window.history.back()" style="margin-top:1.5rem;">목록으로 돌아가기</button>
        </div>
      `;

      // 즐겨찾기 버튼 이벤트 바인딩
      const favBtn = document.getElementById("fav-btn");
      favBtn.addEventListener("click", () => {
        toggleFavorite(card.id);
        // 버튼 텍스트 즉시 갱신
        favBtn.textContent = isFavorite(card.id)
          ? "★ 즐겨찾기 해제"
          : "☆ 즐겨찾기 추가";
      });

      // 공유 버튼 이벤트 바인딩
      const shareBtn = document.getElementById("share-btn");
      shareBtn.addEventListener("click", () => {
        const shareData = {
          title: card.name,
          text: `${card.name} 카드 혜택을 확인해보세요!`,
          url: window.location.href,
        };
        // Web Share API 지원 시
        if (navigator.share) {
          navigator.share(shareData).catch(() => {});
        } else {
          // 미지원 시 트위터 공유 링크로 대체
          const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareData.text
          )}&url=${encodeURIComponent(shareData.url)}`;
          window.open(twUrl, "_blank");
        }
      });

      // (선택) 상세 페이지의 SEO 메타태그/JSON-LD도 JS에서 동적으로 갱신 가능
      // ... (필요시 추가)
    });
});
