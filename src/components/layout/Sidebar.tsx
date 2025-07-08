import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/incomes", label: "Income" },
    { to: "/dashboard/costs", label: "Cost" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">KJLCJP ERP</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 px-3 py-2 rounded"
                : "hover:bg-gray-800 px-3 py-2 rounded"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
