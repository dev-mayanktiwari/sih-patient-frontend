import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import HomePage from "./pages/Homepage";
import HospitalPage from "./pages/Hospitals";
import AppointmentForm from "./pages/BookAppointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/hospitals" element={<HospitalPage />} />
      <Route path="/book-appointment" element={<AppointmentForm />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
