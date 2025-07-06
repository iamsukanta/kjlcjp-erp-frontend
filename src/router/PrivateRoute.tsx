import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const credentials = useAuthStore((state) => state.credentials);
  return credentials ? children : <Navigate to="/" />;
}
