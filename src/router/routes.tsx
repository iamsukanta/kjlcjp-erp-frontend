import { lazy } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
const Login = lazy(() => import("@/features/auth/pages/LoginPage"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const Income = lazy(() => import("@/features/income/pages/IncomePage"));
const IncomeView = lazy(() => import("@/features/income/pages/ViewIncomePage"));
const IncomeCreate = lazy(() => import("@/features/income/pages/CreateIncomePage"));
const IncomeEdit = lazy(() => import("@/features/income/pages/EditIncomePage"));
const Cost = lazy(() => import("@/features/cost/pages/CostPage"));
const CostCreate = lazy(() => import("@/features/cost/pages/CreateCostPage"));
const CostEdit = lazy(() => import("@/features/cost/pages/EditCostPage"));
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
        path: "incomes",
        children: [
          { index: true, element: <Income /> },
          { path: "view/:id", element: <IncomeView /> },
          { path: "create", element: <IncomeCreate /> },
          { path: "edit/:id", element: <IncomeEdit /> },
        ],
      },

      {
        path: "costs",
        children: [
          { index: true, element: <Cost /> },
          { path: "create", element: <CostCreate /> },
          { path: "edit/:id", element: <CostEdit /> },
        ],
      },
    ],
  },
]);

export default routes;
