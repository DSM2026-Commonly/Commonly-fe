import { createBrowserRouter } from "react-router";
import UserLayout from "../layout/UserLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
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
        element: (
          <RoutePlaceholderPage
            title="경력증명서 발급"
            description="경력증명서 발급 페이지를 준비 중입니다."
          />
        ),
      },
      {
        path: "career/register",
        element: (
          <RoutePlaceholderPage
            title="경력사항 등록"
            description="경력사항 등록 페이지를 준비 중입니다."
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
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
