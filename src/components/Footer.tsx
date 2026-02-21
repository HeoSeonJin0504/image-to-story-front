import styled from "styled-components";
import { Link } from "react-router-dom";
import { color } from "../theme";

const Style = styled.footer`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.15);
  margin-top: 2px;

  color: ${color.lightGray};
  font-size: 1.1em;

  padding: 5px 0;

  p {
    margin: 3px;
  }

  a {
    color: ${color.lightGray};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <Style>
      <p>© 2024–2026 물론이조 (<Link to="/team">팀원 소개</Link>). All rights reserved</p>
    </Style>
  );
};

export default Footer;