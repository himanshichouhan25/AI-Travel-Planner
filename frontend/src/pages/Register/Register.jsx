import { useState } from "react";
import { Eye, EyeOff, Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { registerSchema } from "../../validations/authValidation";
import { registerUser } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 400) {
        toast.error("User already exists.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 px-4 py-10 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-purple-500/20">
            <Plane className="text-white" size={28} />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
          Create Account
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Join AI Travel Planner and start exploring.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-205 text-sm">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition"
            />

            {errors.username && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

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
                placeholder="Enter password"
                {...register("password")}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-12 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200"
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium text-slate-700 dark:text-slate-205 text-sm">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword")}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-12 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-bold transition shadow-md shadow-purple-500/10 hover:shadow-lg active:scale-98"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm pt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 dark:text-purple-400 hover:underline font-bold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}