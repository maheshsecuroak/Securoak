import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Li from "../Assests/linkedin.png"
import Google from "../Assests/google.png"
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        workspace: email.split("@")[0],
      });

      if (response.data.status === "success") {
        navigate("/verify-email");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Social login with ${provider}`);
  };

  return (
    <AuthLayout
      title="Start your journey with us"
      subtitle="Create your account"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <img
              src={Google}
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin("linkedin")}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <img
              src={Li}
              alt="Linkedin"
              className="mr-2 h-5 w-5"
            />
            Linkedin
          </button>
        </div>

        <div className="relative">
          <div className="absolute  inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or Signup with Email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Work Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email ID"
              required
              className="mt-1 py-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Create a Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
              className="mt-1 py-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  text-white bg-teal-500 hover:bg-teal-500-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-bg-teal-500"
          >
            Register
          </button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-bg-teal-500 hover:text-primary-dark"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
