// Access Token을 메모리에만 저장 (localStorage 미사용, 호스팅 대비)
// App.tsx의 /refresh를 호출해 자동 복구됨

let accessToken: string | null = null;
let isLoggedIn: boolean = false;

export const tokenManager = {
  // Access Token 저장 (메모리에만)
  setAccessToken: (token: string) => {
    accessToken = token;
    isLoggedIn = true;
  },

  // Access Token 가져오기
  getAccessToken: (): string | null => {
    return accessToken;
  },

  // Access Token 삭제
  clearAccessToken: () => {
    accessToken = null;
    isLoggedIn = false;
  },

  // 로그인 중인지 확인
  isAuthenticated: (): boolean => {
    // ← 추가
    return isLoggedIn;
  },
};
