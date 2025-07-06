import { lazy } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
const Login = lazy(() => import("@/features/auth/pages/LoginPage"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const Income = lazy(() => import("@/features/income/pages/IncomePage"));
const IncomeCreate = lazy(() => import("@/features/income/pages/CreateIncomePage"));
const IncomeEdit = lazy(() => import("@/features/income/pages/EditIncomePage"));
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
      
      {
        path: "income",
        children: [
          { index: true, element: <Income /> },
          { path: "create", element: <IncomeCreate /> },
          { path: "edit/:id", element: <IncomeEdit /> },
        ],
      },

      {
        path: "cost",
        children: [
          { index: true, element: <Cost /> },
        ],
      },
    ],
  },
]);

export default routes;
