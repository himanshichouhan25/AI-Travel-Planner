import {
  LayoutDashboard,
  Map,
  Plane,
  Heart,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { logout } from "../../services/logoutService";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Planner",
    icon: Map,
    path: "/planner",
  },
  {
    title: "Trips",
    icon: Plane,
    path: "/trips",
  },
  {
    title: "Preferences",
    icon: Heart,
    path: "/preferences",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-sm flex-col justify-between transition-colors duration-300">
      <div>
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            AI Travel Planner
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 transition-all ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-r-4 border-purple-600 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-rose-500 hover:text-rose-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}