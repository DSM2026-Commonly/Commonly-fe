import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
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
