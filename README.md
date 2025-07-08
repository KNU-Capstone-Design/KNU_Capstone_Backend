# Myundo

<p><img src="./assets/logo.png" width="400"/></p>

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

> 🎯 **Myundo**는 AI 기반의 맞춤형 면접 연습 및 피드백 서비스를 제공하는 웹 플랫폼입니다.

**Myundo**는 취업 준비생, 이직 준비자, 개발자 등 다양한 IT 인재들이 실제 면접 환경과 유사하게 연습하고, AI로부터 실시간 피드백을 받을 수 있도록 설계된 서비스입니다.  
CS, 백엔드, 프론트엔드, 모바일(Android/iOS) 등 다양한 분야의 질문을 제공하며, 사용자의 답변을 AI가 자동으로 채점하고, 구체적인 개선점과 모범 답안을 안내합니다.  
또한, 이메일을 통한 정기적인 질문 발송, 학습 이력 추적, 스트릭 시스템 등 체계적인 자기주도 학습을 지원합니다.

**주요 특징**
- 다양한 IT 분야(기초 CS, 백엔드, 프론트엔드, Android, iOS) 질문 제공
- AI 기반 답변 자동 채점 및 맞춤형 피드백
- 격일/일일 이메일 질문 발송 및 HTML 템플릿 기반 안내
- 개인별 학습 이력, 성취도, 스트릭 관리
- 실무 면접에 가까운 경험 제공 및 성장 지원

> 💬 *"단순히 정답을 보는 것이 아닌, 직접 답변하고 성장하는 면접 연습 경험을 제공합니다."*

## 💡 프로젝트 개발 배경

**"수동적 학습에서 능동적 면접 연습으로"**

기존 면접 준비 서비스들의 한계점을 개선하여 개발된 AI 기반 면접 연습 플랫폼입니다.

### 기존 서비스의 문제점
기존 [매일메일](https://www.maeil-mail.kr) 서비스를 이용하면서 다음과 같은 한계점을 발견했습니다:

- **일방향적 학습**: 질문에 대한 정답만 확인하는 수동적 학습 방식
- **제한적 분야**: 주로 프론트엔드/백엔드 중심의 질문으로 한정
- **피드백 부재**: 개인별 답변에 대한 맞춤형 피드백 기능 없음

### Myundo의 해결책
-  **AI 피드백**: 사용자 답변에 대한 실시간 분석 및 개선 제안
-  **분야 확장**: CS 기초부터 모바일 개발까지 포괄적 커버

## 배포 주소
- https://myundo.duckdns.org (추후 도메인 변경 및 서버 이전 예정)

## 전체 프로젝트 구성도

![img](./assets/프로젝트%20구성도.png)

## 📋 목차

- [프로젝트 개발 배경](#-프로젝트-개발-배경)
- [배포 주소](#배포-주소)
- [전체 프로젝트 구성도](#전체-프로젝트-구성도)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [인증 시스템 설계](#-인증-시스템-설계-로그인-없는-토큰-기반-인증)
- [프로젝트 구조](#-프로젝트-구조)
- [API 문서](#-api-문서)
- [간단 실행 가이드](#-간단-실행-가이드)
- [Docker로 전체 서비스 실행하기](#-docker로-전체-서비스-실행하기)
- [트러블슈팅 및 성능 개선](#️-트러블슈팅-및-성능-개선)
- [라이선스](#-라이선스)
- [개발팀](#-개발팀)

## ✨ 주요 기능

### 🔐 사용자 인증 및 관리
- **토큰** 기반 인증 시스템
- 사용자 프로필 및 학습 통계 관리
- 연속 학습 **스트릭 시스템**

### 📝 질문 관리 시스템
- 카테고리별 면접 질문 분류 (기본 CS지식, 백엔드, 프론트엔드, Android, iOS)
- CS질문(자료구조 & 알고리즘, 네트워크, 운영체제, 데이터베이스) 와 사용자가 선택한 분야에 대한 질문 이메일을 격일 간격으로 사용자 이메일로 발송
- 랜덤 질문 선택 알고리즘

### 🤖 AI 기반 답변 분석
- **llama-4-maverick-17b-128e-instruct** 를 활용한 답변 자동 채점
- 상세한 피드백 및 개선 제안 제공
- 모범 답안 및 실제 예시 생성
- 실시간 답변 품질 평가

### 📊 학습 진도 추적
- 개인별 답변 이력 관리
- 성취도 분석

### 📧 이메일 시스템
- 일일 질문 발송 자동화
- HTML 템플릿 기반 이메일 디자인

## 🛠 기술 스택

### Backend Core
```
Node.js 18+         # 런타임 환경
Express.js 4.18+    # 웹 프레임워크
MongoDB 6.0+        # NoSQL 데이터베이스
Mongoose 7.0+       # ODM (Object Document Mapper)
```

### Authentication & Security
```
Custom Token Auth  # JWT 대신 사용자별 고유 영구 토큰과 쿠키를 사용
cors               # CORS 미들웨어
```
- **인증 방식**: JWT의 복잡성을 배제하고, 사용자별 고유 토큰을 발급하여 `HttpOnly` 쿠키로 인증하는 간결하고 안전한 방식을 채택했습니다. 토큰 자체에는 민감 정보가 없으며, 서버는 DB 조회만으로 상태 비저장 인증이 가능합니다.

### 🔐 인증 시스템 설계 (로그인 없는 토큰 기반 인증)

이 프로젝트는 일반적인 이메일/비밀번호 기반의 **로그인 기능을 제공하지 않습니다.** 대신, **최초 회원가입 시 발급되는 고유 영구 토큰(Persistent Unique Token)을 통해 사용자를 식별하고 인증**하는 방식을 채택했습니다.

### 기술 선택 이유

1.  **서비스 본질에 맞는 사용자 경험(UX) 설계**:
    - 본 서비스의 핵심은 **이메일로 받은 질문에 간편하게 접근**하는 것입니다. 사용자가 이메일의 링크를 클릭했을 때, 비밀번호를 입력하는 번거로운 절차 없이 즉시 자신의 정보에 접근하고 답변을 제출할 수 있어야 합니다.
    - 로그인 없는 인증 방식은 이러한 **마찰 없는 사용자 경험**을 제공하고, 서비스의 핵심 가치에 집중하기 위한 최적의 선택이었습니다.

2.  **구현의 간결성 및 명확성**:
    - Access/Refresh 토큰 관리, 만료 시간 처리 등 JWT의 복잡성을 배제하고, **"하나의 유효한 토큰 = 하나의 인증된 사용자"** 라는 명확한 규칙을 적용하여 인증 로직을 단순화했습니다.

3.  **보안과 사용성의 균형**:
    - 토큰은 사용자를 식별하는 역할만 수행하며 민감한 정보를 포함하지 않습니다. 만약 토큰이 유출되더라도 직접적인 정보 해독이나 악용의 여지가 적습니다.
    - 발급된 토큰은 `HttpOnly`, `Secure`, `SameSite=Strict` 옵션을 적용한 쿠키에 저장하여, XSS 및 CSRF 공격으로부터 토큰을 보호합니다.

4.  **상태 비저장(Stateless) 서버 유지**:
    - 서버는 세션 저장소 없이, 요청 쿠키에 담긴 토큰을 데이터베이스와 대조하는 것만으로 사용자를 인증할 수 있어 수평적 확장에 유리합니다.

### 인증 및 세션 유지 흐름

1.  **최초 인증 (회원가입)**: 사용자가 이메일과 관심 분야를 입력하여 가입하면, 서버는 암호학적으로 안전한 난수(`crypto.randomBytes`)를 기반으로 **영구적인 고유 토큰**을 생성하여 DB에 저장합니다.
2.  **세션 설정**: 생성된 토큰을 클라이언트의 브라우저 쿠키에 저장합니다. 이 쿠키가 사실상 사용자의 "로그인 상태"를 유지하는 역할을 합니다.
3.  **자동 인증**: 이후 모든 API 요청 시, 브라우저는 쿠키를 통해 자동으로 토큰을 전송합니다.
4.  **서버 검증**: 서버는 미들웨어에서 쿠키의 토큰을 추출하고, 데이터베이스에 해당 토큰을 가진 사용자가 있는지 검증하여 인증을 완료합니다.

이러한 설계는 서비스의 특성과 요구사항을 고려하여 **보안, 성능, 개발 복잡도 간의 트레이드오프를 신중하게 결정**한 결과입니다.

### External APIs
```
Groq API         # AI 기반 답변 분석
Nodemailer       # 이메일 발송
SMTP Relay       # Gmail SMTP 
```

### Development Tools
```
Winston            # 로깅 시스템
dotenv             # 환경 변수 관리
```

### DevOps
```
Docker             # 컨테이너 환경
Github Action      # CI/CD
```

### Deployment Environment
- Azure VM

## 📁 프로젝트 구조

```
src/
├── 📁 controllers/              # API 엔드포인트 핸들러
│   ├── 📄 authController.js     # 인증 관련 컨트롤러
│   ├── 📄 questionController.js # 질문 관리 컨트롤러
│   ├── 📄 answerController.js   # 답변 처리 컨트롤러
│   ├── 📄 activityController.js # 활동 조회 컨트롤러
│   ├── 📄 subscribeController.js# 구독 관리 컨트롤러
│   └── 📄 redirectController.js # 리다이렉트 처리
│
├── 📁 services/                 # 비즈니스 로직 계층
│   ├── 📄 authService.js        # 인증 서비스
│   ├── 📄 answerService.js      # 답변 처리 서비스
│   ├── 📄 activityService.js    # 활동 관리 서비스
│   ├── 📄 userService.js        # 사용자 관리 서비스
│   ├── 📄 aiService.js          # AI API 통합 서비스
│   ├── 📄 subscribeService.js   # 구독 관리 서비스
│   └── 📄 selectQuestionService.js # 질문 선택 서비스
│
├── 📁 models/                   # 데이터베이스 스키마
│   ├── 📄 users.js              # 사용자 모델
│   ├── 📄 question.js           # 질문 모델
│   ├── 📄 answer.js             # 답변 모델
│   ├── 📄 userActivity.js       # 사용자 활동 모델
│   └── 📄 aiAnswer.js           # AI 답변 모델
│
├── 📁 routes/                   # API 라우팅
│   ├── 📄 auth.js               # 인증 라우트
│   ├── 📄 questions.js          # 질문 관련 라우트
│   ├── 📄 answers.js            # 답변 관련 라우트
│   └── 📄 users.js              # 사용자 관련 라우트
│
├── 📁 utils/                    # 유틸리티 함수
│   ├── 📄 logger.js             # Winston 로깅 설정
│   ├── 📄 parseToJSON.js        # JSON 파싱 유틸
│   └── 📄 mailTemplate.js       # 이메일 템플릿
│
├── 📄 app.js                    # 애플리케이션 진입점
└── 📄 package.json              # 프로젝트 메타데이터
```

## 📡 API 문서

- **Swagger**: https://knu-capstone-design.github.io/KNU_Capstone_Backend/

## 🚀 간단 실행 가이드

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/KNU-Capstone-Design/KNU_Capstone_Backend.git
   cd KNU_Capstone_Backend
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 파일(.env) 생성**
   아래 예시를 참고하여 `.env` 파일을 프로젝트 루트에 만드세요.
   ```
   PORT=your_port
   HOST=0.0.0.0
   SERVER_URL=your_domain
   MONGODB_URI=your_mongodb_URI
   GROQ_API_KEY=your_groq_api_key
   EMAIL_USER=your_smtp_email
   EMAIL_PASS=your_smtp_password
   SMTP_HOST=your_smtp_host
   FRONTEND_URL=http://localhost:5173 #you can git clone at https://github.com/KNU-Capstone-Design/KNU_Capstone_Frontend.git
   NODE_ENV=production || development
   ```

4. **서버 실행**
   ```bash
   npm run dev
   ```

## 🐳 Docker로 전체 서비스 실행하기

이 프로젝트는 **백엔드**와 **프론트엔드**([KNU_Capstone_Frontend](https://github.com/KNU-Capstone-Design/KNU_Capstone_Frontend))가 각각 별도의 레포지토리로 관리되며,  
각 레포지토리에는 서비스별 Dockerfile이 존재합니다.  
루트 디렉토리에 위치한 `docker-compose.yml` 파일을 통해 **백엔드와 프론트엔드, 그리고 Nginx**를 한 번에 컨테이너로 실행할 수 있습니다.
`docker-compose.yml` 파일과 Nginx 설정파일은  **배포**([KNU_Capstone_Deploy](https://github.com/KNU-Capstone-Design/KNU_Capstone_Deploy.git))에서 찾을 수 있습니다.

### 📁 프로젝트 구조 (Dockerfile 위치 포함)

```
프로젝트_최상위_폴더/
├── KNU_Capstone_Backend/         # 백엔드 레포지토리
│   ├── Dockerfile                # 백엔드용 Dockerfile
│   ├── .env                      # 백엔드 환경 변수 파일 (직접 생성)
│   └── ...                       # 기타 백엔드 소스 코드 및 폴더
│
├── KNU_Capstone_Frontend/        # 프론트엔드 레포지토리
│   ├── Dockerfile                # 프론트엔드용 Dockerfile
│   ├── .env                      # 프론트엔드 환경 변수 파일 (직접 생성)
│   └── ...                       # 기타 프론트엔드 소스 코드 및 폴더
│
├── docker-compose.yml            # 전체 서비스 오케스트레이션 파일 (최상위 폴더에 위치)
└── (기타 README, 문서 등)
```
- **docker-compose.yml**: 프로젝트 최상위 폴더에 위치하며, 백엔드/프론트엔드/Nginx 컨테이너를 한 번에 관리합니다.
- **KNU_Capstone_Backend/Dockerfile**: 백엔드 서비스용 Dockerfile
- **KNU_Capstone_Frontend/Dockerfile**: 프론트엔드 서비스용 Dockerfile

### 실행 방법

1. **두 레포지토리 모두 동일한 상위 폴더에 클론**
   ```bash
   git clone https://github.com/KNU-Capstone-Design/KNU_Capstone_Backend.git
   git clone https://github.com/KNU-Capstone-Design/KNU_Capstone_Frontend.git
   ```

2. **docker-compose.yml 파일이 위치한 루트 디렉토리에서 실행**
   ```bash
   docker-compose up -d
   ```

   - 이 명령어로 백엔드, 프론트엔드, MongoDB가 모두 컨테이너로 실행됩니다.
   - 각 서비스는 각자의 Dockerfile을 기반으로 빌드됩니다.

3. **환경 변수 설정**
   - `.env` 파일을 각 레포지토리(backend, frontend)에 각각 생성해야 합니다.
   - 프론트엔드 레포의 `.env` 파일에는 다음과 같은 내용만 작성하십쇼.
   - VITE_API_BASEURL="your_domain" 

4. **서비스 접속**
   - 프론트엔드: http://localhost:5173 (또는 docker-compose 포트 매핑에 따라 다를 수 있음)
   - 백엔드: http://localhost:3000 (또는 설정한 포트)
   - MongoDB: 내부 네트워크에서 연결

### 참고

- `docker-compose.yml` 파일 내에서 각 서비스의 빌드 경로와 환경 변수 파일 경로가 올바르게 지정되어 있는지 확인하세요.
- 컨테이너 중단 및 삭제는 아래 명령어로 할 수 있습니다.
  ```bash
  docker-compose down
  ```

> **TIP:**  
> 실제 배포 환경에서는 각 서비스의 `.env` 파일에 운영 환경에 맞는 값을 반드시 입력해야 하며,  
> 포트 충돌이나 네트워크 설정에 유의하세요.

## 🛠️ 트러블슈팅 및 성능 개선

### 이메일 대량 발송 성능 개선: 순차 처리에서 병렬 처리로 성능개선

**문제 상황**

초기 이메일 발송 로직은 `for` 루프를 사용하여 구독자들에게 순차적으로 메일을 전송했습니다. 이 방식은 사용자 수가 적을 때는 문제가 없지만, 수백, 수천 명으로 사용자가 증가할 경우 전체 발송 시간이 선형적으로 늘어나 Cron Job 실행 시간이 과도하게 길어지는 잠재적 성능 병목 지점이었습니다.

**개선 전 코드 (순차 처리)**
```javascript
// Before: for 루프를 사용한 순차 처리
for (const user of users) {
  try {
    await sendQuestionEmail({ to: user.email });
  } catch (error) {
    console.error(`이메일 전송 실패 (${user.email}):`, error);
  }
}
```

**개선 과정 및 결과**

`Promise.all`과 `Array.prototype.map`을 활용하여 모든 이메일 발송 요청을 동시에 병렬로 처리하도록 로직을 변경했습니다.

- **성능 향상**: 전체 작업 시간이 '모든 이메일 발송 시간의 합'에서 '가장 오래 걸리는 단일 이메일 발송 시간'에 가깝게 단축되었습니다.
- **확장성 확보**: 사용자 수가 늘어나도 전체 작업 시간이 급격하게 증가하지 않아, 안정적이고 확장 가능한 시스템을 구축했습니다.
- **안정성 강화**: `map` 내부의 `.catch`를 통해 특정 사용자의 이메일 발송이 실패하더라도 다른 사용자에게는 정상적으로 메일이 발송되도록 하여 서비스 안정성을 높였습니다.

**개선 후 코드 (병렬 처리)**
```javascript
// After: Promise.all을 사용한 병렬 처리
await Promise.all(
    users.map(user => 
        sendQuestionEmail({ to: user.email })
        .catch(error => {
            // 개별 이메일 실패가 전체 프로세스를 중단시키지 않도록 처리
            console.error(`이메일 전송 실패 (${user.email}):`, error);
            return null; // 실패한 프로미스를 이행된 상태로 만들어 Promise.all이 중단되지 않게 함
        })
    )
);
```

이 개선을 통해 비동기 처리와 자바스크립트 이벤트 루프에 대한 이해를 바탕으로, 실제 서비스에서 발생할 수 있는 성능 문제를 예측하고 선제적으로 해결하는 경험을 할 수 있었습니다.

### CORS(Cross-Origin Resource Sharing) 정책 문제 해결

**문제 상황**

브라우저의 동일 출처 정책(Same-Origin Policy)으로 인해, 다른 도메인에서 실행되는 프론트엔드(`http://localhost:5173`)가 백엔드 API(`http://localhost:3000`)를 호출할 수 없는 CORS 에러가 발생했습니다. 이 문제는 로컬 개발 환경과 Nginx를 통해 배포된 운영 환경 모두에서 해결해야 했습니다.

**해결 과정 (환경별 접근)**

#### 1. 로컬 개발 환경: `cors` 미들웨어 사용

-   **해결책**: Express의 `cors` 미들웨어를 사용하여 간단하게 해결했습니다.
-   **구현**: `app.js`에 `cors` 미들웨어를 설정하여, 프론트엔드 개발 서버의 출처(`http://localhost:5173`)를 허용하고, 인증 정보(쿠키)를 주고받을 수 있도록 `credentials: true` 옵션을 활성화했습니다.

    ```javascript
    // in app.js
    import cors from 'cors';

    app.use(cors({
      origin: 'http://localhost:5173', // 프론트엔드 출처 허용
      credentials: true,
    }));
    ```

#### 2. 배포 환경: Nginx 리버스 프록시를 통한 해결

-   **해결책**: 배포 환경에서는 백엔드에 CORS 로직을 두는 대신, **Nginx 리버스 프록시**에서 모든 CORS 관련 처리를 담당하도록 구성했습니다. 이 방식은 백엔드 코드를 환경에 따라 변경할 필요가 없게 만들어 애플리케이션의 일관성을 높입니다.
-   **구현**: `reverse-proxy.conf` 파일에 아래와 같이 설정했습니다.
    1.  **단일 엔드포인트 제공**: 프론트엔드와 백엔드 API(`app:3000`)를 모두 동일한 도메인(`myundo.duckdns.org`)으로 제공합니다.
    2.  **CORS 헤더 제어**: `/api/` 경로로 들어오는 요청에 대해 Nginx가 직접 CORS 헤더를 추가합니다.
    3.  **Preflight 요청 처리**: `OPTIONS` 메서드로 들어오는 Preflight 요청을 Nginx가 직접 처리(`return 204`)하여 불필요한 요청이 백엔드로 전달되지 않도록 최적화했습니다.

    ```nginx
    # in reverse-proxy.conf
    location /api/ {
        # Preflight 요청(OPTIONS) 처리
        if ($request_method = OPTIONS) {
            add_header 'Access-Control-Allow-Origin'  $http_origin  always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            return 204;
        }

        # 실제 요청 프록시 및 CORS 헤더 추가
        proxy_pass http://app:3000;
        add_header 'Access-Control-Allow-Origin'  $http_origin  always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        # ... 기타 프록시 설정
    }
    ```

**결론**

환경에 따라 적절한 CORS 해결 전략을 선택하고 구현하는 경험을 통해, 웹 보안 정책에 대한 깊은 이해와 인프라 레벨에서의 문제 해결 능력을 기를 수 있었습니다. 특히 Nginx를 활용하여 CORS 정책을 중앙에서 관리함으로써 백엔드 서비스의 복잡도를 낮추고 유지보수성을 향상시켰습니다.




## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👥 개발팀

- **백엔드 개발**: [kimsunho2000](https://github.com/kimsunho2000), [kestrel01360](https://github.com/kestrel01360)
- **프론트엔드 개발**: [DongwooAn00](https://github.com/DongwooAn00), [Issaghwa](https://github.com/Issaghwa), [kimjy5150](https://github.com/kimjy5150)


