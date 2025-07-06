import { lazy } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
const Login = lazy(() => import("@/features/auth/pages/LoginPage"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const Income = lazy(() => import("@/features/income/pages/IncomePage"));
const Cost = lazy(() => import("@/features/cost/pages/CostPage"));
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <LayoutWrapper />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "income", element: <Income /> },
      { path: "cost", element: <Cost /> },
    ],
  },
]);

export default routes;
