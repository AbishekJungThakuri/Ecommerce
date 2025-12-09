import { getIn } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  icon: Icon,
  formik,
}) => {
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const baseInputClasses = `w-full outline-none text-sm `;

  let inputElement;
  switch (type) {
    case "textarea":
      inputElement = (
        <textarea
          id={name}
          placeholder={placeholder}
          className={baseInputClasses}
          {...formik.getFieldProps(name)}
        />
      );
      break;

    case "checkbox":
      inputElement = (
        <input
          id={name}
          type="checkbox"
          checked={!!value}
          {...formik.getFieldProps(name)}
          className="accent-orange-500 w-4 h-4"
        />
      );
      break;

    default:
      inputElement = (
        <input
          id={name}
          type={isPasswordType && showPassword ? "text" : type}
          placeholder={placeholder}
          className={baseInputClasses}
          {...formik.getFieldProps(name)}
        />
      );
  }

  return (
    <div>
      {label && type !== "checkbox" && (
        <label htmlFor={name} className="text-sm text-gray-400">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type !== "checkbox" ? (
        <div
          className={`flex items-center border rounded-full px-4 py-2 mt-1 
          ${touched && error ? "border-red-500" : "border-gray-300"}`}
        >
          {inputElement}

          {isPasswordType ? (
            showPassword ? (
              <FaEye
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEyeSlash
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )
          ) : (

            Icon && <Icon className="text-gray-400" />
          )}
        </div>
      ) : (
        <label className="flex items-center gap-2 text-sm text-gray-600 mt-3 cursor-pointer">
          {inputElement}
          {label}
        </label>
      )}

      {touched && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
