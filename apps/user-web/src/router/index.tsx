import { createBrowserRouter } from "react-router";
import UserLayout from "../layout/UserLayout";
import IntegratedRegistrationConfirmPage from "../pages/IntegratedRegistrationConfirmPage";
import IntegratedRegistrationNoticePage from "../pages/IntegratedRegistrationNoticePage";
import IntegratedRegistrationPreviewPage from "../pages/IntegratedRegistrationPreviewPage";
import IntegratedRegistrationUploadPage from "../pages/IntegratedRegistrationUploadPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegistrationMethodPage from "../pages/RegistrationMethodPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      {
        index: true,
        element: (
          <RoutePlaceholderPage
            title="경력관리 담당자 시스템"
            description="상단 메뉴에서 필요한 업무를 선택해 주세요."
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
        Component: RegistrationMethodPage,
      },
      {
        path: "career/register/individual",
        element: (
          <RoutePlaceholderPage
            title="경력사항 개별 등록"
            description="경력사항을 직접 입력하여 등록해 주세요."
          />
        ),
      },
      {
        path: "career/register/bulk",
        Component: IntegratedRegistrationNoticePage,
      },
      {
        path: "career/register/bulk/upload",
        Component: IntegratedRegistrationUploadPage,
      },
      {
        path: "career/register/bulk/confirm",
        Component: IntegratedRegistrationConfirmPage,
      },
      {
        path: "career/register/bulk/preview",
        Component: IntegratedRegistrationPreviewPage,
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
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
