import {
  ApplicationShell,
  type FooterProps,
  type HeaderProps,
} from "@commonly/ui";
import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router";

export interface CivilLayoutProps {
  children?: ReactNode;
  headerProps?: Omit<HeaderProps, "variant">;
  footerProps?: FooterProps;
}

function CivilLayout({
  children,
  headerProps,
  footerProps,
}: CivilLayoutProps) {
  const navigate = useNavigate();
  const handleNavigate =
    headerProps?.onNavigate ?? ((href: string) => void navigate(href));

  return (
    <ApplicationShell
      headerVariant="civil"
      headerProps={{ ...headerProps, onNavigate: handleNavigate }}
      footerProps={footerProps}
    >
      {children ?? <Outlet />}
    </ApplicationShell>
  );
}

export default CivilLayout;
