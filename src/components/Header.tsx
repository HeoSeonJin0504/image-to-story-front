import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import logo from "../photos/logo.png";
import { User } from "../types/user";

const HeaderAnimation = keyframes` 
  from {
    width: 0;
    left: 50%;
  }
  to {
    width: 100%;
    left: 0;
  }
`;

const Style = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 40px;
  font-family: "DunggeunmisoR", Arial, sans-serif; /* 글꼴 설정 */
  font-weight: bold; /* 글꼴 굵게 설정 */

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 2px;

  h1 {
    font-size: 1.5em;
  }
  h2 {
    margin-right: 10px;
    font-size: 1.75em;
  }

  ul,
  ul li,
  ul li a {
    display: flex;
    align-items: center;
    height: 100%;
  }

  ul {
    gap: 30px;
  }

  ul li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
    position: relative;
    font-size: 1.2em;
    padding: 10px 20px;
    border-radius: 10px;
    transition: background-color 0.5s, color 0.5s;
  }

  a.active:not(.main-link) {
    border: none;
    background-color: transparent;
    font-weight: bold;
    position: relative;
    color: black;
  }

  a.active:not(.main-link)::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 100%;
    height: 7px;
    background-color: #e0e0e0;
    animation: ${HeaderAnimation} 0.3s ease-out forwards;
  }

  a:hover {
    background-color: #e0e0e0;
  }

  .main-link {
    border: none !important; /* 'Main' 링크에는 헤더 애니메이션 적용 x */
    background-color: transparent !important;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px;

    ul {
      flex-direction: column;
      gap: 10px;
    }

    a {
      font-size: 1em;
      padding: 5px 10px;
    }
  }
`;

const Logo = styled.img`
  height: 65px;
  margin-right: 10px;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  width: 150px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  @media (max-width: 768px) {
    top: auto;
    bottom: -70px;
    right: 0;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-size: 1.3em;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header = ({ user, setUser }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <Style>
      <NavLink
        to="/"
        className={`main-link ${location.pathname === "/" ? "active" : ""}`}
      >
        <LogoContainer>
          <Logo src={logo} alt="로고" />
          <h1>그림나래</h1>
        </LogoContainer>
      </NavLink>
      <ul>
        <li>
          <NavLink
            to="/introduce"
            className={location.pathname === "/introduce" ? "active" : ""}
          >
            <h1>소개</h1>
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/get-started"
              className={location.pathname === "/get-started" ? "active" : ""}
            >
              <h1>실습하기</h1>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/team"
            className={location.pathname === "/team" ? "active" : ""}
          >
            <h1>팀원</h1>
          </NavLink>
        </li>
        <li>
          {user ? (
            <div style={{ position: "relative" }}>
              <h2
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: "pointer" }}
              >
                {user.name}님
              </h2>
              {dropdownOpen && (
                <Dropdown>
                  <DropdownButton onClick={handleLogout}>
                    로그아웃
                  </DropdownButton>
                </Dropdown>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              <h1>로그인</h1>
            </NavLink>
          )}
        </li>
      </ul>
    </Style>
  );
};

export default Header;