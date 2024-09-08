import { useState } from "react";
import BACKEND_URL from "../../baseUrl.js";
import axios from "axios";

// Custom hook for handling signup
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to handle signup
  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // API call using Axios
      const response = await axios.post(
        `${BACKEND_URL}/patient/register`,
        userData
      );

      if (response.status !== 200) {
        throw new Error("Signup failed");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};

export default useSignup;
