import { useState } from "react";
import { Eye, EyeOff, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { loginSchema } from "../../validations/authValidation";
import { loginUser } from "../../services/authService";
import { saveToken } from "../../utils/token";
import { useTheme } from "../../context/ThemeContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      saveToken(response.access_token);

      toast.success("Login Successful!");

      // Force header update notification
      window.dispatchEvent(new Event("profile_photo_updated"));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 px-4 text-slate-805 dark:text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="w-16 h-16 rounded-full bg-purple-650 dark:bg-purple-600 flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-purple-500/20">
            <Plane className="text-white" size={28} />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Sign in to continue planning your trips.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-205 text-sm">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-205 text-sm">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-12 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-purple-600 dark:text-purple-400 hover:underline text-xs font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-bold transition shadow-md shadow-purple-500/10 hover:shadow-lg active:scale-98"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm pt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 dark:text-purple-400 hover:underline font-bold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}