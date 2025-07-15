import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

type MenuItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Income Manage", to: "/dashboard/incomes" },
  { label: "Cost Manage", to: "/dashboard/costs" },
  {
    label: "User Management",
    children: [
      { label: "Users", to: "/dashboard/users" },
      { label: "Roles", to: "/dashboard/roles" },
      { label: "Permissions", to: "/dashboard/permissions" },
    ],
  }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Expand the dropdown if current path matches any of its children
    menuItems.forEach((item) => {
      if (item.children) {
        const isActive = item.children.some((child) =>
          location.pathname.startsWith(child.to)
        );
        if (isActive) {
          setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div onClick={() => navigate('/dashboard')} className="flex items-center gap-2 mb-6 cursor-pointer">
        <img src="/logo.svg" alt="ERP Logo" className="h-16 w-auto" />
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-800 cursor-pointer"
              >
                <span>{item.label}</span>
                {openMenus[item.label] ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
              {openMenus[item.label] && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-gray-700 px-3 py-1 rounded text-sm"
                          : "hover:bg-gray-800 px-3 py-1 rounded text-sm"
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to!}
              end // ensures only exact match triggers active
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 px-3 py-2 rounded"
                  : "hover:bg-gray-800 px-3 py-2 rounded"
              }
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
