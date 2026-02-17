// Access Token을 메모리와 localStorage에 저장하여 관리
const ACCESS_TOKEN_KEY = 'accessToken';

// 메모리에 저장된 토큰 (새로고침 시 사라짐)
let accessToken: string | null = null;

export const tokenManager = {
  // Access Token 저장
  setAccessToken: (token: string) => {
    accessToken = token;
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log('Access Token 저장됨');
  },

  // Access Token 가져오기
  getAccessToken: (): string | null => {
    if (accessToken) {
      return accessToken;
    }
    // 메모리에 없으면 localStorage에서 가져오기
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      accessToken = token;
      console.log('localStorage에서 Access Token 복원');
    }
    return token;
  },

  // Access Token 삭제
  clearAccessToken: () => {
    accessToken = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    console.log('Access Token 삭제됨');
  },

  // 토큰이 있는지 확인
  hasAccessToken: (): boolean => {
    return !!tokenManager.getAccessToken();
  },
};
