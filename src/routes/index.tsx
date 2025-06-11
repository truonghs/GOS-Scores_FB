import { DefaultLayout } from "@/layouts";
import { Reports, SearchScores } from "@/pages";
import { PATH } from "@/utils";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      // {
      //   path: PATH.dashboard,
      //   element: <Dashboard />,
      // },
      {
        path: PATH.search,
        element: <SearchScores />,
      },
      {
        path: PATH.reports,
        element: <Reports />,
      },
      // {
      //   path: PATH.settings,
      //   element: <Setting />,
      // },
    ],
  },
]);
