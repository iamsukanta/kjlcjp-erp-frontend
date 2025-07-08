import { hasPermission } from "../../utils/permission";
export const WithPermission = ({
  permission,
  children,
}: {
  permission: string;
  children: JSX.Element;
}) => {
  return hasPermission(permission) ? children : null;
};