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
      password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm your password"),
    }),

    onSubmit: (values, {resetForm}) => {
      console.log("Signup Data:", values);
      resetForm()
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-white w-[360px] rounded-[30px] px-8 py-10 shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
        <p className="text-gray-400 text-sm mt-1">
          Hello there, sign up to continue.
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <InputField
            label="Name"
            name="name"
            placeholder="Enter your full name"
            icon={FaUser}
            required
            formik={formik}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={FaEnvelope}
            required
            formik={formik}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            formik={formik}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            required
            formik={formik}
          />

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90 transition"
          >
            Continue
          </button>
        </form>

        {/* OR */}
        <div className="text-center text-gray-400 text-sm my-4">OR</div>

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

export default SignUp;
