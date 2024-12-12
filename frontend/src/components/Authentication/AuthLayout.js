import React from "react";
import Logo from "../Assests/Logo2.png";
// import img from "../Assests/Landing Page.png"

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-8xl h-[800px] bg-white rounded-2xl shadow-lg overflow-hidden flex">
        <div className="flex-1 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-teal-500 p-10 flex flex-col justify-between">
            <h1 className="text-4xl font-bold text-white leading-tight mb-8">
              Harnessing dental care for a better tomorrow
            </h1>
            {/* <img src={img} alt="dental " /> */}
            <div className="flex gap-5"></div>
          </div>
        </div>
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <img src={Logo} alt="Logo" className="mx-auto mb-4 md:mb-8" />

              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
