import { useState } from "react";
import { Home, GetStarted, Introduce, Login, SignUp, Team, FindId, FindPw } from "./pages";
import { Header, Footer } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { User } from "./types/user";

const Style = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  const [user, setUser] = useState<User | null>(null);

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