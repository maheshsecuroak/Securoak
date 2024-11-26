import React, { useState, useEffect } from "react";

function NewRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    phone: "",
    rrid: "",
    address: "",
    drName: "",
    location: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      setFormData({
        ...formData,
        [name]: value,
        age: calculateAge(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age.toString();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const payload = {
        patient: {
          name: formData.name,
          dob: formData.dob,
          age: parseInt(formData.age),
          phone: formData.phone,
          rrid: formData.rrid,
          address: formData.address,
          drName: formData.drName,
          location: formData.location,
          image: formData.image,
        },
      };

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();
      setMessage(result || "Registration successful!");

      setFormData({
        name: "",
        dob: "",
        age: "",
        phone: "",
        rrid: "",
        address: "",
        drName: "",
        location: "",
      });
      setImage(null);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto p-4 md:p-6 space-y-6 md:space-y-8 max-w-7xl">
        {/* Registration Form */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 md:mb-6">
            New Registration
          </h2>

          {message && (
            <div
              className={`p-4 mb-4 rounded-md ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Image Upload Section */}
              <div className="col-span-1">
                <div className="bg-gray-100 h-[150px] w-[150px] mx-auto md:mx-0 aspect-square rounded-lg flex items-center justify-center mb-2">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="max-w-full h-auto"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>
                {!image && (
                  <div className="flex justify-center md:justify-start">
                    <label
                      htmlFor="image"
                      className="w-[150px] px-6 py-2 bg-gray-500 text-white rounded cursor-pointer "
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      id="image"
                    />
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dob" className="block text-sm mb-1">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        readOnly
                        className="w-full p-2 border rounded bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="rrid" className="block text-sm mb-1">
                      RRID
                    </label>
                    <input
                      type="text"
                      id="rrid"
                      name="rrid"
                      value={formData.rrid}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="drName" className="block text-sm mb-1">
                      Dr.Name
                    </label>
                    <input
                      type="text"
                      id="drName"
                      name="drName"
                      value={formData.drName}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 md:mb-6">Patient List</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="w-8 pb-4"></th>
                  <th className="pb-4">RRID</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Patient Name</th>
                  <th className="pb-4">Doctor</th>
                  <th className="pb-4">Treatment</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((item) => (
                  <tr key={item} className="border-t">
                    <td className="py-4">
                      <input type="radio" className="w-4 h-4" />
                    </td>
                    <td className="py-4 text-gray-500">#P-00014</td>
                    <td className="py-4 text-gray-500">02 Sep 2021, 04:45PM</td>
                    <td className="py-4 text-gray-500">Alexia kev</td>
                    <td className="py-4 text-gray-500">Dr. Abraham Pigeon</td>
                    <td className="py-4 text-gray-500">Teeth Cleaning</td>
                    <td className="py-4 text-gray-500">New Patient</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewRegistration;
