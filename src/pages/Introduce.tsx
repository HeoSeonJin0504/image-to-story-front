import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../photos/introducebackground.png";
import { User } from "../types/user";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.6);
  background-blend-mode: lighten;
  position: relative;

  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;

  @media (max-width: 768px) {
    // 모바일 세로 모드(반응형)
    margin-bottom: 20px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  overflow-y: auto;

  @media (max-width: 768px) {
    // 모바일 세로 모드(반응형)
    overflow-y: visible;
  }
`;

const LeftTitle = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #343a40;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  display: inline-block;
`;

const LeftDescription = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
  height: auto;
  margin-bottom: 20px;
  border: 2px solid #343a40;
  border-radius: 10px;
`;

const Button = styled(Link)`
  display: inline-block;
  margin-top: 50px;
  padding: 15px 20px;
  text-decoration: none;

  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 7px;
  color: white;

  font-size: 1.5em;
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
`;

const StepContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const RightTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  display: inline-block;
`;

const RightDescription = styled.p`
  font-size: 1.6em;
  line-height: 1.5;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 1em;
  color: #333;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IntroduceProps {
  user: User | null;
}

const Introduce = ({ user }: IntroduceProps) => {
  return (
    <Container>
      <LeftContainer>
        <LeftTitle>그림나래</LeftTitle>
        <LeftDescription>
          그림을 디지털로 업로드하여 저장하고 인공지능을 활용하여
          <br />
          주제를 분석해 동화를 생성하는 프로그램입니다.
        </LeftDescription>
        <Image src="src/photos/introduce.png" alt="프로그램 실행 사진" />
        {user ? (
          <Button to="/get-started">실습하기</Button>
        ) : (
          <Button to="/login">로그인</Button>
        )}
      </LeftContainer>
      <RightContainer>
        <RightTitle>프로그램 사용 방법</RightTitle>
        <StepContainer>
          <RightDescription>1. 로그인을 진행해 주세요.</RightDescription>
          <Image src="src/photos/introduce/introduce1.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            2. 상단의 '실습하기'를 클릭해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce/introduce2.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            3. '사진 열기' 버튼을 클락해서 그림을 업로드해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce/introduce3.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            4. '그림 저장 및 동화 생성' 버튼을 클릭해 주세요.
          </RightDescription>
          <Image src="src/photos/introduce/introduce4.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            5. '동화 저장' 버튼을 클릭하면 동화 저장이 가능합니다.
          </RightDescription>
          <Image src="src/photos/introduce/introduce6.png" />
        </StepContainer>
        <StepContainer>
          <RightDescription>
            6. '점자 생성' 버튼을 클릭하면 점자로 읽을 수 있습니다.
          </RightDescription>
          <Image src="src/photos/introduce/introduce5.png" />
        </StepContainer>
      </RightContainer>
      <Footer>
        Designed by{" "}
        <a href="https://www.freepik.com/free-vector/colorful-stick-man-illustration-set_21910288.htm#fromView=search&page=1&position=47&uuid=9db0e428-5351-467b-9a7f-529d07d5a9d4">
          Freepik
        </a>
      </Footer>
    </Container>
  );
};

export default Introduce;