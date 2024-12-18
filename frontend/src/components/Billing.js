import React, { useState, useRef, useEffect, useCallback } from "react";

function Billing() {
  const [billingInfo, setBillingInfo] = useState({
    location: "",
    date: "",
    rrid: "",
    name: "",
    dob: "",
    place: "",
    phoneNo: "",
    address: "",
  });

  const [treatments, setTreatments] = useState([
    { id: 1, specification: "Teeth Cleaning", amount: 300 },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/billing");
      if (!response.ok) {
        throw new Error("Failed to fetch billing data");
      }
      const data = await response.json();
      setSubmittedData(data);
    } catch (error) {
      console.error("Error fetching billing data:", error);
      setError("Failed to fetch billing information");
    }
  };

  const resetForm = () => {
    setBillingInfo({
      location: "",
      date: "",
      rrid: "",
      name: "",
      dob: "",
      place: "",
      phoneNo: "",
      address: "",
    });
    setTreatments([{ id: 1, specification: "Teeth Cleaning", amount: 300 }]);
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
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
              font-size: 12px;
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: bold;
            }
            h3 { margin-top: 20px; }
            @media print {
              table { font-size: 10px; }
            }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleTreatmentChange = (id, field, value) => {
    setTreatments((prev) =>
      prev.map((treatment) =>
        treatment.id === id ? { ...treatment, [field]: value } : treatment
      )
    );
  };

  const addTreatment = () => {
    const newId =
      treatments.length > 0 ? Math.max(...treatments.map((t) => t.id)) + 1 : 1;
    setTreatments([...treatments, { id: newId, specification: "", amount: 0 }]);
  };

  const removeTreatment = (id) => {
    if (treatments.length > 1) {
      setTreatments(treatments.filter((treatment) => treatment.id !== id));
    }
  };

  const calculateTotal = () => {
    return treatments.reduce(
      (sum, treatment) => sum + Number(treatment.amount),
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...billingInfo,
          treatments,
          total: calculateTotal(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit billing information");
      }

      fetchSubmittedData();
      resetForm();
      setSuccess("Billing information submitted successfully!");
    } catch (error) {
      console.error("Error submitting billing information:", error);
      setError("Failed to submit billing information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Billing</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={billingInfo.location}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Location</option>
                <option value="Location 1">Location 1</option>
                <option value="Location 2">Location 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={billingInfo.date}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="rrid" className="block mb-2 text-sm font-medium text-gray-700">
                RRID
              </label>
              <input
                type="text"
                id="rrid"
                name="rrid"
                value={billingInfo.rrid}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={billingInfo.name}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={billingInfo.dob}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={billingInfo.place}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={billingInfo.phoneNo}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={billingInfo.address}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Treatments</h3>
            {treatments.map((treatment, index) => (
              <div 
                key={treatment.id} 
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center"
              >
                <div className="flex-grow w-full">
                  <label htmlFor={`specification-${treatment.id}`} className="sr-only">
                    Treatment Specification
                  </label>
                  <input
                    type="text"
                    id={`specification-${treatment.id}`}
                    value={treatment.specification}
                    onChange={(e) =>
                      handleTreatmentChange(
                        treatment.id,
                        "specification",
                        e.target.value
                      )
                    }
                    placeholder="Treatment Specification"
                    className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div className="w-full sm:w-32">
                  <label htmlFor={`amount-${treatment.id}`} className="sr-only">
                    Treatment Amount
                  </label>
                  <input
                    type="number"
                    id={`amount-${treatment.id}`}
                    value={treatment.amount}
                    onChange={(e) =>
                      handleTreatmentChange(
                        treatment.id,
                        "amount",
                        e.target.value
                      )
                    }
                    placeholder="Amount"
                    className="w-full px-3 md:px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeTreatment(treatment.id)}
                    className="text-red-600 hover:text-red-800 sm:ml-4 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <button
                type="button"
                onClick={addTreatment}
                className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Treatment
              </button>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Submitting..." : "Submit Billing"}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Print Data
                </button>
              </div>
            </div>

            <div className="text-right mt-4">
              <strong className="text-lg">Total: ${calculateTotal().toFixed(2)}</strong>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8 overflow-x-auto" ref={printRef}>
        <h3 className="text-lg font-semibold mb-4">Submitted Data</h3>
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="text-gray-500">
              <th className="p-2  text-left">Location</th>
              <th className="p-2  text-left">Date</th>
              <th className="p-2  text-left">RRID</th>
              <th className="p-2  text-left">Name</th>
          <th className="p-2  text-left">DOB</th>
          <th className="p-2  text-left">Place</th>
          <th className="p-2  text-left">Phone No</th>
          <th className="p-2  text-left">Address</th>
          <th className="p-2  text-left">Treatments</th>
          <th className="p-2  text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {submittedData.map((data, index) => (
          <tr key={index}>
            <td className="p-2 ">{data.location}</td>
            <td className="p-2 ">{data.date}</td>
            <td className="p-2 ">{data.rrid}</td>
            <td className="p-2 ">{data.name}</td>
            <td className="p-2 ">{data.dob}</td>
            <td className="p-2 ">{data.place}</td>
            <td className="p-2 ">{data.phoneNo}</td>
            <td className="p-2 ">{data.address}</td>
            <td className="p-2 ">
              {Array.isArray(data.treatments)
                ? data.treatments.map((t) => t.specification).join(", ")
                : data.treatments}
            </td>
            <td className="p-2  text-right">
              ${Number(data.total).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);

}

export default Billing;
