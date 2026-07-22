import { createBrowserRouter } from "react-router";
import UserLayout from "../layout/UserLayout";
import CareerCertificateIssuePage from "../pages/CareerCertificateIssuePage";
import HomePage from "../pages/HomePage";
import IndividualRegistrationNoticePage from "../pages/IndividualRegistrationNoticePage";
import IndividualRegistrationSubjectPage from "../pages/IndividualRegistrationSubjectPage";
import IntegratedRegistrationConfirmPage from "../pages/IntegratedRegistrationConfirmPage";
import IntegratedRegistrationCompletePage from "../pages/IntegratedRegistrationCompletePage";
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
        Component: HomePage,
      },
      {
        path: "career/issue",
        Component: CareerCertificateIssuePage,
      },
      {
        path: "career/register",
        Component: RegistrationMethodPage,
      },
      {
        path: "career/register/individual",
        Component: IndividualRegistrationNoticePage,
      },
      {
        path: "career/register/individual/subject",
        Component: IndividualRegistrationSubjectPage,
      },
      {
        path: "career/register/individual/career",
        element: (
          <RoutePlaceholderPage
            title="경력사항 입력"
            description="개별 등록 대상자의 경력사항을 입력하는 페이지를 준비 중입니다."
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
        path: "career/register/bulk/complete",
        Component: IntegratedRegistrationCompletePage,
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
