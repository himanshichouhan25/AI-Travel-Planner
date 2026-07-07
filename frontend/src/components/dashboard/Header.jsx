import { useEffect, useState } from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { getProfile } from "../../services/authProfileService";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        if (data?.id) {
          setProfilePhoto(localStorage.getItem(`profile_photo_${data.id}`));
        }
      } catch (error) {
        console.error("Failed to load user in header:", error);
      }
    };

    fetchUser();

    const handlePhotoUpdate = () => {
      if (user?.id) {
        setProfilePhoto(localStorage.getItem(`profile_photo_${user.id}`));
      } else {
        const keys = Object.keys(localStorage);
        const photoKey = keys.find(k => k.startsWith("profile_photo_"));
        if (photoKey) {
          setProfilePhoto(localStorage.getItem(photoKey));
        }
      }
    };

    window.addEventListener("profile_photo_updated", handlePhotoUpdate);
    return () => {
      window.removeEventListener("profile_photo_updated", handlePhotoUpdate);
    };
  }, [user?.id]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const username = user?.username || "Traveler";

  return (
    <header className="flex flex-col md:flex-row gap-4 md:items-center justify-between bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-5 mb-6 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      {/* Left Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          Welcome Back, {username} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          Ready to plan your next adventure?
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 self-end md:self-auto">
        {/* Search */}
        <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 w-56 md:w-64 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search trips..."
            className="bg-transparent outline-none ml-2 w-full text-slate-700 dark:text-slate-350 placeholder-slate-400 text-sm"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-xl border transition active:scale-95 ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-yellow-400"
              : "bg-yellow-50 hover:bg-yellow-100 border-yellow-100/50 text-amber-500"
          }`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-150 dark:border-slate-805 text-slate-500 dark:text-slate-400 transition active:scale-95">
          <Bell size={18} />
        </button>

        {/* Profile Avatar / Initials */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100 dark:border-slate-800">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base border border-blue-100 dark:border-slate-800 shadow-sm">
              {getInitials(username)}
            </div>
          )}
          <div className="hidden sm:block">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-none">{username}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Traveler</p>
          </div>
        </div>
      </div>
    </header>
  );
}