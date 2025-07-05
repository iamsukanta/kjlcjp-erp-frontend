import { lazy } from "react";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
import PrivateRoute from "./PrivateRoute";

const routes = [
  { path: "/", element: <LoginPage /> },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardPage /></PrivateRoute>,
  },
];

export default routes;
