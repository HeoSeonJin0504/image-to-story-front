import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useState, useEffect, useRef } from "react";
import logo from "../photos/logo.png";
import { User } from "../types/user";
import { authApi } from "../api/auth";

const HeaderAnimation = keyframes`
  from { width: 0; left: 50%; }
  to   { width: 100%; left: 0; }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Style = styled.header`
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  height: 70px;
  padding: 0 40px;
  background: #fff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;

  h1 {
    font-size: 1.5em;
    margin: 0;
    @media (max-width: 768px) { font-size: 1.25em; }
  }
`;

const Logo = styled.img`
  height: 52px;
  cursor: pointer;
  @media (max-width: 768px) { height: 40px; }
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 70px;

  li { display: flex; align-items: center; height: 100%; }

  a {
    text-decoration: none;
    color: #333;
    position: relative;
    font-size: 1.5em;
    padding: 8px 14px;
    border-radius: 8px;
    transition: background 0.2s;
    white-space: nowrap;

    &:hover { background: #f0f0f0; }

    &.active:not(.main-link) {
      font-weight: bold;
      &::after {
        content: "";
        position: absolute;
        bottom: 2px;
        height: 3px;
        background: #abb7b7;
        border-radius: 2px;
        animation: ${HeaderAnimation} 0.3s ease-out forwards;
      }
    }
  }

  @media (max-width: 768px) { display: none; }
`;

const UserBadgeWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserBadge = styled.button`
  background: #f5f7f7;
  border: 1.5px solid #dce0e0;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  color: #444;
  transition: background 0.2s;
  &:hover { background: #e8ecec; }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 130px;
  background: #fff;
  border: 1px solid #dce0e0;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  overflow: hidden;
  animation: ${slideDown} 0.18s ease;
  z-index: 300;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-size: 1em;
  color: #333;
  &:hover { background: #f5f5f5; }
`;

const HamburgerBtn = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.2s;
  &:hover { background: #f0f0f0; }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: #333;
    border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s;
  }

  ${({ $open }) => $open && css`
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `}

  @media (max-width: 768px) { display: flex; }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 150;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 0.25s;
  }
`;

const MobileMenu = styled.nav<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 180;
    padding: 8px 0 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-110%)')};
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
  }
`;

const MobileNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  text-decoration: none;
  color: #333;
  font-size: 1.05em;
  font-weight: 600;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
  &:last-child { border-bottom: none; }
  &:hover, &.active { background: #f5f8f8; color: #5a7d7d; }
`;

const MobileUserSection = styled.div`
  padding: 14px 24px 4px;
  border-top: 2px solid #f0f0f0;
  margin-top: 4px;
`;

const MobileUserName = styled.p`
  font-size: 0.88em;
  color: #999;
  margin: 0 0 10px;
`;

const MobileLogoutBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: #f5f7f7;
  border: 1.5px solid #dce0e0;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #e8ecec; }
`;

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header = ({ user, setUser }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    setUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Style>
        <NavLink to="/" className="main-link" style={{ textDecoration: 'none', color: 'inherit' }}>
          <LogoContainer>
            <Logo src={logo} alt="로고" />
            <h1>그림나래</h1>
          </LogoContainer>
        </NavLink>

        <Nav>
          <li><NavLink to="/introduce" className={isActive('/introduce') ? 'active' : ''}>소개</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/get-started" className={isActive('/get-started') ? 'active' : ''}>실습하기</NavLink></li>
              <li><NavLink to="/mypage" className={isActive('/mypage') ? 'active' : ''}>마이페이지</NavLink></li>
            </>
          )}
          <li>
            {user ? (
              <UserBadgeWrap ref={dropdownRef}>
                <UserBadge onClick={() => setDropdownOpen(v => !v)}>{user.name}님 ▾</UserBadge>
                {dropdownOpen && (
                  <Dropdown>
                    <DropdownButton onClick={handleLogout}>로그아웃</DropdownButton>
                  </Dropdown>
                )}
              </UserBadgeWrap>
            ) : (
              <NavLink to="/login" className={isActive('/login') ? 'active' : ''}>로그인</NavLink>
            )}
          </li>
        </Nav>

        <HamburgerBtn $open={mobileOpen} onClick={() => setMobileOpen(v => !v)} aria-label="메뉴 열기">
          <span /><span /><span />
        </HamburgerBtn>
      </Style>

      <MobileOverlay $open={mobileOpen} onClick={() => setMobileOpen(false)} />

      <MobileMenu $open={mobileOpen}>
        <MobileNavLink to="/" className={isActive('/') ? 'active' : ''}>홈</MobileNavLink>
        <MobileNavLink to="/introduce" className={isActive('/introduce') ? 'active' : ''}>소개</MobileNavLink>
        {user && (
          <>
            <MobileNavLink to="/get-started" className={isActive('/get-started') ? 'active' : ''}>실습하기</MobileNavLink>
            <MobileNavLink to="/mypage" className={isActive('/mypage') ? 'active' : ''}>마이페이지</MobileNavLink>
          </>
        )}
        {!user && (
          <MobileNavLink to="/login" className={isActive('/login') ? 'active' : ''}>로그인</MobileNavLink>
        )}
        {user && (
          <MobileUserSection>
            <MobileUserName>{user.name}님으로 로그인 중</MobileUserName>
            <MobileLogoutBtn onClick={handleLogout}>로그아웃</MobileLogoutBtn>
          </MobileUserSection>
        )}
      </MobileMenu>
    </>
  );
};

export default Header;