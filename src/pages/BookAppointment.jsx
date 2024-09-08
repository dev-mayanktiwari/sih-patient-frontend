import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000/api/v1";

export default function AppointmentForm() {
  const [hospitals, setHospitals] = useState([]);
  const [title, setTitle] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    // Fetch hospitals from the server
    axios
      .get(`${BACKEND_URL}/hospital/search?query=`)
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      // Fetch departments for the selected hospital
      axios
        .get(`${BACKEND_URL}/hospital/departments/${selectedHospital}`)
        .then((response) => setDepartments(response.data))
        .catch((error) => console.error("Error fetching departments:", error));
    }
  }, [selectedHospital]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 15; i++) {
      slots.push(`${i.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  const generateDateOptions = () => {
    const options = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      options.push(date.toISOString().split("T")[0]);
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      const timeFormatted = new Date(
        `${selectedDate}T${selectedTime}:00.000Z`
      ).toISOString();

      const response = await axios.post(
        `${BACKEND_URL}/patient/book-appointment`,
        {
          hospitalId: parseInt(selectedHospital),
          departmentId: parseInt(selectedDepartment),
          title: title || `Appointment ${Math.floor(Math.random() * 100)}`, // Dynamic title generation
          time: new Date(`${selectedDate}T${selectedTime}:00Z`).toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const appointment = response.data.appointment;
      setAppointmentDetails({
        appointmentId: appointment.id,
        patientName: "John Doe", // Should be fetched dynamically
        hospital: hospitals.find((h) => h.id === parseInt(selectedHospital))
          .name,
        department: departments.find(
          (d) => d.id === parseInt(selectedDepartment)
        ).name,
        doctor: departments.find((d) => d.id === parseInt(selectedDepartment))
          .head,
        date: selectedDate,
        time: selectedTime,
        queuePosition: appointment.queuePosition,
        status: appointment.status,
        amount: "$50.00", // Should be fetched dynamically
      });
      setShowReceipt(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
          Book an Appointment
        </h1>
        {!showReceipt ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="hospital"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Hospital
              </label>
              <select
                id="hospital"
                value={selectedHospital}
                onChange={(e) => {
                  setSelectedHospital(e.target.value);
                  setSelectedDepartment("");
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                disabled={!selectedHospital}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter appointment title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Date
              </label>
              <select
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={!selectedDepartment}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a date</option>
                {generateDateOptions().map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Time
              </label>
              <select
                id="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={!selectedDate}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a time</option>
                {generateTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Book Appointment
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Appointment Booked Successfully!
            </h2>
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Appointment Receipt
              </h3>
              <p>
                <strong>Appointment ID:</strong>{" "}
                {appointmentDetails.appointmentId}
              </p>
              <p>
                <strong>Patient Name:</strong> {appointmentDetails.patientName}
              </p>
              <p>
                <strong>Hospital:</strong> {appointmentDetails.hospital}
              </p>
              <p>
                <strong>Department:</strong> {appointmentDetails.department}
              </p>
              <p>
                <strong>Doctor:</strong> {appointmentDetails.doctor}
              </p>
              <p>
                <strong>Date:</strong> {appointmentDetails.date}
              </p>
              <p>
                <strong>Time:</strong> {appointmentDetails.time}
              </p>
              <p>
                <strong>Queue Position:</strong>{" "}
                {appointmentDetails.queuePosition}
              </p>
              <p>
                <strong>Status:</strong> {appointmentDetails.status}
              </p>
              <p>
                <strong>Amount Paid:</strong> {appointmentDetails.amount}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Please arrive 15 minutes before your appointment time. Bring this
              receipt with you for verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
