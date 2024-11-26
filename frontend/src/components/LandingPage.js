import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "./Assests/Landing Page.png";
import Logo from "./Assests/logo.png";

function LandingPage() {
  const [rrid, setRrid] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (!rrid && !mobileNumber && !name) {
        throw new Error("At least one search parameter is required");
      }

      if (mobileNumber && !/^\d{10}$/.test(mobileNumber)) {
        throw new Error("Invalid mobile number format");
      }

      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rrid: rrid?.trim(),
          mobileNumber: mobileNumber?.trim(),
          name: name?.trim(),
        }),
      });

      if (response.status === 404) {
        setError("No matching records found");
        return;
      }

      if (response.status === 401) {
        setError("Authentication required");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      if (!data || typeof data.found === "undefined") {
        throw new Error("Invalid response format");
      }

      if (data.found && data.id) {
        navigate(`/customer/${data.id}`);
      } else {
        setError("No matching records found");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        setError("Request was cancelled");
      } else if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        setError("Network error. Please check your connection.");
      } else {
        setError(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row">
        {/* Left header (white background) */}
        <div className="w-full md:w-1/2 bg-white p-4">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="logo" className="w-6 md:w-8 h-6 md:h-8 text-teal-500" />
            <h1 className="text-xl md:text-2xl font-semibold text-teal-500">SECUROAK</h1>
          </div>
        </div>

        {/* Right header (teal background) */}
        <div className="w-full md:w-1/2 bg-teal-500 p-4">
          <div className="flex flex-wrap justify-center md:justify-end items-center space-x-2 md:space-x-6">
            <button className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base text-white hover:bg-teal-600 rounded-md transition-colors">
              Appointment
            </button>
            <button className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base text-white hover:bg-teal-600 rounded-md transition-colors">
              Billing
            </button>
            <button className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base bg-white text-teal-600 hover:bg-gray-100 rounded-md transition-colors">
              New Registration
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Side - White Background with Image */}
        <div className="w-full md:w-1/2 bg-white p-4 md:p-12 flex items-center justify-center">
          <div className="relative w-full max-w-[600px] h-[300px] md:h-[400px] tooth-shape">
            <img
              src={img}
              alt="Dental Care"
              className="w-full h-full md:h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right Side - Teal Background with Search Form */}
        <div className="w-full md:w-1/2 bg-teal-500 p-4 md:p-12 flex items-center">
          <div className="space-y-4 md:space-y-8 w-full max-w-md mx-auto md:ml-20">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="rrid" className="block text-white mb-2">
                  RRID
                </label>
                <input
                  type="text"
                  id="rrid"
                  value={rrid}
                  onChange={(e) => setRrid(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-white mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-3 md:px-4 py-2 my-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm md:text-base"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;