import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import IntegratedRegistrationNoticePage from "../pages/IntegratedRegistrationNoticePage";
import NotFoundPage from "../pages/NotFoundPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: (
          <RoutePlaceholderPage
            title="경력관리 관리자 시스템"
            description="상단 메뉴에서 필요한 관리 업무를 선택해 주세요."
          />
        ),
      },
      {
        path: "career/issue",
        element: (
          <RoutePlaceholderPage
            title="경력증명서 발급"
            description="경력증명서 발급 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "career/register",
        Component: IntegratedRegistrationNoticePage,
      },
      {
        path: "career/register/bulk",
        Component: IntegratedRegistrationNoticePage,
      },
      {
        path: "career/register/bulk/upload",
        element: (
          <RoutePlaceholderPage
            title="파일 업로드"
            description="경력사항 통합 등록 파일 업로드 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "career/edit",
        element: (
          <RoutePlaceholderPage
            title="경력사항 수정"
            description="경력사항 수정 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "accounts",
        element: (
          <RoutePlaceholderPage
            title="사용자 관리"
            description="사용자 관리 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "history",
        element: (
          <RoutePlaceholderPage
            title="업무 이력 조회"
            description="업무 이력 조회 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
