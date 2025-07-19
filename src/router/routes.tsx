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
const CostView = lazy(() => import("@/features/cost/pages/ViewCostPage"));

const User = lazy(() => import("@/features/users/pages/UsersPage"));
const Role = lazy(() => import("@/features/users/pages/RolesPage"));
const Permission = lazy(() => import("@/features/users/pages/PermissionsPage"));

const MyAccount = lazy(()=> import("@/features/auth/pages/ProfileInformation"))
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PermissionRoute from "./PermissionRoute";


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
      { index: true, element:( <PermissionRoute requiredPermission='dashboard_statistics'><Dashboard /></PermissionRoute>) },
      
      {
        path: "incomes",
        children: [
          { index: true, element: ( <PermissionRoute requiredPermission='read_income'><Income /></PermissionRoute>)},
          { path: "view/:id", element: ( <PermissionRoute requiredPermission='details_income'><IncomeView /></PermissionRoute>)},
          { path: "create", element: ( <PermissionRoute requiredPermission='create_income'> <IncomeCreate /> </PermissionRoute>) },
          { path: "edit/:id", element: ( <PermissionRoute requiredPermission='update_income'> <IncomeEdit /> </PermissionRoute>) }
        ],
      },

      {
        path: "costs",
        children: [
          { index: true, element: ( <PermissionRoute requiredPermission='read_cost'><Cost /></PermissionRoute>)},
          { path: "view/:id", element: ( <PermissionRoute requiredPermission='details_cost'><CostView /></PermissionRoute>)},
          { path: "create", element: ( <PermissionRoute requiredPermission='create_cost'> <CostCreate /> </PermissionRoute>) },
          { path: "edit/:id", element: ( <PermissionRoute requiredPermission='update_cost'> <CostEdit /> </PermissionRoute>) }
        ],
      },

      {
        path: "users",
        children: [
          { index: true, element:( <PermissionRoute requiredPermission='read_user'><User /></PermissionRoute>) },
        ],
      },

      {
        path: "roles",
        children: [
          { index: true, element:( <PermissionRoute requiredPermission='read_role'><Role /></PermissionRoute>) },
        ],
      },

      {
        path: "permissions",
        children: [
          { index: true, element:( <PermissionRoute requiredPermission='read_permission'><Permission /></PermissionRoute>) },
        ],
      },

      {
        path: "my-account",
        children: [
          { index: true, element: <MyAccount /> },
        ],
      },
    ],
  },
]);

export default routes;
