# node.js 기반 이미지 사용
FROM node:18

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 전체 복사
COPY . .

# 애플리케이션이 열 포트 명시 (Express 기본 3000)
EXPOSE 3000

# 앱 실행 (운영 환경)
CMD ["node", "app.js"]
