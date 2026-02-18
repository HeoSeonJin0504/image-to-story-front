import { useState, useEffect } from "react";
import { Home, GetStarted, Introduce, Login, SignUp, Team, FindId, FindPw, MyPage } from "./pages";
import { Header, Footer } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { User } from "./types/user";
import { authApi } from "./api/auth";

const Style = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.5em;
  color: #555;
`;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await authApi.refresh();
        
        if (data.user_id && data.name) {
          const userData = {
            name: data.name,
            id: data.username || data.id || '',
            user_id: data.user_id,
          };
          setUser(userData);
        }
      } catch {
        // 처음 방문 또는 토큰 만료 시 정상 동작
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  // 초기화 중일 때는 로딩 표시
  if (isInitializing) {
    return <LoadingContainer>로딩 중...</LoadingContainer>;
  }

  return (
    <>
      <BrowserRouter>
        <Style>
          <Header user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/introduce" element={<Introduce user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/team" element={<Team />} />
            <Route path="/get-started" element={<GetStarted user={user} />} />
            <Route path="/mypage" element={<MyPage user={user} />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-pw" element={<FindPw />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </Style>
      </BrowserRouter>
    </>
  );
}

export default App;