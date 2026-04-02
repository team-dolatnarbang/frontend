FROM node:22

# 앱 디렉토리 설정
WORKDIR /app

# 먼저 example/package.json과 package-lock.json만 복사 (캐시 최적화)
COPY dolatnarbang_fe/package*.json ./

# 의존성 설치
RUN npm install

# 전체 앱 소스 복사
COPY dolatnarbang_fe/ .

# 배포 호스트의 Ingress 경로(/api)와 동일한 베이스 URL (다른 환이면 --build-arg 로 덮어씀)
ARG VITE_API_BASE_URL=https://goormthon-2.goorm.training/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
##

# 앱 빌드
RUN npm run build

# 정적 파일 서버 설치
RUN npm install -g serve

# 포트 노출
EXPOSE 3000

# 정적 앱 실행
CMD ["serve", "-s", "dist", "-l", "3000"]
