import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import HomePage from "./pages/Homepage";
import HospitalPage from "./pages/Hospitals";
import AppointmentForm from "./pages/BookAppointment";
import BedStatusPage from "./pages/BedStatus";
import Signin from "./pages/Signin";

function App() {
  const token = localStorage.getItem("token");
  // console.log(token)
  return (
    <Routes>
      <Route path="/" element={token ? <Services /> : <HomePage />} />
      <Route path="/signin" element={token ? <Services /> : <Signin />} />

      {/* If no token, redirect to SignIn */}
      <Route path="/services" element={token ? <Services /> : <Signin />} />
      <Route
        path="/hospitals"
        element={token ? <HospitalPage /> : <Signin />}
      />
      <Route
        path="/book-appointment"
        element={token ? <AppointmentForm /> : <Signin />}
      />
      <Route
        path="/bed-status"
        element={token ? <BedStatusPage /> : <Signin />}
      />

      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
