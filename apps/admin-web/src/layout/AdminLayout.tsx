import {
  ApplicationShell,
  type FooterProps,
  type HeaderProps,
  useScrollToTopOnChange,
} from "@commonly/ui";
import type { ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export interface AdminLayoutProps {
  children?: ReactNode;
  headerProps?: Omit<HeaderProps, "variant">;
  footerProps?: FooterProps;
}

function AdminLayout({
  children,
  headerProps,
  footerProps,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCareerRegistrationPath =
    pathname === "/career/register" ||
    pathname.startsWith("/career/register/");

  useScrollToTopOnChange(pathname, isCareerRegistrationPath);

  const handleNavigate =
    headerProps?.onNavigate ?? ((href: string) => void navigate(href));

  return (
    <ApplicationShell
      headerVariant="admin"
      headerProps={{ ...headerProps, onNavigate: handleNavigate }}
      footerProps={footerProps}
    >
      {children ?? <Outlet />}
    </ApplicationShell>
  );
}

export default AdminLayout;
