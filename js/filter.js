// DOMContentLoaded: 문서가 모두 로드되면 실행
// 카드 목록, 필터, 로딩/빈 상태 안내 등 모든 주요 기능에 주석 추가

document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소 참조
  const cardList = document.getElementById("card-list"); // 카드 목록 영역
  const feeRange = document.getElementById("fee-range"); // 연회비 슬라이더
  const feeValue = document.getElementById("fee-value"); // 연회비 값 표시
  const benefitFilters = document.getElementById("benefit-filters"); // 혜택 체크박스 영역
  const loadingSpinner = document.getElementById("loading-spinner"); // 로딩 스피너
  const emptyState = document.getElementById("empty-state"); // 빈 상태 안내
  const showFavBtn = document.getElementById("show-favorites-btn"); // 즐겨찾기 모아보기 버튼
  let showOnlyFav = false; // 현재 즐겨찾기만 보는지 여부

  // brand(카드사) 필터 드롭다운 요소 참조
  const brandFilter = document.getElementById("brand-filter");

  // 반응형 안내: 모바일에서만 안내 메시지 표시 (선택적)
  if (window.innerWidth < 500) {
    // 예시: 모바일에서만 안내 메시지 표시 (원하면 삭제 가능)
    // alert('모바일 환경에서는 좌우로 스크롤하여 더 많은 카드를 볼 수 있습니다.');
  }

  // 카드 데이터 fetch 및 렌더링
  loadingSpinner.style.display = "block"; // 로딩 스피너 표시
  fetch("/data/cards.json")
    .then((res) => res.json())
    .then((cards) => {
      loadingSpinner.style.display = "none"; // 로딩 스피너 숨김

      // 모든 혜택 종류 추출 (중복 제거)
      const allBenefits = Array.from(
        new Set(cards.flatMap((card) => card.benefits))
      );
      // 혜택 체크박스 동적 생성
      benefitFilters.innerHTML = allBenefits
        .map(
          (benefit) => `
        <label style="margin-right:1rem;">
          <input type="checkbox" name="benefit" value="${benefit}"> ${benefit}
        </label>
      `
        )
        .join("");

      // 모든 카드사(brand) 종류 추출 (중복 제거)
      const allBrands = Array.from(new Set(cards.map((card) => card.brand)));
      // 카드사 옵션 동적 생성
      allBrands.forEach((brand) => {
        const opt = document.createElement("option");
        opt.value = brand;
        opt.textContent = brand;
        brandFilter.appendChild(opt);
      });

      // 즐겨찾기 카드 id 배열 반환
      function getFavoriteIds() {
        return JSON.parse(localStorage.getItem("favoriteCards") || "[]");
      }

      // 즐겨찾기 모아보기 버튼 클릭 이벤트
      showFavBtn.addEventListener("click", () => {
        showOnlyFav = !showOnlyFav;
        showFavBtn.textContent = showOnlyFav
          ? "☆ 전체 카드 보기"
          : "★ 즐겨찾기 모아보기";
        filterCards(); // 필터링 함수 재실행
      });

      // 카드 렌더링 함수
      function render(filteredCards) {
        // 빈 상태 안내 처리
        if (filteredCards.length === 0) {
          cardList.innerHTML = "";
          emptyState.style.display = "block";
        } else {
          emptyState.style.display = "none";
          // 카드 목록 HTML 생성
          cardList.innerHTML = filteredCards
            .map(
              (card) => `
            <div class="card" onclick="location.href='card-detail.html?id=${
              card.id
            }'">
              <img src="${card.image}" alt="${card.name}" class="card-img" />
              <h2 class="card-name">${card.name}</h2>
              <p class="card-brand">${card.brand}</p>
              <p class="card-fee">연회비: ${card.fee.toLocaleString()}원</p>
              <ul class="card-benefits">
                ${card.benefits.map((b) => `<li>${b}</li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("");
        }
      }

      // 필터링 함수: 연회비/혜택 조건에 따라 카드 목록 필터링
      function filterCards() {
        const maxFee = Number(feeRange.value); // 선택된 최대 연회비
        const checkedBenefits = Array.from(
          document.querySelectorAll("input[name=benefit]:checked")
        ).map((cb) => cb.value); // 선택된 혜택
        const selectedBrand = brandFilter.value; // 선택된 카드사
        if (maxFee === 100000) {
          feeValue.textContent = "전체";
        } else if (maxFee >= 1000000) {
          feeValue.textContent = maxFee / 1000000 + "백만원";
        } else if (maxFee >= 10000) {
          feeValue.textContent = maxFee / 10000 + "만원";
        } else {
          feeValue.textContent = maxFee.toLocaleString() + "원";
        }
        let filtered = cards.filter((card) => card.fee <= maxFee);
        if (checkedBenefits.length > 0) {
          filtered = filtered.filter((card) =>
            checkedBenefits.every((b) => card.benefits.includes(b))
          );
        }
        // 카드사 필터 적용
        if (selectedBrand) {
          filtered = filtered.filter((card) => card.brand === selectedBrand);
        }
        // 즐겨찾기 모아보기 적용
        if (showOnlyFav) {
          const favIds = getFavoriteIds();
          filtered = filtered.filter((card) => favIds.includes(card.id));
        }
        render(filtered);
      }

      // 필터 이벤트 바인딩
      feeRange.addEventListener("input", filterCards);
      benefitFilters.addEventListener("change", filterCards);
      brandFilter.addEventListener("change", filterCards);

      // 최초 렌더링
      render(cards);
    })
    .catch((err) => {
      loadingSpinner.style.display = "none";
      cardList.innerHTML =
        '<p style="color:red;">카드 데이터를 불러오지 못했습니다.</p>';
    });

  // ===== 다크/라이트 모드 토글 버튼 기능 =====
  (function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const body = document.body;
    // 현재 모드(localStorage 또는 시스템)
    function getSystemTheme() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    function applyTheme(theme) {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        btn.textContent = "☀️ 라이트모드";
      } else {
        body.classList.remove("dark-mode");
        btn.textContent = "🌙 다크모드";
      }
    }
    // 초기 적용
    const saved = localStorage.getItem("theme");
    const initial = saved || getSystemTheme();
    applyTheme(initial);
    // 버튼 클릭 시 토글
    btn.onclick = () => {
      const now = body.classList.contains("dark-mode") ? "dark" : "light";
      const next = now === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    };
    // 시스템 테마 변경 감지(수동 선택 없을 때만)
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme"))
          applyTheme(e.matches ? "dark" : "light");
      });
  })();

  // ===== 유입경로 기록 (메인 페이지 로드 시) =====
  (function () {
    try {
      const ref = document.referrer;
      if (ref && !ref.includes(window.location.hostname)) {
        const stats = JSON.parse(localStorage.getItem("refStats") || "{}");
        stats[ref] = (stats[ref] || 0) + 1;
        localStorage.setItem("refStats", JSON.stringify(stats));
      }
    } catch (e) {}
  })();

  // ===== Firebase 인증 UI 연동 =====
  (function () {
    if (!window.firebase || !window.auth) return;
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const adminLink = document.getElementById("admin-link");
    const userEmail = document.getElementById("user-email");
    const authModal = document.getElementById("auth-modal");
    const authForm = document.getElementById("auth-form");
    const authEmail = document.getElementById("auth-email");
    const authPw = document.getElementById("auth-pw");
    const doLogin = document.getElementById("do-login");
    const doSignup = document.getElementById("do-signup");
    const closeAuthModal = document.getElementById("close-auth-modal");
    const authMsg = document.getElementById("auth-msg");

    // 모달 열기/닫기
    loginBtn.onclick = () => {
      authModal.style.display = "flex";
      authMsg.textContent = "";
    };
    closeAuthModal.onclick = () => {
      authModal.style.display = "none";
    };

    // 로그인
    doLogin.onclick = (e) => {
      e.preventDefault();
      signIn(authEmail.value, authPw.value)
        .then(() => {
          authModal.style.display = "none";
        })
        .catch((err) => {
          authMsg.textContent = err.message;
        });
    };
    // 회원가입
    doSignup.onclick = (e) => {
      e.preventDefault();
      signUp(authEmail.value, authPw.value)
        .then(() => {
          authMsg.textContent = "회원가입 성공! 로그인 해주세요.";
        })
        .catch((err) => {
          authMsg.textContent = err.message;
        });
    };
    // 로그아웃
    logoutBtn.onclick = () => {
      signOut();
    };

    // 인증 상태 변화에 따라 UI 변경
    onAuthStateChanged((user) => {
      if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "";
        userEmail.textContent = user.email;
        if (isAdmin(user)) {
          adminLink.style.display = "";
        } else {
          adminLink.style.display = "none";
        }
      } else {
        loginBtn.style.display = "";
        logoutBtn.style.display = "none";
        userEmail.textContent = "";
        adminLink.style.display = "none";
      }
    });
  })();
});
