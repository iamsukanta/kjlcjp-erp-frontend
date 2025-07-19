import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore, getAuthToken  } from "../../store/authStore";

const LayoutWrapper = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const token = getAuthToken();
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
