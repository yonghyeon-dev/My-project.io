# 카드 혜택 비교툴 데이터 자동화 (Google Sheets → JSON)

## 목적

- 카드 데이터를 구글시트에서 관리하면, 비개발자도 쉽게 수정/추가 가능
- 시트 데이터를 JSON으로 변환해 `/data/cards.json`에 바로 활용

---

## 1. 구글시트 데이터 예시

| id    | name             | brand  | fee   | benefits                | image             | description                    | applyUrl                              |
| ----- | ---------------- | ------ | ----- | ----------------------- | ----------------- | ------------------------------ | ------------------------------------- |
| card1 | YH 프리미엄 카드 | VISA   | 30000 | 항공 마일리지,영화 할인 | /assets/card1.png | 항공 마일리지 적립과 영화 할인 | https://your-affiliate-link.com/card1 |
| card2 | YH 실속 카드     | Master | 10000 | 커피 할인,대중교통 할인 | /assets/card2.png | 커피와 대중교통 할인 특화      | https://your-affiliate-link.com/card2 |

- `benefits`는 쉼표로 구분

---

## 2. 구글 앱스 스크립트로 JSON 변환

1. 구글시트 → 확장 프로그램 → 앱스 스크립트 열기
2. 아래 코드 붙여넣기 (주석 참고)

```javascript
/**
 * 시트 데이터를 JSON으로 변환해주는 웹앱
 * 시트 첫 행: 필드명(id, name, ...)
 * benefits는 쉼표로 분리하여 배열로 변환
 */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const fields = data[0];
  const json = data.slice(1).map((row) => {
    const obj = {};
    fields.forEach((f, i) => {
      if (f === "fee") obj[f] = Number(row[i]);
      else if (f === "benefits")
        obj[f] = String(row[i])
          .split(",")
          .map((s) => s.trim());
      else obj[f] = row[i];
    });
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

3. 배포 → 새 배포 → 웹앱으로 배포(익명 액세스 허용)
4. 배포 URL로 접속하면 JSON 데이터 확인 가능

---

## 3. 활용 방법

- 위 웹앱 URL에서 JSON을 다운받아 `/data/cards.json`에 저장
- (자동화) `curl` 등으로 주기적으로 받아올 수도 있음

```bash
curl -o data/cards.json "https://script.google.com/macros/s/웹앱-URL/exec"
```

---

## 4. 참고/팁

- 시트에서 데이터만 수정하면, 사이트에 바로 반영 가능
- benefits, fee 등 타입 변환에 주의 (주석 참고)
- 더 고급 자동화(깃허브 액션, Netlify 등)도 연동 가능

---

# Firebase 인증 기반 회원가입/로그인/관리자 기능 적용법

## 1. Firebase 프로젝트 생성

- [Firebase 콘솔](https://console.firebase.google.com/)에서 새 프로젝트 생성

## 2. Authentication(이메일/비밀번호) 활성화

- 좌측 메뉴 'Authentication' → 'Sign-in method' → 'Email/Password' 활성화

## 3. firebaseConfig 복사 및 적용

- '프로젝트 설정' → '일반' → '내 앱에 Firebase 추가' → '웹 앱' 선택
- 아래와 같은 설정 코드 복사

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "...",
};
```

- `/js/firebase-auth.js`의 상단에 복사한 값으로 덮어쓰기

## 4. 관리자 이메일 지정

- `/js/firebase-auth.js`에서 `ADMIN_EMAIL` 값을 원하는 관리자 이메일로 변경

```js
const ADMIN_EMAIL = "admin@yourdomain.com";
```

- 이 이메일로 가입한 계정만 관리자 권한을 가짐

## 5. 배포 및 테스트

- index.html에서 로그인/회원가입/로그아웃/관리자 메뉴가 정상 동작하는지 확인
- admin.html에 로그인하지 않거나 관리자가 아니면 접근 불가(리다이렉트)
- 관리자 계정으로 로그인 시 admin.html에서 통계/관리자 기능 확인

## 6. 추가 팁

- Firebase 무료 플랜(Blaze)으로 소규모 서비스 충분
- 구글/카카오 등 소셜 로그인도 Firebase 콘솔에서 추가 가능
- 관리자 권한을 여러 명에게 부여하려면 ADMIN_EMAIL을 배열로 관리하거나, DB에 isAdmin flag를 추가해 확장 가능

---

**질문/확장 요청이 있으면 언제든 말씀해 주세요!**
