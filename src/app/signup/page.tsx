
"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#fef2f2] flex items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center h-[90vh] space-y-6">
          {/* Cards: 2-2-1 Layout */}
          <div className="grid grid-cols-2 gap-4 w-[280px] sm:w-[550px]">
            {/* Row 1 */}
            <div className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-sky-300 rounded-md" />
              <div>
                <p className="font-semibold text-sm">Diagnostic Centres</p>
                <p className="text-xs text-gray-500">Manage diagnostic centres</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-sky-300 rounded-md" />
              <div>
                <p className="font-semibold text-sm">Hospital Beds</p>
                <p className="text-xs text-gray-500">Manage beds availability</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-sky-300 rounded-md" />
              <div>
                <p className="font-semibold text-sm">Ambulances</p>
                <p className="text-xs text-gray-500">Manage ambulance availability</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white shadow-md rounded-xl space-x-4 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-sky-300 rounded-md" />
              <div>
                <p className="font-semibold text-sm">Bookings</p>
                <p className="text-xs text-gray-500">Review Booking Lists & Payments</p>
              </div>
            </div>

            {/* Row 3: Centered */}
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
      <div className="md:w-1/2 w-full flex justify-center items-center p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="w-full max-w-sm space-y-3">
          <h2 className="text-2xl font-semibold">Create an account</h2>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-black hover:underline">
              Log in
            </a>
          </p>

          {/* user name */}
          <div>
            <label className="text-sm font-medium">User name</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter user name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
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
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
          </div>
          {/* Terms */}
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-black hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-black hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Google reCAPTCHA */}
          <div>
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
            />
          </div>
          {/* Login Button */}
          <Link href="/">
  <button
    className="w-full py-2 rounded-md text-white transition-colors bg-gray-400 hover:bg-black mt-3"
  >
    Create an accrount
  </button>
</Link>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-black hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
