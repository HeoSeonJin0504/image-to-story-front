import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { color } from "../theme";
import { useState } from "react";
import backgroundImage from "../photos/signupbackground.png";
import { authApi } from "../api/auth";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255,255,255,0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 80px;
    margin-bottom: 12px;
    font-size: clamp(1.6em, 4vw, 2.2em);

    @media (max-width: 768px) { margin-top: 48px; }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: min(400px, 90vw);
  padding: 0 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const inputBase = `
  padding: 14px 16px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: clamp(0.95em, 2.5vw, 1.1em);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  &:focus {
    border-color: #abb7b7;
    box-shadow: 0 0 0 3px rgba(171,183,183,0.2);
  }
`;

const Input = styled.input`
  ${inputBase}
  flex: 1;
  margin-bottom: 10px;
`;

const Select = styled.select`
  ${inputBase}
  flex: 1;
  margin-bottom: 10px;
  cursor: pointer;
  background: white;
`;

const EmailInput = styled(Input)`
  width: 50%;
`;

const CheckButton = styled.button`
  padding: 14px 14px;
  margin-bottom: 10px;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  font-size: 0.9em;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
  &:hover { background: #fff; color: #abb7b7; }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 14px;
  font-size: clamp(1.1em, 3vw, 1.4em);
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, transform 0.2s;

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

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;
  margin-bottom: 32px;
  width: min(400px, 90vw);
  color: ${color.lightGray};
  font-size: clamp(0.9em, 2.2vw, 1.1em);

  a {
    text-decoration: none;
    color: ${color.lightGray};
    transition: color 0.2s;
    &:hover { color: #7a9a9a; text-decoration: underline; }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const validateUsername = (v: string) => /^[a-z][a-z0-9_]{4,19}$/.test(v);
  const validatePassword = (v: string) => {
    return (
      /^.{8,16}$/.test(v) &&
      (/(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#])|(?=.*[0-9])(?=.*[!@#])/.test(v)) &&
      /^\S*$/.test(v) &&
      /^(?!.*(.)\1{2}).*$/.test(v)
    );
  };

  const handleCheckDuplicate = async () => {
    if (!validateUsername(username)) {
      alert("아이디는 5~20자여야 하며 영어 소문자, 숫자, 특수문자(_)가 가능하고 첫 글자는 반드시 영어여야 합니다!");
      return;
    }
    try {
      const data = await authApi.checkDuplicate(username);
      if (data.exists) { alert("이미 있는 아이디입니다."); setIsDuplicate(true); }
      else { alert("가입 가능한 아이디입니다."); setIsDuplicate(false); }
    } catch (error) {
      alert(error instanceof Error ? error.message : '중복 확인에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDuplicate) { alert("이미 가입된 아이디 입니다."); return; }
    if (!username) { alert("아이디를 입력해주세요."); return; }
    if (!validateUsername(username)) { alert("아이디는 5~20자여야 하며 영어 소문자, 숫자, 특수문자(_)가 가능하고 첫 글자는 반드시 영어여야 합니다."); return; }
    if (!password) { alert("비밀번호를 입력해주세요."); return; }
    if (!validatePassword(password)) { alert("비밀번호는 8~16자여야 하며 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합이어야 하며, 공백 및 연속된 문자가 없어야 합니다."); return; }
    if (!confirmPassword) { alert("비밀번호 확인을 입력해주세요."); return; }
    if (password !== confirmPassword) { alert("비밀번호가 일치하지 않습니다."); return; }
    if (!name) { alert("이름을 입력해주세요."); return; }

    const email = emailLocal && emailDomain !== "none" ? `${emailLocal}@${emailDomain}` : null;
    setLoading(true); setError(null);
    try {
      await authApi.signup(username, password, name, email);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      setError(message); alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Style>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CheckButton type="button" onClick={handleCheckDuplicate}>중복확인</CheckButton>
        </Row>
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Row>
          <EmailInput
            type="text"
            placeholder="[선택] 이메일"
            value={emailLocal}
            onChange={(e) => setEmailLocal(e.target.value)}
          />
          <span style={{ margin: "0 4px 10px", color: '#888' }}>@</span>
          <Select value={emailDomain} onChange={(e) => setEmailDomain(e.target.value)}>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="kakao.com">kakao.com</option>
            <option value="none">선택안함</option>
          </Select>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? "회원가입 중…" : "회원가입"}
        </Button>
        {error && <p style={{ color: "red", marginTop: "10px", fontSize: "0.9em" }}>{error}</p>}
      </Form>
      <LinkContainer>
        <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
      </LinkContainer>
    </Style>
  );
};

export default SignUp;