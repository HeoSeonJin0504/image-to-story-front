import { tokenManager } from './token';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Refresh Token으로 Access Token 재발급
const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    
    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// 인증이 필요한 API 호출을 위한 fetch wrapper
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> => {
  const token = tokenManager.getAccessToken();
  
  // Authorization 헤더 추가
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // 쿠키 자동 전송
  });

  // 401 에러이고 아직 재시도하지 않았다면 refresh 시도
  if (response.status === 401 && retryCount === 0) {
    const refreshSuccess = await refreshAccessToken();
    
    if (refreshSuccess) {
      return authenticatedFetch(url, options, retryCount + 1);
    } else {
      tokenManager.clearAccessToken();
      window.location.href = '/login';
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  return response;
};

// 일반 fetch (인증 불필요)
export const publicFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};

// Access Token 재발급 (앱 시작 시 호출)
export const initializeAuth = async (): Promise<boolean> => {
  return await refreshAccessToken();
};
