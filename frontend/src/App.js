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
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavbarColor = () => {
    switch (location.pathname) {
<<<<<<< HEAD
      case "/":
      case "/signup":
      case "/login":
        return "bg-gradient-to-r from-white to-teal-500 text-white";
=======
      case '/':
        return 'bg-gradient-to-r from-white to-teal-500 text-white';
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
      default:
        return "bg-white shadow";
    }
  };

<<<<<<< HEAD
  const getLogoTextColor = () => {
    switch (location.pathname) {
      case "/":
      case "/signup":
      case "/login":
        return "text-teal-500";
      default:
        return "text-teal-500";
    }
  };

=======
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

<<<<<<< HEAD
  const handleLogout = () => {
    navigate("/signup");
  };

=======
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
  return (
    <nav className={`fixed w-full z-50 ${getNavbarColor()}`}>
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
<<<<<<< HEAD
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src={logo} alt="SecuroAK Logo" />
              <h1
                className={`text-xl md:text-2xl font-semibold ml-2 hidden  sm:block ${getLogoTextColor()}`}
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
=======
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src={logo} alt="SecuroAK Logo" />
              <h1 className={`text-xl md:text-2xl font-semibold ml-2  sm:block ${location.pathname === '/' ? 'text-teal-500' : 'text-teal-500'}`}>
                SECUROAK
              </h1>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
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
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
                  />
                )}
              </svg>
            </button>
          </div>
<<<<<<< HEAD
=======

          {/* Desktop Navigation */}
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/appointment"
              className={`hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/" || 
                location.pathname === "/signup" || 
                location.pathname === "/login" ? "hidden" : "text-gray-700"
              }`}
            >
              Appointment
            </Link>
            {location.pathname !== "/" && 
             location.pathname !== "/signup" && 
             location.pathname !== "/login" && (
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
                location.pathname === "/" || 
                location.pathname === "/signup" || 
                location.pathname === "/login" ? "hidden" : "text-gray-700"
              }`}
            >
              Billing
            </Link>
            {location.pathname === "/registration" ? (
              <Link
                to="/customer/:id"
                className={`${
                  location.pathname === "/"
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
                  location.pathname === "/" ||
                  location.pathname === "/signup" ||
                  location.pathname === "/login"
                    ? "bg-white text-teal-500 rounded-lg"
                    : "bg-customBlue text-white"
                } px-6 py-2 rounded-full hover:opacity-90 text-sm font-medium`}
              >
                New Registration
              </Link>
            )}
          </div>
<<<<<<< HEAD
=======

          {/* Mobile Dropdown Menu */}
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                <Link
                  to="/appointment"
<<<<<<< HEAD
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                    location.pathname === "/" || 
                    location.pathname === "/signup" || 
                    location.pathname === "/login" ? "hidden" : ""
                  }`}
=======
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
                  onClick={toggleMobileMenu}
                >
                  Appointment
                </Link>
<<<<<<< HEAD
                {location.pathname !== "/" && 
                 location.pathname !== "/signup" && 
                 location.pathname !== "/login" && (
=======
                {location.pathname !== '/' && (
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
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
<<<<<<< HEAD
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 ${
                    location.pathname === "/" || 
                    location.pathname === "/signup" || 
                    location.pathname === "/login" ? "hidden" : ""
                  }`}
=======
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> e4b878202fd4c17a87046e2cdcedde702320ea42
