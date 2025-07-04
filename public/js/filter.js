// 단위 변환 함수 (숫자+단위 형태로 반환)
function getFeeUnit(val, lang) {
  if (lang.startsWith("ko")) {
    if (val >= 100000000) return val / 100000000 + " 억원";
    if (val >= 10000000) return val / 10000000 + " 천만원";
    if (val >= 1000000) return val / 1000000 + " 백만원";
    if (val >= 10000) return val / 10000 + " 만 원";
    if (val >= 1000) return val / 1000 + " 천 원";
    return val + " 원";
  } else {
    return val + " KRW";
  }
}

function updateFeeUnit(val) {
  const lang = navigator.language || "ko";
  feeUnit.textContent = getFeeUnit(val, lang);
}

// 입력 박스 min-width 스타일 적용 (텀브 크기 고정)
feeInput.style.minWidth = "60px";
