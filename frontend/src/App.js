import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NewRegistration from "./components/NewRegistration";
import ExistingCustomer from "./components/ExistingCustomer";
import Appointment from "./components/Appoinment";
import Prescription from "./components/Prescription";
import Billing from "./components/Billing";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import logo from "./components/Assests/logo.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavbarColor = () => {
    switch (location.pathname) {
      case "/landing":
      case "/signup":
      case "/":
        return "bg-gradient-to-r from-white to-teal-500 text-white";
      default:
        return "bg-white shadow";
    }
  };

  const getLogoTextColor = () => {
    switch (location.pathname) {
      case "/landing":
      case "/signup":
      case "/":
        return "text-teal-500";
      default:
        return "text-teal-500";
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    navigate("/signup");
  };

  return (
    <nav className={`fixed w-full z-50 ${getNavbarColor()}`}>
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/landing" className="flex items-center">
              <img className="h-8 w-auto" src={logo} alt="SecuroAK Logo" />
              <h1
                className={`text-xl md:text-2xl font-semibold ml-2 hiddenZ  sm:block ${getLogoTextColor()}`}
              >
                SECUROAK
              </h1>
              <button className="block mx-1 px-3 py-1 rounded-3xl text-base font-medium bg-teal-500 text-white hover:opacity-90">
                home
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex px-3 py-1 rounded-3xl text-base font-medium bg-red-500 text-white hover:opacity-90"
            >
              Logout
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-teal-500 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/appointment"
              className={`hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/landing" ||
                location.pathname === "/signup" ||
                location.pathname === "/"
                  ? "hidden"
                  : "text-gray-700"
              }`}
            >
              Appointment
            </Link>
            {location.pathname !== "/landing" &&
              location.pathname !== "/signup" &&
              location.pathname !== "/" && (
                <Link
                  to="/prescription"
                  className="text-gray-700 hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Prescription
                </Link>
              )}
            <Link
              to="/billing"
              className={`hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/landing" ||
                location.pathname === "/signup" ||
                location.pathname === "/"
                  ? "hidden"
                  : "text-gray-700"
              }`}
            >
              Billing
            </Link>
            {location.pathname === "/registration" ? (
              <Link
                to="/customer/:id"
                className={`${
                  location.pathname === "/landing"
                    ? "bg-white text-teal-500"
                    : "bg-teal-500 text-white"
                } px-6 py-2 rounded-full hover:opacity-90 text-sm font-medium`}
              >
                Existing User
              </Link>
            ) : (
              <Link
                to="/registration"
                className={`${
                  location.pathname === "/landing" ||
                  location.pathname === "/signup" ||
                  location.pathname === "/"
                    ? "bg-white text-teal-500 rounded-lg"
                    : "bg-customBlue text-white"
                } px-6 py-2 rounded-full hover:opacity-90 text-sm font-medium`}
              >
                New Registration
              </Link>
            )}
          </div>
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                <Link
                  to="/appointment"
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                    location.pathname === "/landing" ||
                    location.pathname === "/signup" ||
                    location.pathname === "/"
                      ? "hidden"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Appointment
                </Link>
                {location.pathname !== "/landing" &&
                  location.pathname !== "/signup" &&
                  location.pathname !== "/" && (
                    <Link
                      to="/prescription"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={toggleMobileMenu}
                    >
                      Prescription
                    </Link>
                  )}
                <Link
                  to="/billing"
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                    location.pathname === "/landing" ||
                    location.pathname === "/signup" ||
                    location.pathname === "/"
                      ? "hidden"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Billing
                </Link>
                {location.pathname === "/registration" ? (
                  <Link
                    to="/customer/:id"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-teal-500 text-white hover:opacity-90"
                    onClick={toggleMobileMenu}
                  >
                    Existing User
                  </Link>
                ) : (
                  <Link
                    to="/registration"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-customBlue text-white hover:opacity-90"
                    onClick={toggleMobileMenu}
                  >
                    New Registration
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-6">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<NewRegistration />} />
            <Route path="/customer/:id" element={<ExistingCustomer />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
