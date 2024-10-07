# Step 1: Build the frontend application using Node.js
FROM node:20.15.1 AS build

# 작업 디렉터리 설정
WORKDIR /app

# package.json과 package-lock.json 파일을 복사하여 종속성 설치
COPY package*.json ./

# 종속성 설치 (cache를 사용하지 않고 설치하여 종속성 문제 방지)
RUN npm ci --no-cache

# 소스 코드 및 public 디렉터리 복사
COPY . .

# 애플리케이션 빌드 (PWA 포함)
RUN npm run build

# Step 2: 빌드된 파일을 /build 경로에 복사하여 외부에서 확인 가능하도록 설정
# Vite의 기본 빌드 경로는 dist이므로 dist를 build로 복사
RUN mkdir -p /build && cp -r dist/* /build

# 포트 노출 (로컬 개발 환경에서 필요할 수 있음)
EXPOSE 3000

# 컨테이너가 실행되었을 때 빌드 파일이 저장되었음을 확인하는 메시지
CMD ["echo", "Frontend build completed. Check /build directory for output files."]
