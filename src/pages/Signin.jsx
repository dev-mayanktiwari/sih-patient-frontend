import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signin, loading, error, success } = useSignin();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would typically send the data to your backend
    //console.log("Form submitted:", formData);
    await signin(formData);
    if (success) {
      navigate("/services");
    }
    // console.log(res);
    // Reset form after submission
    setFormData({ name: "", email: "", password: "", age: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Welcome to Hospital LMS
          </h1>
          <p className="text-xl text-gray-600">
            Empowering healthcare professionals with knowledge
          </p>
        </header>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              User Signin
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>{error && <p className="text-red-500"> error </p>}</div>
              <div>
                {success && (
                  <p className="text-green-500"> Signup successful!! </p>
                )}
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Signin
              </button>
            </form>
          </div>
          <p className="text-center mb-4">
            {`Don't have an account?`}{" "}
            <Link to={"/"} className="text-blue-400 underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
