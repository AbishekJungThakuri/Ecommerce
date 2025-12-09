import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaEnvelope,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import InputField from "../components/InputField";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("Login Data:", values);
      resetForm();
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-[#1a1a1a] w-[360px] rounded-3xl px-8 py-10 shadow-2xl border border-[#e11f2c]/40">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white">{getGreeting()}!</h1>
        <p className="text-gray-300 text-sm mt-1">Welcome to Rara Mart</p>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={FaEnvelope}
            required
            formik={formik}
            inputClassName="bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:border-[#e11f2c] focus:ring-1 focus:ring-[#e11f2c] rounded-xl px-4 py-2"
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            formik={formik}
            inputClassName="bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:border-[#e11f2c] focus:ring-1 focus:ring-[#e11f2c] rounded-xl px-4 py-2"
          />

          {/* Remember Me & Reset */}
          <div className="flex items-center justify-between text-sm">
            <InputField
              type="checkbox"
              name="rememberMe"
              label="Remember Me"
              formik={formik}
              labelClassName="text-gray-300"
            />

            <span className="text-[#e11f2c] cursor-pointer hover:underline transition">
              Reset Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold bg-[#e11f2c] hover:opacity-90 transition-all"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <span className="text-[#e11f2c] cursor-pointer font-semibold hover:underline">
              Register
            </span>
          </p>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6 text-gray-500 text-sm">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-3 text-gray-400">OR Login with</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-xl">
          <FaGoogle className="cursor-pointer text-gray-400 hover:text-[#e11f2c] transition-all transform hover:scale-110" />
          <FaFacebookF className="cursor-pointer text-gray-400 hover:text-[#1877f2] transition-all transform hover:scale-110" />
          <FaTwitter className="cursor-pointer text-gray-400 hover:text-[#1da1f2] transition-all transform hover:scale-110" />
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-6 leading-4">
          By continuing, you confirm that you agree with our{" "}
          <span className="text-[#e11f2c] cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
