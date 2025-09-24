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

## 배포 주소
- https://myundo.dev

## API 명세서
- https://knu-capstone-design.github.io/KNU_Capstone_Backend/

## 전체 프로젝트 구성도

![img](./assets/프로젝트%20구성도.png)

## 📋 목차

- [프로젝트 개발 배경](#-프로젝트-개발-배경)
- [배포 주소](#배포-주소)
- [전체 프로젝트 구성도](#전체-프로젝트-구성도)
- [기술 스택](#-기술-스택)
- [API 문서](#-api-문서)
- [간단 실행 가이드](#-간단-실행-가이드)
- [Docker로 전체 서비스 실행하기](#-docker로-전체-서비스-실행하기)
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

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👥 개발팀

- **백엔드 개발**: [kimsunho2000](https://github.com/kimsunho2000), [kestrel01360](https://github.com/kestrel01360)
- **프론트엔드 개발**: [DongwooAn00](https://github.com/DongwooAn00), [Issaghwa](https://github.com/Issaghwa), [kimjy5150](https://github.com/kimjy5150)


