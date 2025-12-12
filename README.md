# 그림나래(Image to Story-front)

그림나래(Image-to-Story-front)는 업로드된 이미지를 분석하여 창의적인 동화를 생성해주는 서비스의 **프론트엔드(React)**입니다.

---

## 프로젝트 개요

사용자가 이미지를 업로드하면 OpenAI ChatGPT API가 이미지를 분석하여 주요 객체를 식별하고, 이를 기반으로 창의적인 동화를 자동으로 생성합니다. 사용자는 생성된 동화와 이미지를 저장하고 관리할 수 있습니다.
(아이디 찾기, 비밀번호 찾기, 점자 생성 기능은 미구현입니다.)

### 주요 기능

- **이미지 업로드**: 그림 파일을 업로드하여 AI 분석
- **AI 동화 생성**: 이미지를 분석하여 창의적인 동화 자동 생성
- **점자 생성**: 생성된 동화를 점자로 변환하여 하드웨어 출력
- **동화 저장**: 생성한 동화와 이미지를 데이터베이스에 저장
- **사용자 인증**: 로그인/회원가입을 통한 개인화된 동화 관리

### 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| **홈(Home)** | `/` | 서비스 소개 및 메인 화면 |
| **서비스 소개(Introduce)** | `/introduce` | 서비스 상세 설명 |
| **팀 소개(Team)** | `/team` | 개발 팀원 소개 |
| **동화 생성(GetStarted)** | `/get-started` | 이미지 업로드 및 동화 생성 메인 기능 |
| **로그인(Login)** | `/login` | 사용자 로그인 |
| **회원가입(SignUp)** | `/signup` | 신규 사용자 등록 |
| **아이디 찾기(FindId)** | `/find-id` | 아이디 찾기 |
| **비밀번호 찾기(FindPw)** | `/find-pw` | 비밀번호 재설정 |

### 주요 UI 기능

#### 1. **이미지 업로드 및 동화 생성**
- **이미지 미리보기**
  - 업로드한 이미지를 실시간으로 확인
  - 이미지 선택 및 재업로드 가능
- **AI 동화 생성**
  - 이미지 분석 후 동화 제목과 내용 자동 생성
  - 생성 중 로딩 상태 표시
  - 실시간으로 생성된 동화 확인

#### 2. **동화 저장 및 관리**
- 생성한 동화를 사용자 계정에 저장
- 이미지와 동화 내용을 함께 관리

#### 3. **팀원 소개**
- 프로젝트 개발 팀원 정보
- GitHub 프로필 링크 제공

### 🔌 API 연동 방식

- **Fetch API 기반 HTTP 통신**
- **주요 엔드포인트**
  - `POST /image-upload`: 이미지 업로드 및 동화 생성
  - `POST /save-story`: 동화 저장
- **에러 핸들링**
  - 로그인 검증 (user_id 확인)
  - 이미지 필수 업로드 확인
  - 서버 에러 시 사용자 친화적 메시지 표시

---

## 🛠️ 기술 스택 (Tech Stack)

### Core
- **React 18** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안정성 및 개발 생산성 향상
- **Vite** - 빠른 개발 서버 및 빌드 도구

### UI/UX
- **Styled Components** - CSS-in-JS 스타일링
- **React Router v6** - 페이지 라우팅 및 네비게이션

### 상태 관리
- **React Hooks** - useState로 로컬 상태 관리
- **Props Drilling** - 부모-자식 컴포넌트 간 데이터 전달

### HTTP 통신
- **Fetch API** - REST API 통신
- **FormData** - 파일 업로드 처리

### 코드 품질
- **ESLint** - 코드 품질 검사
- **TypeScript** - 타입 체크로 런타임 에러 방지

---

## 📁 프로젝트 구조

```
image-to-story-front/
├── public/                # 정적 파일
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── Header.tsx   # 헤더 컴포넌트
│   │   └── Footer.tsx   # 푸터 컴포넌트
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Introduce.tsx
│   │   ├── Team.tsx
│   │   ├── GetStarted.tsx     # 이미지 업로드 및 동화 생성
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── FindId.tsx
│   │   └── FindPw.tsx
│   ├── photos/          # 이미지 리소스
│   │   ├── user.png
│   │   ├── github.png
│   │   ├── teambackground.png
│   │   └── getstartedbackground.png
│   ├── types/           # TypeScript 타입 정의
│   │   └── user.ts
│   ├── App.tsx          # 앱 진입점 및 라우팅
│   └── main.tsx         # React 렌더링
├── .env                 # 환경 변수
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ 환경 변수 (.env)

`.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
# 백엔드 서버 주소
VITE_API_BASE_URL=http://localhost:3000
```

---

## 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd image-to-story-front
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 위의 환경 변수를 설정합니다.

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 5. 빌드
```bash
npm run build
```

---

## 📱 페이지 흐름 (UX Flow)

```
1. 홈페이지 방문
   ↓
2. 서비스 소개 확인 (선택)
   ↓
3. 로그인/회원가입
   ├─ 아이디/비밀번호 입력
   └─ 아이디 찾기, 비밀번호 찾기 (미구현)
   ↓
4. 동화 생성 페이지 (Get Started)
   ├─ 이미지 업로드
   ├─ 이미지 미리보기 확인
   ├─ "그림 저장 및 동화 생성" 버튼 클릭
   ├─ AI가 동화 생성 (대기)
   ├─ 생성된 동화 확인
   │   ├─ 동화 제목
   │   └─ 동화 내용
   ├─ 점자 생성 (미구현)
   └─ 동화 저장
   ↓
5. 팀 소개 페이지 확인 (선택)
```

---

## 👥 팀 소개

| 이름 | 역할 | GitHub |
|------|------|--------|
| **임희진** | AI, 백엔드(FastAPI) | [@limhuijin](https://github.com/limhuijin) |
| **송진우** | DB, 서버 개발 | [@ssong77](https://github.com/ssong77) |
| **허선진** | 프론트엔드, 백엔드(Node.JS) | [@HeoSeonJin0504](https://github.com/HeoSeonJin0504) |
| **김소희** | HW 관리, 디자인 | [@shkim429](https://github.com/shkim429) |

---

## 📝 주요 학습 포인트

### 핵심 개념

- **React 함수형 컴포넌트**: Hooks를 활용한 상태 관리
- **TypeScript 인터페이스**: Props 타입 정의 및 타입 안정성
- **Styled Components**: CSS-in-JS 방식의 컴포넌트 스타일링
- **React Router**: SPA 라우팅 및 페이지 전환
- **FormData & File Upload**: 이미지 파일 업로드 처리
- **Fetch API**: 비동기 HTTP 통신
- **조건부 렌더링**: 로딩 상태 및 결과 표시

### 주요 구현 기능

- **이미지 미리보기**: FileReader API를 활용한 이미지 프리뷰
- **로딩 상태 관리**: useState를 활용한 비동기 처리 상태 표시
- **에러 처리**: 사용자 친화적인 에러 메시지 표시
- **반응형 디자인**: 미디어 쿼리를 활용한 모바일 대응
- **동적 라우팅**: React Router의 Routes와 Route 활용
- **사용자 인증 상태**: Props를 통한 사용자 정보 전달

---

## 🎨 디자인 크레딧

배경 이미지는 [Freepik](https://www.freepik.com/)에서 제공받았습니다.

---

## 저장소
본 프로젝트는 2개의 저장소로 구성되어 있습니다:

- **프론트엔드 (React)** - 현재 저장소
  
- **백엔드 (Node.JS)** - 사용자 인증, 데이터 관리, ChatGPT API 관련 기능
  - https://github.com/HeoSeonJin0504/image-to-story-node.git