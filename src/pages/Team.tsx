import styled from "styled-components";
import user from "../photos/user.png";
import backgroundImage from "../photos/teambackground.png";
import github from "../photos/github.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; 
  min-width: 100vw;
  position: relative;
  
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    padding: 20px;
    background-size: cover;
  }
`;

const Title = styled.h1`
  margin-top: 100px;
  margin-bottom: 80px;
  font-size: 2.5em;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    margin-bottom: 40px;
    font-size: 2em;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    flex-direction: column;
    gap: 20px;
  }
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  text-align: center;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    width: 100%;
    padding: 20px;
  }
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 1px solid #ccc;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    width: 100px;
    height: 100px;
  }
`;

const MemberName = styled.p`
  margin-bottom: 15px;
  font-size: 1.8em;
  font-weight: bold;
  color: black;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    font-size: 1.5em;
  }
`;

const MemberRole = styled.p`
  font-size: 1.3em;
  color: black;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    font-size: 1.1em;
  }
`;

const GithubIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 10px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 768px) { // 모바일 세로 모드(반응형)
    width: 40px;
    height: 40px;
  }
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

const Team = () => {
  const teamMembers = [
    {
      role: "AI, 백엔드",
      description: "임희진",
      image: user,
      githubLink: "https://github.com/limhuijin",
    },
    {
      role: "DB, 서버 개발",
      description: "송진우",
      image: user,
      githubLink: "https://github.com/ssong77",
    },
    {
      role: "프론트엔드, 백엔드",
      description: "허선진",
      image: user,
      githubLink: "https://github.com/HeoSeonJin0504",
    },
    {
      role: "HW 관리, 디자인",
      description: "김소희",
      image: user,
      githubLink: "https://github.com/shkim429",
    },
  ];

  return (
    <Container>
      <Title>팀원 소개</Title>
      <TeamContainer>
        {teamMembers.map((member, index) => (
          <MemberCard key={index}>
            <MemberImage src={member.image} alt={member.description} />
            <MemberName>{member.description}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <a href={member.githubLink}>
              <GithubIcon src={github} alt="GitHub" />
            </a>
          </MemberCard>
        ))}
      </TeamContainer>
      <Footer>
        Designed by{" "}
        <a href="https://kr.freepik.com/free-vector/flat-world-environment-day-background_26210190.htm#fromView=search&page=2&position=4&uuid=8cf41b08-7ec1-4797-a34d-62ea92057134">
          Freepik
        </a>
      </Footer>
    </Container>
  );
};

export default Team;