"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSignup = async () => {
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA to proceed.");
      return;
    }

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/auth/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password 
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === true) {
        setSuccessMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage(result.message || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email address</label>
            <input
              type="email"
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
         <div className="mt-3">
            <ReCAPTCHA
              sitekey="6LfHtGwrAAAAADISvsTel7wx8JHAABxlrHrGdhEY"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Create Account Button */}
          <button
            onClick={handleSignup}
            disabled={!captchaToken || isLoading}
            className={`w-full py-2 rounded-md text-white transition-colors mt-3 ${
              captchaToken && !isLoading
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create an account"}
          </button>

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

export default SignupPage;
