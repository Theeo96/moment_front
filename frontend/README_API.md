# API 설정 가이드

## 개요

백엔드 API 주소는 `lib/config.ts` 파일에서 관리되며, Git에 포함되어 있습니다.  
CI/CD 환경에서는 환경 변수를 통해 오버라이드할 수 있습니다.

## 설정 방법

### 1. 기본 설정 (Git에 포함됨)

`frontend/lib/config.ts` 파일에서 기본 API 주소를 설정합니다:

```typescript
export const config = {
  apiBaseUrl: 'http://4.217.198.234:5678',
} as const;
```

### 2. CI/CD에서 환경 변수로 오버라이드

CI/CD 파이프라인에서 빌드 시 환경 변수를 설정하면 기본값을 덮어씁니다:

```bash
# 빌드 시 환경 변수 설정
NEXT_PUBLIC_API_BASE_URL=http://your-backend-url:5678 npm run build
```

### 3. 로컬 개발 환경

로컬에서 개발할 때는 `.env.local` 파일을 사용할 수 있습니다 (Git에 포함되지 않음):

```bash
# frontend/.env.local (선택사항)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5678
```

## 사용 방법

코드에서 API URL을 사용할 때:

```typescript
import { getApiUrl } from "@/lib/api"

// 엔드포인트 URL 생성
const url = getApiUrl('/')  // http://4.217.198.234:5678/
const healthUrl = getApiUrl('/health')  // http://4.217.198.234:5678/health
```

## CI/CD 설정 예시

### GitHub Actions
```yaml
- name: Build
  env:
    NEXT_PUBLIC_API_BASE_URL: ${{ secrets.API_BASE_URL }}
  run: npm run build
```

### Azure Static Web Apps
Azure Portal의 설정에서 환경 변수를 추가:
- 이름: `NEXT_PUBLIC_API_BASE_URL`
- 값: `http://4.217.198.234:5678`

### Vercel
Vercel 대시보드의 Environment Variables에서:
- 이름: `NEXT_PUBLIC_API_BASE_URL`
- 값: `http://4.217.198.234:5678`

## 주의사항

- Next.js의 static export(`output: 'export'`)를 사용하므로, 환경 변수는 **빌드 타임**에 주입되어야 합니다
- `NEXT_PUBLIC_` 접두사가 있는 환경 변수만 클라이언트 사이드에서 접근 가능합니다
- 환경 변수를 변경한 후에는 **반드시 재빌드**해야 합니다
