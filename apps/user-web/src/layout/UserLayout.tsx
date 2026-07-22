import styled from "@emotion/styled";
import Footer, {
  Header,
  type FooterProps,
  type HeaderProps,
  useScrollToTopOnChange,
} from "@commonly/ui";
import type { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export interface UserLayoutProps {
  children?: ReactNode;
  headerProps?: Omit<HeaderProps, "variant">;
  footerProps?: FooterProps;
}

const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1 0 auto;
`;

function UserLayout({
  children,
  headerProps,
  footerProps,
}: UserLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCareerRegistrationPath =
    pathname === "/career/register" ||
    pathname.startsWith("/career/register/");

  useScrollToTopOnChange(pathname, isCareerRegistrationPath);

  const handleNavigate =
    headerProps?.onNavigate ?? ((href: string) => void navigate(href));

  return (
    <LayoutRoot>
      <Header
        {...headerProps}
        variant="user"
        onNavigate={handleNavigate}
      />
      <MainContent id="main-content">
        {children ?? <Outlet />}
      </MainContent>
      <Footer {...footerProps} />
    </LayoutRoot>
  );
}

export default UserLayout;
