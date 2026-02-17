import { publicFetch } from '../utils/api';
import { tokenManager } from '../utils/token';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await publicFetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const data = await response.json();
    console.log('로그인 응답:', data);
    
    // Access Token 저장
    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
      console.log('Access Token 저장 완료');
    } else {
      console.warn('accessToken이 응답에 없습니다.');
    }
    
    return data;
  },

  checkDuplicate: async (username: string) => {
    const response = await publicFetch(`${API_BASE_URL}/check-duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error('중복 확인에 실패했습니다.');
    }

    return response.json();
  },

  signup: async (username: string, password: string, name: string, email: string | null) => {
    const response = await publicFetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '회원가입에 실패했습니다.');
    }

    return response.json();
  },

  logout: async () => {
    try {
      const response = await publicFetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });

      // 로그아웃은 서버 응답과 상관없이 클라이언트 토큰 삭제
      tokenManager.clearAccessToken();

      if (!response.ok) {
        console.warn('로그아웃 API 호출 실패, 로컬 토큰은 삭제됨');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      // 에러가 발생해도 로컬 토큰은 삭제
      tokenManager.clearAccessToken();
    }
  },

  refresh: async () => {
    const response = await publicFetch(`${API_BASE_URL}/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Refresh 실패:', response.status, errorText);
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data = await response.json();
    console.log('Refresh 성공:', data);
    
    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
    } else {
      console.warn('accessToken이 응답에 없습니다.');
    }
    
    return data;
  },
};
