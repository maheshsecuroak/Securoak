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

  const getNavbarColor = () => {
    switch (location.pathname) {
      case '/':
        return 'bg-gradient-to-r from-white to-teal-500  text-white';
      default:
        return 'bg-white shadow';
    }
  };

  return (
    <nav className={`fixed w-full z-50 ${getNavbarColor()}`}>
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img className="h-8 w-auto" src={logo} alt="SecuroAK Logo" />
                <h1 className={`text-xl md:text-2xl font-semibold ml-2 hidden sm:block ${location.pathname === '/' ? 'text-teal-500' : 'text-teal-500'}`}>
                  {location.pathname === '/' ? 'SECUROAK' : 'SECUROAK'}
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/appointment"
              className={`hover:opacity-80 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Appointment
            </Link>
            {location.pathname !== '/' && (
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
                location.pathname === '/' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Billing
            </Link>
            {location.pathname === "/registration" ? (
              <Link
                to="/customer/:id"
                className={`${
                  location.pathname === '/' 
                    ? 'bg-white text-teal-500' 
                    : 'bg-teal-500 text-white'
                } px-6 py-2 rounded-full hover:opacity-90 text-sm font-medium`}
              >
                Existing User
              </Link>
            ) : (
              <Link
                to="/registration"
                className={`${
                  location.pathname === '/' 
                    ? 'bg-white text-teal-500 rounded-lg' 
                    : 'bg-customBlue text-white'
                } px-6 py-2 rounded-full hover:opacity-90 text-sm font-medium`}
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
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-6">
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

