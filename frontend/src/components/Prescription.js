import React, { useState, useEffect, useCallback, useRef } from "react";

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    drugName: "",
    dosage: 1,
    duration: 1,
    durationUnit: "Week",
    repeat: "Everyday",
    timeOfDay: ["Morning"],
    toBeTaken: "Before Food",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/prescriptions");
      if (!response.ok) {
        throw new Error("Failed to fetch prescriptions");
      }
      const data = await response.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setError("Failed to load prescriptions");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeOfDayChange = (time) => {
    setNewPrescription((prev) => ({
      ...prev,
      timeOfDay: prev.timeOfDay.includes(time)
        ? prev.timeOfDay.filter((t) => t !== time)
        : [...prev.timeOfDay, time],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPrescription),
      });

      if (!response.ok) {
        throw new Error("Failed to add prescription");
      }

      setSuccess("Prescription added successfully!");
      setNewPrescription({
        drugName: "",
        dosage: 1,
        duration: 1,
        durationUnit: "Week",
        repeat: "Everyday",
        timeOfDay: ["Morning"],
        toBeTaken: "Before Food",
      });
      fetchPrescriptions();
    } catch (error) {
      console.error("Error adding prescription:", error);
      setError("Failed to add prescription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepeatChange = (option) => {
    setNewPrescription((prev) => ({ ...prev, repeat: option }));
  };
  const printRef = useRef(null);

  const handlePrint = useCallback(() => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      console.error("Failed to open print window");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Billing Data</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: bold;
            }
            h3 { margin-top: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }, []);

  const incrementDosage = () => {
    setNewPrescription((prev) => ({ ...prev, dosage: prev.dosage + 1 }));
  };

  const decrementDosage = () => {
    setNewPrescription((prev) => ({
      ...prev,
      dosage: Math.max(1, prev.dosage - 1),
    }));
  };

  const incrementDuration = () => {
    setNewPrescription((prev) => ({ ...prev, duration: prev.duration + 1 }));
  };

  const decrementDuration = () => {
    setNewPrescription((prev) => ({
      ...prev,
      duration: Math.max(1, prev.duration - 1),
    }));
  };

  return (
    <div className="p-4 md:p-6 mx-auto max-w-8xl">
      <div className="bg-white rounded-lg shadow-md mb-8 p-5 ">
        <h2 className="text-xl font-semibold mb-4">Prescription</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="drugname" className="block mb-2">
                Select Drug
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="drugName"
                  name="drugName"
                  value={newPrescription.drugName}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-md p-2 pr-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="dosage" className="block mb-2">
                Dosage
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={incrementDosage}
                  className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
                <input
                  type="number"
                  id="dosage"
                  name="dosage"
                  value={newPrescription.dosage}
                  onChange={handleInputChange}
                  min="1"
                  className="border p-2 rounded-md w-20"
                />
                <button
                  type="button"
                  onClick={decrementDosage}
                  className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span>Tablet{newPrescription.dosage !== 1 && "s"}</span>
              </div>
            </div>
            <div>
              <label htmlFor="duration" className="block mb-2">
                Duration
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={incrementDuration}
                  className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={newPrescription.duration}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-20 px-4"
                />
                <button
                  type="button"
                  onClick={decrementDuration}
                  className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <select
                  name="durationUnit"
                  value={newPrescription.durationUnit}
                  onChange={handleInputChange}
                  className="ml-2 block rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <label className="block mb-2">Repeat</label>
              <div className="flex flex-wrap gap-2">
                {["Everyday", "Alternative days", "Specific days"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleRepeatChange(option)}
                      className={`px-4 py-2 rounded-3xl transition-colors ${
                        newPrescription.repeat === option
                          ? "bg-customBlue text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block mb-2">Time of the day</label>
              <div className="flex flex-wrap gap-2">
                {["Morning", "Noon", "Evening", "Night"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeOfDayChange(time)}
                    className={`px-4 py-2 rounded-3xl ${
                      newPrescription.timeOfDay.includes(time)
                        ? "bg-customBlue text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block mb-2">To be Taken</label>
              <div className="flex flex-wrap gap-2">
                {["Before Food", "After Food"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setNewPrescription((prev) => ({
                        ...prev,
                        toBeTaken: option,
                      }))
                    }
                    className={`px-4 py-2 rounded-3xl ${
                      newPrescription.toBeTaken === option
                        ? "bg-customBlue text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Drug"}
            </button>
          </div>
        </form>
      </div>

      <div className="relative bg-white rounded-lg shadow-md mb-8 p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Prescription Table</h2>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            PRINT
          </button>
        </div>

        <div className="overflow-x-auto" ref={printRef}>
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left py-2"></th>
                <th className="text-left py-2">Drug Name</th>
                <th className="text-left py-2">Dosage</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Repeat</th>
                <th className="text-left py-2">Time of the day</th>
                <th className="text-left py-2">To be Taken</th>
                <th className="text-left py-2">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="border-t">
                  <td className="py-4">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  </td>
                  <td className="py-4 text-gray-600">
                    {prescription.drugName}
                  </td>
                  <td className="py-4 text-gray-600">{prescription.dosage}</td>
                  <td className="py-4 text-gray-600">
                    {prescription.duration}
                  </td>
                  <td className="py-4 text-gray-600">{prescription.repeat}</td>
                  <td className="py-4 text-gray-600">
                    {prescription.timeOfDay.join(", ")}
                  </td>
                  <td className="py-4 text-gray-600">
                    {prescription.toBeTaken}
                  </td>
                  <td className="py-4 text-gray-600">{prescription.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Prescription;
