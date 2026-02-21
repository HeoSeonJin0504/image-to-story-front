import styled from "styled-components";
import { NavLink } from "react-router-dom";
import backgroundImage from "../photos/homebackground.png";
import { User } from "../types/user";

const MobileBr = styled.br`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-color: rgba(255,255,255,0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 120px;
    font-size: clamp(1.6em, 4vw, 3.2em);
    padding: 12px 20px;
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(4px);
    border-radius: 12px;
    display: inline-block;
    max-width: 90%;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    h1 { margin-top: 60px; }
  }
`;

const BodyText = styled.p`
  margin-top: 16px;
  font-size: clamp(1em, 2.5vw, 1.4em);
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(4px);
  padding: 10px 18px;
  border-radius: 10px;
  display: inline-block;
  max-width: 88%;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const Button = styled(NavLink)`
  display: inline-block;
  margin-top: 36px;
  padding: 12px 32px;
  text-decoration: none;
  background: #bdc2bb;
  border: 2px solid #bdc2bb;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  font-size: clamp(1em, 2.5vw, 1.25em);
  cursor: pointer;
  transition: background 0.25s, color 0.25s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background: #fff;
    color: #abb7b7;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    margin-top: 24px;
    padding: 11px 28px;
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  margin: 60px 20px 60px;
  max-width: 1100px;
  width: 100%;
  padding: 0 16px;

  @media (max-width: 768px) {
    gap: 16px;
    margin: 40px 0 40px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: clamp(240px, 26vw, 300px);
  padding: 28px 24px;
  line-height: 1.5;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:nth-child(2) { animation-delay: 0.15s; }
  &:nth-child(3) { animation-delay: 0.3s; }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.14);
  }

  &::before {
    content: "";
    position: absolute;
    top: 14px;
    left: 14px;
    width: 12px;
    height: 12px;
    background: #abb7b7;
    border-radius: 50%;
  }

  h2 {
    font-size: clamp(1.1em, 2vw, 1.5em);
    font-weight: 700;
    margin-top: 8px;
    color: #2d3748;
  }

  p {
    font-size: clamp(0.9em, 1.5vw, 1.1em);
    color: #666;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    padding: 22px 20px;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  return (
    <Style>
      <h1>아이들 그림을 통해<MobileBr/>이야기를 생성해 보세요!</h1>
      <BodyText>
        아이들 그림을 저장하고, 그림을 업로드하면 이야기를 생성할 수 있습니다.
      </BodyText>
      {user ? (
        <Button to="/get-started">실습하기</Button>
      ) : (
        <Button to="/login">로그인</Button>
      )}
      <Cards>
        <Card>
          <h2>그림 저장</h2>
          <p>그림을 업로드하여<br/>저장할 수 있습니다.</p>
        </Card>
        <Card>
          <h2>그림 확인</h2>
          <p>업로드한 그림을<br/>확인할 수 있습니다.</p>
        </Card>
        <Card>
          <h2>동화 생성</h2>
          <p>업로드한 그림으로<br/>동화를 생성할 수 있습니다.</p>
        </Card>
      </Cards>
    </Style>
  );
};

export default Home;