import { useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../baseUrl";

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signin = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${BACKEND_URL}/patient/signin`, {
        email,
        password,
      });

      // Handle the response, assuming you get a token back
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      setSuccess(true); // Sign-in successful
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    signin,
    loading,
    error,
    success,
  };
};
