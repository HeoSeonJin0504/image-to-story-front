import { publicFetch } from './api';
import { tokenManager } from './token';

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
    
    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
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
      await publicFetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });
      tokenManager.clearAccessToken();
    } catch {
      tokenManager.clearAccessToken();
    }
  },

  refresh: async () => {
    const response = await publicFetch(`${API_BASE_URL}/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data = await response.json();
    
    if (data.accessToken) {
      tokenManager.setAccessToken(data.accessToken);
    }
    
    return data;
  },
};
