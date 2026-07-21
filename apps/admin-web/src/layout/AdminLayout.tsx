import styled from "@emotion/styled";
import Footer, {
  Header,
  type FooterProps,
  type HeaderProps,
} from "@commonly/ui";
import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router";

export interface AdminLayoutProps {
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

function AdminLayout({
  children,
  headerProps,
  footerProps,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const handleNavigate =
    headerProps?.onNavigate ?? ((href: string) => void navigate(href));

  return (
    <LayoutRoot>
      <Header
        {...headerProps}
        variant="admin"
        onNavigate={handleNavigate}
      />
      <MainContent id="main-content">
        {children ?? <Outlet />}
      </MainContent>
      <Footer {...footerProps} />
    </LayoutRoot>
  );
}

export default AdminLayout;
