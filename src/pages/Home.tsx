import styled from "styled-components";
import { NavLink } from "react-router-dom";
import backgroundImage from "../photos/homebackground.png";
import { User } from "../types/user";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 100vh;

  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;

  h1 {
    margin-top: 150px;
    font-size: 3.5em;
    padding: 10px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    display: inline-block;
  }

  h2 {
    font-size: 2em;
    margon-bottom: 10px;
  }

  .bodytext {
    margin-top: 20px;
    font-size: 1.5em;
    background: rgba(255, 255, 255, 0.6);
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .cards {
    display: flex;
    justify-content: center;
    margin: 0 20px;
    margin-bottom: 40px;
    gap: 4em;
    flex-wrap: wrap;
    margin-top: 100px;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 25%;
    min-width: 310px;
    padding: 30px;
    line-height: 1.5em;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    position: relative;
    opacity: 0;
    animation: fadeIn 3s ease forwards;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;

    margin-bottom: 100px;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  .card::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 16px;
    height: 16px;
    background-color: #abb7b7;
    border-radius: 50%;
  }

  .card h1 {
    font-weight: 600;
    margin-top: 10px;
    font-size: 1.8em;
    font-weight: bold;
  }

  .card p {
    font-size: 1.2em;
    color: #555;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Button = styled(NavLink)`
  display: inline-block;
  margin-top: 50px;
  padding: 10px 30px;
  text-decoration: none;

  background: #bdc2bb;
  border: 2px solid #bdc2bb;
  font-weight: bold;
  border-radius: 7px;
  color: white;

  font-size: 1.3em;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    background: #fff;
    color: #abb7b7;
    animation: jittery 4s infinite;
  }

  &:active {
    background: #fff;
    border-color: #fff;
  }

  @keyframes jittery {
    5%,
    50% {
      transform: scale(1);
    }

    10% {
      transform: scale(0.9);
    }

    15% {
      transform: scale(1.15);
    }

    20% {
      transform: scale(1.15) rotate(-5deg);
    }

    25% {
      transform: scale(1.15) rotate(5deg);
    }

    30% {
      transform: scale(1.15) rotate(-3deg);
    }

    35% {
      transform: scale(1.15) rotate(2deg);
    }

    40% {
      transform: scale(1.15) rotate(0);
    }
  }
`;

interface HomeProps {
  user: User | null;
}

const Home = ({ user }: HomeProps) => {
  return (
    <Style>
      <h1>아이들 그림을 통해 이야기를 생성해 보세요!</h1>
      <p className="bodytext">
        아이들 그림을 저장하고, 그림을 업로드하면 이야기를 생성할 수 있습니다.
      </p>
      {user ? (
        <Button to="/get-started">실습하기</Button>
      ) : (
        <Button to="/login">로그인</Button>
      )}
      <div className="cards">
        <div className="card">
          <h2>그림 저장</h2>
          <p>그림을 업로드하여 <br/> 저장할 수 있습니다.</p>
        </div>
        <div className="card">
          <h2>그림 확인</h2>
          <p>업로드한 그림을 <br/> 확인할 수 있습니다.</p>
        </div>
        <div className="card">
          <h2>동화 생성</h2>
          <p>업로드한 그림으로 <br/> 동화를 생성할 수 있습니다.</p>
        </div>
      </div>
    </Style>
  );
};

export default Home;
