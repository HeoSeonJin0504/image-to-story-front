import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../theme";
import { userNameAtom, userPasswordAtom } from "../state";
import { useAtom } from "jotai";
import backgroundImage from "../photos/loginbackground.png";
import { authApi } from "../api/auth";
import { User } from "../types/user";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 180px;
    font-size: 2.2em;

    @media (max-width: 768px) {
      margin-top: 100px;
      font-size: 1.8em;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Input = styled.input`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 1em;
  }
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 15px;
  text-decoration: none;
  font-size: 1.5em;
  background-color: white;
  cursor: pointer;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 7px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    background: #fff;
    color: #abb7b7;
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.2em;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 400px;
  color: ${color.lightGray};
  font-size: 1.2em;

  a {
    text-decoration: none;
    color: ${color.lightGray};
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 1em;
  }
`;

interface LoginProps {
  setUser: (user: User | null) => void;
}

const Login = ({ setUser }: LoginProps) => {
  const [username, setUsername] = useAtom(userNameAtom);
  const [password, setPassword] = useAtom(userPasswordAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authApi.login(username, password);
      setUser({
        name: data.name,
        id: data.username || username,
        user_id: data.user_id
      });
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
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
          {loading ? "로그인 중 ..." : "로그인"}
        </Button>
      </Form>
      <LinkContainer>
        <Link to="/find-id">아이디 찾기</Link>
        <Link to="/find-pw">비밀번호 찾기</Link>
        <Link to="/signup">회원가입</Link>
      </LinkContainer>
    </Style>
  );
};

export default Login;