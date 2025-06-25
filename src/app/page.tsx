"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validEmails = ["user", "shareef@getbeds.in"];
  const validPasswords = ["password", "1234567"];

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleLogin = () => {
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA to proceed.");
      return;
    }
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (
      validEmails.includes(trimmedEmail) &&
      validPasswords.includes(trimmedPassword)
    ) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid user ID or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#fef2f2] flex items-center justify-center p-6">
        {/* Content left panel (same as original) */}
        <div className="flex flex-col items-center justify-center h-[90vh] space-y-6">
          {/* Role Cards */}
          <div className="grid grid-cols-2 gap-4 w-[280px] sm:w-[550px]">
            {[
              ["Diagnostic Centres", "Manage diagnostic centres"],
              ["Hospital Beds", "Manage beds availability"],
              ["Ambulances", "Manage ambulance availability"],
              ["Bookings", "Review Booking Lists & Payments"],
            ].map(([title, desc], index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 bg-sky-300 rounded-md" />
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}

            <div className="col-span-2 flex justify-center">
              <div className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 w-full max-w-[260px] cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 bg-sky-300 rounded-md" />
                <div>
                  <p className="font-semibold text-sm">Real Time Analytics</p>
                  <p className="text-xs text-gray-500">View real time data & analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="md:w-1/2 w-full flex justify-center items-center p-8 bg-gradient-to-br from-white to-gray-50">
        <div className="w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-sm text-gray-500">
            New to this account?{" "}
            <a href="/signup" className="text-black hover:underline">
              Sign in
            </a>
          </p>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>

          {/* reCAPTCHA */}
          <div className="mt-3">
            <ReCAPTCHA
              sitekey="6LfHtGwrAAAAADISvsTel7wx8JHAABxlrHrGdhEY"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!captchaToken}
            className={`w-full py-2 rounded-md text-white transition-colors mt-3 ${
              captchaToken
                ? "bg-gray-400 hover:bg-black"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            New to an account?{" "}
            <a href="/signup" className="text-black hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
