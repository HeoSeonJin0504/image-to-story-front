import { useState, useEffect } from "react";
import { Home, GetStarted, Introduce, Login, SignUp, Team, MyPage } from "./pages";
import { Header, Footer } from "./components";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User } from "./types/user";
import { authApi } from "./api/auth";

const Style = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`;

// auth:expired 이벤트를 React Router로 처리하는 내부 컴포넌트
// BrowserRouter 안에 있어야 useNavigate 사용 가능
const AuthExpiredHandler = ({ setUser }: { setUser: (user: User | null) => void }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      navigate('/login');
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, [navigate, setUser]);

  return null;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await authApi.refresh();
        
        if (data.user_id && data.name) {
          setUser({
            name: data.name,
            user_id: data.user_id,
          });
        }
      } catch {
        // 처음 방문 또는 토큰 만료 시 정상 동작
      }
    };

    initAuth();
  }, []);

  return (
    <BrowserRouter>
      <AuthExpiredHandler setUser={setUser} />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Style>
    </BrowserRouter>
  );
}

export default App;