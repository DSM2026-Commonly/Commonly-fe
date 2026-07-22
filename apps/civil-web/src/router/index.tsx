import { hasAuthToken } from "@commonly/utils";
import {
  createBrowserRouter,
  redirect,
  type LoaderFunctionArgs,
} from "react-router";
import CivilLayout from "../layout/CivilLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";
import SignupPage from "../pages/SignupPage";

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
    path: "/signup",
    loader: redirectAuthenticatedUser,
    Component: SignupPage,
  },
  {
    path: "/",
    loader: requireAuth,
    Component: CivilLayout,
    children: [
      {
        index: true,
        element: (
          <RoutePlaceholderPage
            title="경력관리 시스템"
            description="경력관리 서비스를 이용해 주세요."
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
