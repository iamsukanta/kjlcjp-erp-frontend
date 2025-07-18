import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { WithPermission } from "../hoc/WithPermission";

type MenuItem = {
  label: string;
  to?: string;
  permission: string,
  children?: { label: string; to: string, permission: string }[];
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", to: "/dashboard", permission: 'dashboard_statistics' },
  { label: "Income Manage", to: "/dashboard/incomes", permission: 'read_income' },
  { label: "Cost Manage", to: "/dashboard/costs", permission: 'read_cost' },
  {
    label: "User Management",
    children: [
      { label: "Users", to: "/dashboard/users", permission: 'read_user' },
      { label: "Roles", to: "/dashboard/roles", permission: 'read_role' },
      { label: "Permissions", to: "/dashboard/permissions", permission: 'read_permission'},
    ],
    permission: 'read_user'
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
            <WithPermission key={item.label} permission={item.permission}>
              <div>
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
                      <WithPermission key={child.to} permission={child.permission}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-700 px-3 py-1 rounded text-sm"
                              : "hover:bg-gray-800 px-3 py-1 rounded text-sm"
                          }
                        >
                          {child.label}
                        </NavLink>
                      </WithPermission>
                    ))}
                  </div>
                )}
              </div>
            </WithPermission>
          ) : (
            <WithPermission key={item.to} permission={item.permission}>
              <NavLink
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
            </WithPermission>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
