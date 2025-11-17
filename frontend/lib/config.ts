/**
 * 애플리케이션 설정
 * 이 파일은 Git에 포함되어 있으며, 환경 변수로 오버라이드 가능합니다.
 * 
 * 설정 우선순위:
 * 1. NEXT_PUBLIC_API_BASE_URL 환경 변수 (CI/CD 빌드 시 주입)
 * 2. 이 파일의 기본값
 */

export const config = {
  /**
   * 백엔드 API 기본 URL
   * 
   * CI/CD에서 환경 변수를 설정하면 이 값이 사용됩니다.
   * 환경 변수가 없으면 기본값(http://4.217.198.234:5678)이 사용됩니다.
   */
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://4.217.198.234:5678',
} as const;

/**
 * 설정 가져오기
 * Next.js의 static export에서는 빌드 타임에 환경 변수가 주입됩니다.
 */
export const getConfig = () => {
  return config;
};

