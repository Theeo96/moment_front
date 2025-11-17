/**
 * API 설정 및 유틸리티 함수
 */

import { getConfig } from './config';

// 설정에서 API 기본 URL 가져오기
// 우선순위: 환경 변수 > config.ts 기본값
const getApiBaseUrl = (): string => {
  const config = getConfig();
  return config.apiBaseUrl;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * API 엔드포인트 URL 생성
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_BASE_URL.replace(/\/$/, ''); // 끝의 슬래시 제거
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

/**
 * 이미지 분석 API 호출
 */
export const analyzeImage = async (image: File, category: number) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('category', category.toString());

  const response = await fetch(getApiUrl('/'), {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * 헬스체크 API 호출
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(getApiUrl('/health'), {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

