import { createBrowserRouter } from "react-router";
import CivilLayout from "../layout/CivilLayout";
import NotFoundPage from "../pages/NotFoundPage";
import RoutePlaceholderPage from "../pages/RoutePlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
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
