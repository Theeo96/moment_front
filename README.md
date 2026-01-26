# moment_front

HTP 검사 기반 심리 상담 서비스 프로그램 moment 의 frontend repo

## Key Features

- React와 Next.js를 사용한 SPA (Single Page Application)
- Tailwind CSS 등 최신 프론트엔드 기술 스택 기반
- Vercel, Azure Static Web Apps 등의 배포 플랫폼 지원

---

## Prerequisites

- **Node.js**: LTS 버전(18.x 이상 권장)
- **npm**: 9.x 이상 권장
- **Git**: 최신 버전 권장

---

## Getting Started

### 1. 저장소 클론

```bash
git clone https://github.com/Theeo96/moment_front.git
cd moment_front
```

### 2. 의존성 설치

```bash
npm install
```

---

## 환경 변수 설정

프로젝트에서 환경 변수는 매우 중요합니다. 다음과 같은 `.env.local` 파일을 프로젝트 루트 디렉토리에 생성하십시오:

```env
# Example: .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5678
```

> **🔍 주의 사항**
> - `NEXT_PUBLIC_`로 시작하는 변수만 브라우저 쪽에서 접근할 수 있습니다.
> - 개발 환경(로컬 테스트)에서는 기본 URL을 로컬로 지정하세요(`http://localhost:5678`).

---

## Local Development

### 개발 서버 실행

```bash
npm run dev
```

서버가 실행되면 브라우저를 열고 [http://localhost:3000](http://localhost:3000)에 접속합니다.

---

## Production Build

프로덕션 빌드를 생성하려면 다음 명령어를 사용하십시오:

```bash
npm run build
```

빌드 출력은 `out` 디렉터리에 저장됩니다.

> **↗️ 배포 준비:**  
> 빌드 후 Vercel, Azure 및 CI/CD 워크플로에 통합을 권장합니다.

---

## Troubleshooting

1. 실행 중 문제가 발생했다면 Node.js 및 npm 버전이 최신인지 확인하세요.
2. 의존성 충돌이 발생했다면 다음 작업을 수행하세요:
   - `node_modules` 삭제
   - `npm install` 명령어 실행
3. 환경 변수 설정에 오류가 없는지 확인하세요 (`.env.local` 파일).
4. 추가 문제는 **GitHub Issues** 페이지를 통해 보고해주세요.

---
