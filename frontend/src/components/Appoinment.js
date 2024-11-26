import React, { useState, useEffect } from "react";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    fullName: "",
    phoneNo: "",
    date: "",
    time: "",
    treatment: "",
    doctor: "",
    rrid: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [date, setDate] = useState("21/11/2023");

  const reformateDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const formatedDate = reformateDate(e.target.value);
    setDate(formatedDate);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments");
    }
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      setSuccess("Appointment booked successfully!");
      setNewAppointment({
        fullName: "",
        phoneNo: "",
        date: "",
        time: "",
        treatment: "",
        doctor: "",
        rrid: "", // Reset the 'rrid' field
      });
      fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError("Failed to book appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-3 md:p-6 max-w-[1400px]">
      {/* New Appointment Form */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b p-3 md:p-4">
          <h2 className="text-lg md:text-xl font-semibold">New Appointment</h2>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mx-3 md:mx-6 my-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mx-3 md:mx-6 my-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="p-3 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={newAppointment.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium mb-2"
                >
                  Phone No
                </label>
                <input
                  type="tel"
                  id="phoneNo"
                  name="phoneNo"
                  value={newAppointment.phoneNo}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleDateChange(e);
                  }}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium mb-2"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="treatment"
                  className="block text-sm font-medium mb-2"
                >
                  Select Treatment
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  value={newAppointment.treatment}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Cavity Filling">Cavity Filling</option>
                  <option value="Root Canal">Root Canal</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="doctor"
                  className="block text-sm font-medium mb-2"
                >
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={newAppointment.doctor}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Dr.</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                  <option value="Dr. Williams">Dr. Williams</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="rrid"
                  className="block text-sm font-medium mb-2"
                >
                  RRID
                </label>
                <input
                  type="text"
                  id="rrid"
                  name="rrid"
                  value={newAppointment.rrid}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4 mt-6">
              <button className="px-4 md:px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Booking..." : "Book"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Appointment List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b p-3 md:p-4">
          <h2 className="text-lg md:text-xl font-semibold">Appointment List</h2>
        </div>
        <div className="p-3 md:p-6">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        S.NO
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Date
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Patient Name
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Phone No
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Doctor
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Treatment
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        RRID
                      </th>
                      <th className="p-3 md:p-4 text-xs md:text-sm text-left text-gray-500 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="p-3 md:p-4 text-xs md:text-sm text-blue-600">
                          {index + 1}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm">
                          {appointment.date}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm">
                          {appointment.patientName}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm">
                          {appointment.phoneNo}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm">
                          {appointment.doctor}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm">
                          {appointment.treatment}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm text-blue-600">
                          {appointment.rrid}
                        </td>
                        <td className="p-3 md:p-4 text-xs md:text-sm text-green-600">
                          {appointment.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
