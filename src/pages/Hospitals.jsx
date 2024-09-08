import axios from "axios";
import React, { useState, useEffect } from "react";
import BACKEND_URL from "../../baseUrl";

// Single image for all hospitals
const hospitalImage =
  "https://media.istockphoto.com/id/1344779917/vector/medical-center-hospital-building-vector-design.jpg?s=1024x1024&w=is&k=20&c=ojXy3pSmAc3wR8hMkyybmjwQzYYxaAJkCphfYyrCt_0=";

export default function HospitalPage() {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/hospital/search?query=${searchTerm}`
        );

        // Update with actual API response
        setHospitals(response.data);
        setFilteredHospitals(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch hospitals. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, [searchTerm]);

  useEffect(() => {
    const results = hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.departments.some((dept) =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredHospitals(results);
  }, [searchTerm, hospitals]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading hospitals...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
          Our Hospitals
        </h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search hospitals by name, location, or department"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {filteredHospitals.length === 0 ? (
          <p className="text-center text-gray-600">
            No hospitals found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <img
                  src={hospitalImage}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                    {hospital.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong className="text-blue-600">Email:</strong>{" "}
                    {hospital.email}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong className="text-blue-600">Location:</strong>{" "}
                    {hospital.location}
                  </p>
                  <h3 className="font-semibold text-blue-600 mb-2">
                    Departments:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {hospital.departments.map((dept) => (
                      <li key={dept.id}>{dept.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
