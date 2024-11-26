import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NewRegistration from "./components/NewRegistration";
import ExistingCustomer from "./components/ExistingCustomer";
import Appointment from "./components/Appoinment";
import Prescription from "./components/Prescription";
import Billing from "./components/Billing";
import logo from "./components/Assests/logo.png";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 w-full">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img className="h-8 w-auto" src={logo} alt="SecuroAK Logo" />
                <h1 className="text-xl md:text-2xl font-semibold text-teal-500 hidden sm:block">SECUROAK</h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/appointment"
              className="text-customBlue hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Appointment
            </Link>
            <Link
              to="/prescription"
              className="text-customBlue hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Prescription
            </Link>
            <Link
              to="/billing"
              className="text-customBlue hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Billing
            </Link>
            {location.pathname === "/registration" ? (
              <Link
                to="/customer/:id"
                className="bg-customBlue text-white sm:px-4 px-2 py-2 rounded-3xl hover:text-gray-200"
              >
                Existing User
              </Link>
            ) : (
              <Link
                to="/registration"
                className="bg-customBlue text-white sm:px-4 px-2 py-2 rounded-3xl hover:text-gray-200"
              >
                New Registration
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <Navbar />
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
