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

    onSubmit: (values, {resetForm} ) => {
      console.log("Login Data:", values);
      resetForm()
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 bg-white w-[360px] rounded-[30px] px-8 py-10 shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800">
          {getGreeting()} !
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome to Rara Mart
        </p>

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
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            formik={formik}
          />

          {/* Remember Me & Reset */}
          <div className="flex items-center justify-between text-sm">
            <InputField
              type="checkbox"
              name="rememberMe"
              label="Remember Me"
              formik={formik}
            />

            <span className="text-orange-500 cursor-pointer">
              Reset Password ?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90 transition cursor-pointer"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-600">
            Don’t have account?{" "}
            <span className="text-orange-500 cursor-pointer font-semibold">
              Register?
            </span>
          </p>
        </form>

        {/* OR */}
        <div className="text-center text-gray-400 text-sm my-6">
          OR Login with
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-xl">
          <FaGoogle className="cursor-pointer text-gray-500 hover:text-red-500 transition" />
          <FaFacebookF className="cursor-pointer text-gray-500 hover:text-blue-600 transition" />
          <FaTwitter className="cursor-pointer text-gray-500 hover:text-sky-500 transition" />
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 mt-6 leading-4">
          By continuing you confirm that you agree with our{" "}
          <span className="text-orange-500 cursor-pointer">
            Term & Condition
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
