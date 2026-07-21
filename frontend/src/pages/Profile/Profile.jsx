import { useEffect, useState, useRef } from "react";
import { 
  User, Mail, Calendar, LogOut, Camera, Image,
  Palmtree, Mountain, Building, Trees, Landmark, Sparkles,
  Wallet, Coins, Gem, Users, Heart, Users2, Activity, Coffee, 
  Briefcase, Compass, Settings, AlertCircle 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { getProfile } from "../../services/authProfileService";
import { getPreferences } from "../../services/preferenceService";
import { logout } from "../../services/logoutService";

import LoadingSpinner from "../../components/common/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
      if (data?.id) {
        setProfilePhoto(localStorage.getItem(`profile_photo_${data.id}`));
      }
      
      // Load preferences
      try {
        const prefData = await getPreferences();
        setPreferences(prefData);
      } catch (err) {
        console.error("Failed to load preferences on profile page:", err);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    }
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (user?.id) {
        localStorage.setItem(`profile_photo_${user.id}`, base64String);
        setProfilePhoto(base64String);
        toast.success("Profile photo updated successfully!");
        
        window.dispatchEvent(new Event("profile_photo_updated"));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (user?.id) {
      localStorage.removeItem(`profile_photo_${user.id}`);
      setProfilePhoto(null);
      toast.success("Profile photo removed.");
      window.dispatchEvent(new Event("profile_photo_updated"));
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  // Icon and Style mapping helper functions
  const getDestinationDetails = (type) => {
    switch (type) {
      case "Beach": 
        return { icon: Palmtree, label: "Beach Getaway", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100/50 dark:border-emerald-900/30" };
      case "Mountains": 
        return { icon: Mountain, label: "Mountain Retreat", color: "text-sky-500 bg-sky-50 dark:bg-sky-950/20 border-sky-100/50 dark:border-sky-900/30" };
      case "City": 
        return { icon: Building, label: "Urban Exploration", color: "text-slate-650 bg-slate-50 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50" };
      case "Nature": 
        return { icon: Trees, label: "Nature & Wildlife", color: "text-green-600 bg-green-50 dark:bg-green-950/20 border-green-100/50 dark:border-green-900/30" };
      case "History": 
        return { icon: Landmark, label: "History & Culture", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-100/50 dark:border-amber-900/30" };
      case "Wellness": 
        return { icon: Sparkles, label: "Wellness & Spa", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-100/50 dark:border-purple-900/30" };
      default: 
        return { icon: Compass, label: type || "Not Configured", color: "text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800" };
    }
  };

  const getBudgetDetails = (budget) => {
    switch (budget) {
      case "Budget": 
        return { icon: Wallet, label: "Budget (Economy)", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30" };
      case "Standard": 
        return { icon: Coins, label: "Standard (Moderate)", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-100/50 dark:border-blue-900/30" };
      case "Luxury": 
        return { icon: Gem, label: "Luxury (Premium)", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20 border-rose-100/50 dark:border-rose-900/30" };
      default: 
        return { icon: Wallet, label: budget || "Not Configured", color: "text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800" };
    }
  };

  const getTravelStyleDetails = (style) => {
    switch (style) {
      case "Solo": 
        return { icon: User, label: "Solo Traveler", color: "text-slate-500 bg-slate-50 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50" };
      case "Family": 
        return { icon: Users, label: "Family Trip", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20 border-purple-100/50 dark:border-purple-900/30" };
      case "Couple": 
        return { icon: Heart, label: "Romantic Couple", color: "text-pink-500 bg-pink-50 dark:bg-pink-950/20 border-pink-100/50 dark:border-pink-900/30" };
      case "Friends": 
        return { icon: Users2, label: "Friends Group", color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30" };
      case "Adventure": 
        return { icon: Activity, label: "Adventure / Trekking", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/20 border-orange-100/50 dark:border-orange-900/30" };
      case "Relaxation": 
        return { icon: Coffee, label: "Relaxation / Leisure", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100/50 dark:border-yellow-900/30" };
      case "Business": 
        return { icon: Briefcase, label: "Business Trip", color: "text-teal-650 bg-teal-50 dark:bg-teal-950/20 border-teal-100/50 dark:border-teal-900/30" };
      default: 
        return { icon: User, label: style || "Not Configured", color: "text-slate-400 bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800" };
    }
  };

  if (!user) {
    return <LoadingSpinner text="Loading Profile..." />;
  }

  const username = user.username || "Traveler";

  return (
    <div className="max-w-3xl mx-auto pb-12 transition-colors duration-300">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }} 
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your account information and profile details.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none transition-colors duration-300"
      >
        
        {/* Cover Photo / Background Gradient */}
        <div className="h-44 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 relative">
          <div className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition cursor-pointer">
            <Image size={14} />
            <span>Edit Cover</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 pt-0 relative">
          
          {/* Avatar Positioned Overlapping the Banner */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-16 mb-8">
            <div className="relative group w-32 h-32 self-start sm:self-auto">
              
              {/* Photo Input (Hidden) */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Avatar circle */}
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-black border-4 border-white dark:border-slate-900 shadow-lg">
                  {getInitials(username)}
                </div>
              )}

              {/* Hover edit overlay */}
              <button
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 border-4 border-white dark:border-slate-900 shadow-inner"
              >
                <Camera size={24} />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Edit Photo</span>
              </button>
            </div>

            {/* Profile Info text */}
            <div className="pb-2">
              <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">{username}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">AI Travel Planner User</p>
            </div>
          </div>

          {/* Quick Photo Actions */}
          {profilePhoto && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={handlePhotoClick}
                className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold px-3 py-1.5 rounded-lg transition"
              >
                Change Photo
              </button>
              <button
                onClick={handleRemovePhoto}
                className="text-xs bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold px-3 py-1.5 rounded-lg transition border border-rose-100/50 dark:border-rose-900/20"
              >
                Remove Photo
              </button>
            </div>
          )}

          {/* Profile Details Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 dark:border-slate-800/80 pt-8"
          >
            
            {/* Username Card */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <User size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Username</p>
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mt-1 truncate">{username}</h3>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Mail size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Email Address</p>
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mt-1 truncate">{user.email}</h3>
              </div>
            </motion.div>

            {/* Account Creation Card */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 md:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                <Calendar size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Member Since</p>
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mt-1 truncate">
                  {new Date(user.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
            </motion.div>

          </motion.div>

          {/* Saved Travel Preferences Section */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-8 mt-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Settings className="text-purple-650 dark:text-purple-400" size={22} />
                Saved Travel Preferences
              </h3>
              {preferences && (preferences.preferred_destination_type || preferences.budget_range || preferences.travel_style) && (
                <Link
                  to="/preferences"
                  className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
                >
                  Edit Preferences
                </Link>
              )}
            </div>

            {preferences && (preferences.preferred_destination_type || preferences.budget_range || preferences.travel_style) ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {/* Destination Preference */}
                {preferences.preferred_destination_type && (() => {
                  const details = getDestinationDetails(preferences.preferred_destination_type);
                  const Icon = details.icon;
                  return (
                    <motion.div variants={itemVariants} className={`flex items-center gap-3.5 p-4 rounded-2xl border ${details.color}`}>
                      <div className="shrink-0 p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Destination</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm mt-0.5 block truncate">{details.label}</span>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Budget Preference */}
                {preferences.budget_range && (() => {
                  const details = getBudgetDetails(preferences.budget_range);
                  const Icon = details.icon;
                  return (
                    <motion.div variants={itemVariants} className={`flex items-center gap-3.5 p-4 rounded-2xl border ${details.color}`}>
                      <div className="shrink-0 p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Budget Level</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm mt-0.5 block truncate">{details.label}</span>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Travel Style Preference */}
                {preferences.travel_style && (() => {
                  const details = getTravelStyleDetails(preferences.travel_style);
                  const Icon = details.icon;
                  return (
                    <motion.div variants={itemVariants} className={`flex items-center gap-3.5 p-4 rounded-2xl border ${details.color}`}>
                      <div className="shrink-0 p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/10">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Travel Style</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm mt-0.5 block truncate">{details.label}</span>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                <AlertCircle className="text-slate-400 dark:text-slate-500 mb-2" size={28} />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No preferences saved yet</p>
                <p className="text-xs text-slate-400 mt-1 mb-4 max-w-xs leading-relaxed">Customize your preferences to help the AI plan trips tailored to your exact style.</p>
                <Link
                  to="/preferences"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl transition text-xs active:scale-95"
                >
                  Configure Preferences
                </Link>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center">
            <span className="text-xs text-slate-400 dark:text-slate-550 font-medium">Your data is stored securely.</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-lg shadow-rose-600/10 hover:shadow-xl hover:shadow-rose-600/20 text-sm active:scale-95"
            >
              <LogOut size={16} />
              Logout from Device
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Profile;