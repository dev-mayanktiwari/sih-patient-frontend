import { useState, useEffect } from "react";
import axios from "axios";

export default function BedStatusPage() {
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/search?query="
        );
        setHospitals(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch hospital bed data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading bed status...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
          Hospital Bed Status
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                  {hospital.name}
                </h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Beds:</span>
                  <span className="font-semibold text-blue-600">
                    {hospital.beds.totalBed}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Available Beds:</span>
                  <span className="font-semibold text-green-600">
                    {hospital.beds.availableBed}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{
                        width: `${
                          (hospital.beds.availableBed /
                            hospital.beds.totalBed) *
                          100
                        }%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {(
                    (hospital.beds.availableBed / hospital.beds.totalBed) *
                    100
                  ).toFixed(1)}
                  % beds available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
