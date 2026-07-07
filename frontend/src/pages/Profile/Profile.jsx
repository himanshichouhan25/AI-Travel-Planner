import { useEffect, useState, useRef } from "react";
import { User, Mail, Calendar, LogOut, Camera, Image } from "lucide-react";
import { toast } from "react-toastify";

import { getProfile } from "../../services/authProfileService";
import { logout } from "../../services/logoutService";

import LoadingSpinner from "../../components/common/LoadingSpinner";

const Profile = () => {
  const [user, setUser] = useState(null);
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

    // Limit to 2MB to keep base64 storage in localStorage manageable
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
        
        // Dispatch event to notify Header.jsx
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

  if (!user) {
    return <LoadingSpinner text="Loading Profile..." />;
  }

  const username = user.username || "Traveler";

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-2">Manage your account information and profile details.</p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-100/50">
        
        {/* Cover Photo / Background Gradient */}
        <div className="h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 relative">
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
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-black border-4 border-white shadow-lg">
                  {getInitials(username)}
                </div>
              )}

              {/* Hover edit overlay */}
              <button
                onClick={handlePhotoClick}
                className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300 border-4 border-white shadow-inner"
              >
                <Camera size={24} />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Edit Photo</span>
              </button>
            </div>

            {/* Profile Info text */}
            <div className="pb-2">
              <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">{username}</h2>
              <p className="text-slate-500 text-sm mt-1">AI Travel Planner User</p>
            </div>
          </div>

          {/* Quick Photo Actions */}
          {profilePhoto && (
            <div className="flex gap-2 mb-6">
              <button
                onClick={handlePhotoClick}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1.5 rounded-lg transition"
              >
                Change Photo
              </button>
              <button
                onClick={handleRemovePhoto}
                className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-lg transition border border-rose-100/50"
              >
                Remove Photo
              </button>
            </div>
          )}

          {/* Profile Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
            
            {/* Username Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <User size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Username</p>
                <h3 className="text-base font-bold text-slate-700 mt-1 truncate">{username}</h3>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Mail size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Address</p>
                <h3 className="text-base font-bold text-slate-700 mt-1 truncate">{user.email}</h3>
              </div>
            </div>

            {/* Account Creation Card */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 md:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                <Calendar size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Member Since</p>
                <h3 className="text-base font-bold text-slate-700 mt-1 truncate">
                  {new Date(user.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">Your data is stored securely.</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-lg shadow-rose-600/10 hover:shadow-xl hover:shadow-rose-600/20 text-sm active:scale-95"
            >
              <LogOut size={16} />
              Logout from Device
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;