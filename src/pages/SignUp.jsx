import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import InputField from "../components/InputField";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "At least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("Signup Data:", values);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Card */}
      <div className="relative z-10 bg-[#1a1a1a] w-[360px] rounded-3xl px-8 py-10 shadow-2xl border border-[#e11f2c]/40">
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
        <p className="text-gray-300 text-sm mt-1">Hello there, sign up to continue.</p>

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your full name"
            icon={FaUser}
            required
            formik={formik}
            inputClassName="bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:border-[#e11f2c] focus:ring-1 focus:ring-[#e11f2c] rounded-xl px-4 py-2"
          />

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

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            formik={formik}
            inputClassName="bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:border-[#e11f2c] focus:ring-1 focus:ring-[#e11f2c] rounded-xl px-4 py-2"
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            required
            formik={formik}
            inputClassName="bg-[#1a1a1a] text-white placeholder-gray-400 border border-gray-700 focus:border-[#e11f2c] focus:ring-1 focus:ring-[#e11f2c] rounded-xl px-4 py-2"
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full text-white font-semibold bg-[#e11f2c] hover:opacity-90 transition-all"
          >
            Continue
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4 text-gray-400 text-sm">
          <hr className="flex-1 border-gray-700" />
          <span className="mx-3 text-gray-400">OR</span>
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
          By continuing you confirm that you agree with our{" "}
          <span className="text-[#e11f2c] cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
