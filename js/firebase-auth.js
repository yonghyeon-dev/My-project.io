// Firebase 인증 연동 예시 (회원가입/로그인/로그아웃/관리자 식별)
// 실제 firebaseConfig는 Firebase 콘솔에서 복사해 아래에 입력하세요.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID",
};
// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 관리자 이메일(예시)
const ADMIN_EMAIL = "admin@yourdomain.com";

// 회원가입
function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
// 로그인
function signIn(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
// 로그아웃
function signOut() {
  return auth.signOut();
}
// 현재 로그인한 사용자가 관리자 여부 확인
function isAdmin(user) {
  return user && user.email === ADMIN_EMAIL;
}
// 인증 상태 변화 감지(콜백)
function onAuthStateChanged(cb) {
  auth.onAuthStateChanged(cb);
}
