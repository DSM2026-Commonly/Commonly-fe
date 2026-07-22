import { hasAuthToken } from "@commonly/utils";
import {
  createBrowserRouter,
  redirect,
  type LoaderFunctionArgs,
} from "react-router";
import UserLayout from "../layout/UserLayout";
import CareerCertificateIssuePage from "../pages/CareerCertificateIssuePage";
import CareerEditPage from "../pages/CareerEditPage";
import HomePage from "../pages/HomePage";
import IntegratedRegistrationConfirmPage from "../pages/IntegratedRegistrationConfirmPage";
import IntegratedRegistrationCompletePage from "../pages/IntegratedRegistrationCompletePage";
import IntegratedRegistrationNoticePage from "../pages/IntegratedRegistrationNoticePage";
import IntegratedRegistrationPreviewPage from "../pages/IntegratedRegistrationPreviewPage";
import IntegratedRegistrationUploadPage from "../pages/IntegratedRegistrationUploadPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegistrationMethodPage from "../pages/RegistrationMethodPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";

function requireAuth({ request }: LoaderFunctionArgs) {
  if (hasAuthToken()) {
    return null;
  }

  const requestUrl = new URL(request.url);
  const redirectTo = `${requestUrl.pathname}${requestUrl.search}${requestUrl.hash}`;

  return redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
}

function redirectAuthenticatedUser() {
  return hasAuthToken() ? redirect("/") : null;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    loader: redirectAuthenticatedUser,
    Component: LoginPage,
  },
  {
    path: "/",
    loader: requireAuth,
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
        path: "career/register/bulk/complete",
        Component: IntegratedRegistrationCompletePage,
      },
      {
        path: "career/edit",
        Component: CareerEditPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
