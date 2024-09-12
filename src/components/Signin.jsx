import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./input/Input";
import Logo from "./Logo";
import { useMediaQuery } from "react-responsive";
import photo from "../assets/Anna.png";
import photo2 from "../assets/Anna2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import axios from "axios";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const url = "https://staging.regripindia.com/api/login";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1000px)" });

  const login = async (data) => {
    const formData = new FormData();

    formData.append("contact", data.contact);
    formData.append("password", data.password);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response: ", response);
      if (response) {
        dispatch(setUser(response.data.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:items-center md:justify-center min-h-screen p-4 sm:p-6 md:p-8 h-screen bg-black relative overflow-hidden w-screen">
      {/* Background Image */}
      <img
        src={isSmallScreen ? photo2 : photo}
        alt="Background"
        className="absolute top-0 left-0 w-full h-screen object-cover z-0"
      />

      {/* Form Container */}
      <div
        className="bg-white min-w-[320px] sm:min-w-[400px] max-w-lg p-6 sm:p-8 rounded-2xl font-bold md:py-[120px] md:px-[40px] relative z-10 top-24 md:top-12 lg:top-8 mx-auto md:ml-24"
        style={{
          boxShadow: "20px 0px 50px -20px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div id="top" className="text-center">
          <h1 className="text-black text-[24px]">Sign In</h1>
          <p className="font-normal mt-[0.5px] text-gray-400 text-[14px]">
            Your Regrip Account
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-center text-black mb-4">
          {/* Display API error message */}
          {errors.apiError && (
            <p className="text-red-500 mt-4 text-center text-sm sm:text-base">
              {errors.apiError.message}
            </p>
          )}
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="max-w-md mx-auto p-4 w-full"
        >
          <div className="mb-4">
            <Input
              id="mobile_number"
              type="text"
              placeholder="Enter your mobile number"
              className="form-input mt-1 block w-full rounded-md px-4 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium text-[14px] py-2"
              {...register("contact", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Please enter a valid mobile number",
                },
              })}
            />
            {/* Display mobile number validation error */}
            {errors.mobile_num && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.mobile_num.message}
              </p>
            )}
          </div>

          <div className="mb-1 relative">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="form-input mt-1 block w-full rounded-md px-4 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium text-[14px] py-2 mb-2"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <span className="block absolute right-0 text-green-500 text-[12px] font-semibold mt-2 sm:mt-0">
              Forgot Password?
            </span>
          </div>

          <div className="flex justify-center w-[100%] mt-12">
            <button
              type="submit"
              className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-bold px-6 py-2 rounded-lg mt-2 w-full"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
