import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Plane,
  Heart,
  User,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
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
    title: "Prefs",
    icon: Heart,
    path: "/preferences",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function MobileNavBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 z-50 flex justify-around items-center py-2 px-2 shadow-2xl transition-colors duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-205 ${
                isActive
                  ? "text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-950/30"
                  : "text-slate-500 dark:text-slate-400 hover:text-purple-600"
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{item.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
