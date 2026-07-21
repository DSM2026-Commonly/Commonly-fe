import styled from "@emotion/styled";

interface OpenProps {
  $isOpen?: boolean;
}

interface ActiveProps {
  $isActive?: boolean;
}

interface FixedWidthProps {
  $width: number;
}

interface UtilityTextProps {
  $width?: number;
}

interface HeaderLayoutProps {
  $compact?: boolean;
}

export const HeaderRoot = styled.header<HeaderLayoutProps>`
  position: relative;
  z-index: 100;
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? "69px" : "105px")};
  box-sizing: border-box;
  border-bottom: 1px solid #cdd1d5;
  background: #ffffff;
  color: #1e2124;
  font-family:
    "Pretendard GOV", Pretendard, "Noto Sans KR", "Malgun Gothic", sans-serif;

  @media (max-width: 767px) {
    min-height: auto;
  }
`;

export const HeaderBody = styled.div<HeaderLayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $compact }) => ($compact ? "0" : "4px")};
  width: 100%;
  padding: 12px 0 15px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const UtilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: min(1200px, calc(100% - 32px));
  height: 32px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const UtilityText = styled.span<UtilityTextProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => `${$width ?? 57}px`};
  height: 23px;
  flex: 0 0 ${({ $width }) => `${$width ?? 57}px`};
  color: #1e2124;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const UtilityDivider = styled.span`
  width: 1px;
  height: 16px;
  flex: 0 0 1px;
  background: #cdd1d5;
`;

export const UtilityButton = styled.button<FixedWidthProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => `${$width}px`};
  height: 24px;
  flex: 0 0 ${({ $width }) => `${$width}px`};
  padding: 0 2px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: #1e2124;
  font: inherit;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  text-decoration: underline;
  text-underline-position: from-font;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease,
    transform 80ms ease;

  &:hover {
    background: #f4f5f6;
    color: #0b50d0;
  }

  &:active {
    background: #e7f0ff;
    color: #083b9a;
    box-shadow: inset 0 0 0 1px #b7ceef;
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid #246beb;
    outline-offset: 1px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  width: min(1200px, calc(100% - 32px));
  height: 41.148px;

  @media (max-width: 767px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: auto;
  }
`;

export const BrandLink = styled.a<FixedWidthProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: ${({ $width }) => `${$width}px`};
  height: 41.148px;
  flex: 0 0 ${({ $width }) => `${$width}px`};
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    border-radius: 4px;
    outline: 2px solid #246beb;
    outline-offset: 2px;
  }
`;

export const BrandLogo = styled.img`
  display: block;
  width: 120.204px;
  height: 41.148px;
  flex: 0 0 120.204px;
  object-fit: cover;
`;

export const BrandTitle = styled.span<FixedWidthProps>`
  display: inline-flex;
  align-items: center;
  width: ${({ $width }) => `${$width}px`};
  height: 29px;
  color: #595656;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const PrimaryNavigation = styled.nav`
  min-width: 0;
  flex: 1 1 auto;

  @media (max-width: 767px) {
    width: 100%;
    overflow-x: auto;
  }
`;

export const PrimaryNavigationList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 8px;
  height: 40px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 767px) {
    width: max-content;
    justify-content: flex-start;
  }
`;

export const PrimaryNavigationLink = styled.a<FixedWidthProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => `${$width}px`};
  height: 40px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 6px;
  background: transparent;
  color: #1e2124;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #f4f5f6;
  }

  &:focus-visible {
    outline: 2px solid #246beb;
    outline-offset: -2px;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  background: #ffffff;
`;

export const HeaderContainer = styled.div`
  width: 100%;
`;

export const Inner = styled.div`
  width: min(100% - 40px, 1280px);
  margin: 0 auto;

  @media (max-width: 767px) {
    width: calc(100% - 32px);
  }
`;

export const UtilityArea = styled.div`
  display: flex;
  justify-content: flex-end;
  min-height: 40px;
  border-bottom: 1px solid #e4e4e4;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const UtilityList = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Branding = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88px;
`;

export const Logo = styled.h1`
  margin: 0;

  a {
    display: flex;
    align-items: center;
    min-width: 200px;
    min-height: 48px;
    color: #1d1d1d;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1023px) {
    .desktop-action {
      display: none;
    }
  }
`;

export const Navigation = styled.nav`
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #d8d8d8;
  background: #ffffff;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const MainMenuList = styled.ul`
  display: flex;
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MainMenuItem = styled.li`
  position: static;
`;

export const MainTrigger = styled.button<ActiveProps>`
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0 24px;
  border: 0;
  border-bottom: 3px solid
    ${({ $isActive }) => ($isActive ? "#246beb" : "transparent")};
  background: transparent;
  color: ${({ $isActive }) => ($isActive ? "#0b50d0" : "#1d1d1d")};
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #0b50d0;
  }

  &:focus-visible {
    outline: 2px solid #246beb;
    outline-offset: -2px;
  }
`;

export const MainLink = styled.a`
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0 24px;
  color: #1d1d1d;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: #0b50d0;
  }

  &:focus-visible {
    outline: 2px solid #246beb;
    outline-offset: -2px;
  }
`;

export const MainToggleWrap = styled.div<OpenProps>`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 20;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  border-bottom: 1px solid #d8d8d8;
  background: #ffffff;
`;

export const MainList = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  width: min(100% - 40px, 1280px);
  min-height: 280px;
  margin: 0 auto;
`;

export const SubTriggerList = styled.ul`
  margin: 0;
  padding: 32px 24px;
  border-right: 1px solid #e4e4e4;
  list-style: none;
`;

export const SubTrigger = styled.button<ActiveProps>`
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 8px;
  background: ${({ $isActive }) => ($isActive ? "#eef5ff" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#0b50d0" : "#1d1d1d")};
  font: inherit;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f4f5f6;
  }
`;

export const SubMenuContent = styled.div`
  padding: 40px;
`;

export const SubTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 26px;
  line-height: 1.4;
`;

export const LastDepthList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px 24px;
  margin: 0;
  padding: 0;
  list-style: none;

  a,
  button {
    display: block;
    width: 100%;
    padding: 12px 0;
    border: 0;
    background: transparent;
    color: #1d1d1d;
    font: inherit;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover,
  button:hover {
    color: #0b50d0;
    text-decoration: underline;
  }
`;

export const DescriptionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 20px 0;
    border-bottom: 1px solid #e4e4e4;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #555555;
    line-height: 1.6;
  }
`;

export const Backdrop = styled.div<OpenProps>`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  background: rgb(0 0 0 / 50%);
`;

export const MobileNavigationLayer = styled.div<OpenProps>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  background: rgb(0 0 0 / 50%);

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileNavigationPanel = styled.div<OpenProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: min(100%, 480px);
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
`;

export const MobileHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e4e4e4;
`;

export const MobileLogin = styled.div`
  margin-bottom: 20px;
`;

export const MobileServiceMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  a {
    padding: 12px;
    border-radius: 8px;
    background: #f4f5f6;
    color: #1d1d1d;
    text-align: center;
    text-decoration: none;
  }
`;

export const MobileBody = styled.div`
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  height: calc(100% - 180px);
  overflow: hidden;
`;

export const MobileTabList = styled.div`
  overflow-y: auto;
  border-right: 1px solid #e4e4e4;
  background: #f8f8f8;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export const MobileTab = styled.button<ActiveProps>`
  width: 100%;
  padding: 18px 12px;
  border: 0;
  border-left: 3px solid
    ${({ $isActive }) => ($isActive ? "#246beb" : "transparent")};
  background: ${({ $isActive }) => ($isActive ? "#ffffff" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#0b50d0" : "#1d1d1d")};
  font: inherit;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  text-align: left;
  cursor: pointer;
`;

export const MobileSubmenuArea = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const MobileSubsection = styled.section`
  padding: 24px;
  border-bottom: 1px solid #e4e4e4;
  scroll-margin-top: 0;
`;

export const MobileSubList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    border-bottom: 1px solid #e4e4e4;
  }
`;

export const MobileSubButton = styled.button<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  border: 0;
  background: transparent;
  color: ${({ $isActive }) => ($isActive ? "#0b50d0" : "#1d1d1d")};
  font: inherit;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  text-align: left;
  cursor: pointer;
`;

export const MobileDepth3 = styled.div<OpenProps>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  padding: 0 0 16px 16px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a,
  button {
    display: block;
    width: 100%;
    padding: 12px 0;
    border: 0;
    background: transparent;
    color: #555555;
    font: inherit;
    text-align: left;
    text-decoration: none;
  }
`;

export const Depth4Layer = styled.div<OpenProps>`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  overflow-y: auto;
  background: #ffffff;
`;

export const Depth4Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid #e4e4e4;
`;

export const Depth4Body = styled.div`
  padding: 24px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    padding: 16px 0;
    border-bottom: 1px solid #e4e4e4;
    color: #1d1d1d;
    text-decoration: none;
  }
`;

export const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
