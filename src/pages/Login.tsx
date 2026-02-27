import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../theme";
import backgroundImage from "../photos/loginbackground.png";
import { authApi } from "../api/auth";
import { User } from "../types/user";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 120px;
    font-size: clamp(1.6em, 4vw, 2.2em);
    @media (max-width: 768px) {
      margin-top: 60px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(400px, 90vw);
  padding: 0 4px;
`;

const Input = styled.input`
  margin-top: 16px;
  padding: 16px 18px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: clamp(1em, 2.5vw, 1.15em);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;

  &:focus {
    border-color: #abb7b7;
    box-shadow: 0 0 0 3px rgba(171, 183, 183, 0.2);
  }
`;

const Button = styled.button`
  margin-top: 24px;
  padding: 15px;
  font-size: clamp(1.1em, 3vw, 1.4em);
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    background 0.25s,
    color 0.25s,
    transform 0.2s;

  &:hover {
    background: #fff;
    color: #abb7b7;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

const TestLoginButton = styled.button`
  margin-top: 12px;
  padding: 13px;
  font-size: clamp(0.95em, 2.5vw, 1.15em);
  background: transparent;
  border: 2px solid #abb7b7;
  font-weight: 600;
  border-radius: 8px;
  color: #abb7b7;
  cursor: pointer;
  transition:
    background 0.25s,
    color 0.25s,
    transform 0.2s;

  &:hover {
    background: #abb7b7;
    color: #fff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  width: min(400px, 90vw);
  color: ${color.lightGray};
  font-size: clamp(0.9em, 2.2vw, 1.1em);
  padding: 0 4px;

  a {
    text-decoration: none;
    color: ${color.lightGray};
    transition: color 0.2s;
    &:hover {
      color: #7a9a9a;
      text-decoration: underline;
    }
  }
`;

interface LoginProps {
  setUser: (user: User | null) => void;
}

const TEST_USERNAME = import.meta.env.VITE_TEST_USERNAME as string;
const TEST_PASSWORD = import.meta.env.VITE_TEST_PASSWORD as string;

const Login = ({ setUser }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.login(username, password);
      setUser({ name: data.name, user_id: data.user_id });
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "아이디 또는 비밀번호가 잘못되었습니다.";
      alert(message);
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  const handleTestLogin = async () => {
    setLoading(true);
    try {
      const data = await authApi.login(TEST_USERNAME, TEST_PASSWORD);
      setUser({ name: data.name, user_id: data.user_id });
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "테스트 계정 로그인에 실패했습니다.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Style>
      <h1>로그인</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "로그인 중…" : "로그인"}
        </Button>
        <TestLoginButton type="button" onClick={handleTestLogin} disabled={loading}>
          테스트 계정으로 로그인
        </TestLoginButton>
      </Form>
      <LinkContainer>
        <Link to="/signup">회원가입</Link>
      </LinkContainer>
    </Style>
  );
};

export default Login;
