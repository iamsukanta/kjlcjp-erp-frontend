import { Navigate } from "react-router-dom";
import { useAuthStore, getUserPermissions } from "../store/authStore";

const PermissionRoute = ({
  children,
  requiredPermission,
}: {
  children: JSX.Element;
  requiredPermission: string;
}) => {
  const { credentials } = useAuthStore();

  if (!credentials?.access_token) return <Navigate to="/" />;

  if (!getUserPermissions().includes(requiredPermission)) {
    return <div className="p-4 font-bold text-md text-red-700">Access Denied</div>;
  }
  return children;
};

export default PermissionRoute;
