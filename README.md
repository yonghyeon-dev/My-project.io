# CardCompare Pro

AI 기반 신용카드 추천 및 비교 플랫폼

## 🚀 프로젝트 개요

CardCompare Pro는 사용자에게 가장 적합한 신용카드를 찾아주는 현대적인 웹 애플리케이션입니다. [Card Gorilla](https://www.card-gorilla.com/home)를 참고하여 개발되었으며, 더욱 직관적이고 사용자 친화적인 인터페이스를 제공합니다.

## ✨ 주요 기능

### 🏠 홈페이지

- **AI 기반 카드 추천**: 사용자 패턴 분석을 통한 맞춤형 추천
- **실시간 검색**: 카드명, 브랜드, 혜택으로 즉시 검색
- **스마트 필터링**: 연회비, 브랜드, 카테고리, 혜택별 필터링
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

### 🔍 카드 상세 페이지

- **종합 정보**: 카드의 모든 정보를 한눈에 확인
- **탭 기반 레이아웃**: 개요, 혜택, 리뷰, 비교 탭으로 구성
- **즐겨찾기 기능**: 관심 카드 저장 및 관리
- **직접 신청**: 공식 사이트로 바로 연결

### ⚖️ 카드 비교 페이지

- **최대 3개 카드 비교**: 선택한 카드들을 상세 비교
- **직관적 테이블**: 연회비, 혜택, 평점 등을 한눈에 비교
- **동적 카드 선택**: 비교할 카드를 자유롭게 선택/제거

### ❤️ 즐겨찾기 페이지

- **개인 카드 관리**: 관심 카드들을 체계적으로 관리
- **로컬 스토리지**: 브라우저에 안전하게 저장
- **빠른 액세스**: 저장된 카드로 즉시 접근

## 🛠️ 기술 스택

### Frontend

- **React 18**: 최신 React 기능 활용
- **Vite**: 빠른 개발 환경 및 빌드 도구
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Framer Motion**: 부드러운 애니메이션 효과
- **Lucide React**: 현대적인 아이콘 라이브러리

### 상태 관리 & 라우팅

- **React Router DOM**: SPA 라우팅
- **React Query**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리

### 개발 도구

- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 후처리
- **Autoprefixer**: 브라우저 호환성

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 16.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 환경 설정

```bash
# 개발 환경
npm run dev

# 프로덕션 환경
npm run build && npm run preview
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: 파란색 계열 (#3B82F6 ~ #1E3A8A)
- **Secondary**: 회색 계열 (#64748B ~ #0F172A)
- **Success**: 초록색 (#10B981)
- **Warning**: 노란색 (#F59E0B)
- **Error**: 빨간색 (#EF4444)

### 타이포그래피

- **Primary Font**: Inter (영문)
- **Secondary Font**: Noto Sans KR (한글)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### 컴포넌트

- **버튼**: Primary, Secondary, Ghost 스타일
- **카드**: 그림자 효과와 호버 애니메이션
- **모달**: 부드러운 진입/퇴장 애니메이션
- **폼**: 접근성을 고려한 입력 요소

## 📱 반응형 디자인

### 브레이크포인트

- **Mobile**: 320px ~ 768px
- **Tablet**: 768px ~ 1024px
- **Desktop**: 1024px 이상

### 최적화

- **모바일 우선**: 모바일 환경을 우선 고려한 디자인
- **터치 친화적**: 터치 인터페이스에 최적화된 버튼 크기
- **성능 최적화**: 이미지 지연 로딩 및 코드 스플리팅

## 🔧 개발 가이드

### 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── utils/         # 유틸리티 함수
├── data/          # 정적 데이터
└── assets/        # 이미지, 폰트 등
```

### 컴포넌트 작성 가이드

- **함수형 컴포넌트**: Hooks 기반으로 작성
- **Props 타입**: PropTypes 또는 TypeScript 사용 권장
- **스타일링**: Tailwind CSS 클래스 우선 사용
- **애니메이션**: Framer Motion 활용

### 코드 컨벤션

- **네이밍**: camelCase (변수, 함수), PascalCase (컴포넌트)
- **파일명**: 컴포넌트는 PascalCase, 유틸리티는 camelCase
- **주석**: 복잡한 로직에 한글 주석 추가

## 🚀 배포

### Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify 배포

```bash
# 빌드
npm run build

# dist 폴더를 Netlify에 업로드
```

### GitHub Pages 배포

```bash
# gh-pages 설치
npm install --save-dev gh-pages

# 배포 스크립트 추가 후
npm run deploy
```

## 🔮 향후 계획

### 단기 계획 (1-2개월)

- [ ] 사용자 리뷰 시스템 구현
- [ ] AI 추천 알고리즘 고도화
- [ ] 카드 신청 추적 기능
- [ ] PWA 지원

### 중기 계획 (3-6개월)

- [ ] 백엔드 API 연동
- [ ] 사용자 계정 시스템
- [ ] 카드 혜택 계산기
- [ ] 모바일 앱 개발

### 장기 계획 (6개월 이상)

- [ ] 머신러닝 기반 추천 엔진
- [ ] 실시간 카드 혜택 업데이트
- [ ] 소셜 기능 (카드 리뷰 공유)
- [ ] 국제화 지원

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **이메일**: contact@cardcomparepro.com
- **GitHub**: [이슈 등록](https://github.com/your-username/card-compare-pro/issues)
- **웹사이트**: [CardCompare Pro](https://cardcomparepro.com)

---

**CardCompare Pro** - 더 나은 금융 결정을 위한 스마트한 선택
