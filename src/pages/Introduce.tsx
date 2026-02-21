import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../photos/introducebackground.png";
import { User } from "../types/user";
import introduceImg from "../photos/introduce.png";
import introduce1 from "../photos/introduce/introduce1.png";
import introduce2 from "../photos/introduce/introduce2.png";
import introduce3 from "../photos/introduce/introduce3.png";
import introduce4 from "../photos/introduce/introduce4.png";
import introduce5 from "../photos/introduce/introduce5.png";
import introduce6 from "../photos/introduce/introduce6.png";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 70px);

  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255,255,255,0.6);
  background-blend-mode: lighten;

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
  padding: 48px 32px;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 32px 20px 24px;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px 32px;
  overflow-y: scroll;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 16px 20px 32px;
    overflow-y: visible;
  }
`;

const LeftTitle = styled.h1`
  font-size: clamp(1.8em, 3.5vw, 2.4em);
  color: #343a40;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 6px 14px;
  text-align: center;
  margin: 0;
`;

const LeftDescription = styled.p`
  font-size: clamp(0.95em, 1.8vw, 1.15em);
  line-height: 1.7;
  text-align: center;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 10px 16px;
  margin: 0;
`;

const IntroImage = styled.img`
  width: min(100%, 340px);
  height: auto;
  border: 2px solid #c8d0d0;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 13px 28px;
  text-decoration: none;
  background: #abb7b7;
  border: 2px solid #abb7b7;
  font-weight: bold;
  border-radius: 8px;
  color: white;
  font-size: clamp(1em, 2.5vw, 1.3em);
  cursor: pointer;
  transition: background 0.25s, color 0.25s, transform 0.2s;
  margin-top: 8px;

  &:hover {
    background: #fff;
    color: #abb7b7;
    transform: translateY(-2px);
  }
`;

const RightTitle = styled.h2`
  font-size: clamp(1.2em, 2.5vw, 1.7em);
  background: rgba(255,255,255,0.8);
  border-radius: 10px;
  padding: 6px 14px;
  margin: 0 0 8px;
  text-align: center;
`;

const StepCard = styled.div`
  width: 100%;
  max-width: 480px;
  margin-bottom: 20px;
  text-align: center;
  background: rgba(255,255,255,0.85);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
`;

const StepDesc = styled.p`
  font-size: clamp(1em, 2vw, 1.35em);
  line-height: 1.5;
  margin: 0 0 12px;
  color: #444;
`;

const StepImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #dce0e0;
`;

const FreepikFooter = styled.footer`
  padding: 10px 14px;
  font-size: 0.8em;
  color: #888;
  text-align: center;

  a { color: #888; text-decoration: none; &:hover { text-decoration: underline; } }
`;

interface IntroduceProps { user: User | null; }

const Introduce = ({ user }: IntroduceProps) => {
  return (
    <>
      <Container>
        <LeftContainer>
          <LeftTitle>그림나래</LeftTitle>
          <LeftDescription>
            그림을 디지털로 업로드하여 저장하고 인공지능을 활용하여<br />
            주제를 분석해 동화를 생성하는 프로그램입니다.
          </LeftDescription>
          <IntroImage src={introduceImg} alt="프로그램 실행 사진" />
          {user
            ? <Button to="/get-started">실습하기</Button>
            : <Button to="/login">로그인</Button>}
        </LeftContainer>

        <RightContainer>
          <RightTitle>프로그램 사용 방법</RightTitle>
          {[
            { desc: "1. 로그인을 진행해 주세요.", img: introduce1 },
            { desc: "2. 상단의 '실습하기'를 클릭해 주세요.", img: introduce2 },
            { desc: "3. '사진 열기' 버튼을 클릭해서 그림을 업로드해 주세요.", img: introduce3 },
            { desc: "4. '동화 생성' 버튼을 클릭해 주세요.", img: introduce4 },
            { desc: "5. '동화 저장' 버튼을 클릭하면 이미지 및 동화 저장이 가능합니다.", img: introduce6 },
            { desc: "6. '재생성' 버튼을 클릭하면 동화를 다시 생성할 수 있습니다.", img: introduce5 },
          ].map((step, i) => (
            <StepCard key={i}>
              <StepDesc>{step.desc}</StepDesc>
              <StepImage src={step.img} alt={`단계 ${i + 1}`} />
            </StepCard>
          ))}
        </RightContainer>
      </Container>
      <FreepikFooter>
        Designed by{" "}
        <a href="https://www.freepik.com/free-vector/colorful-stick-man-illustration-set_21910288.htm#fromView=search&page=1&position=47&uuid=9db0e428-5351-467b-9a7f-529d07d5a9d4">
          Freepik
        </a>
      </FreepikFooter>
    </>
  );
};

export default Introduce;