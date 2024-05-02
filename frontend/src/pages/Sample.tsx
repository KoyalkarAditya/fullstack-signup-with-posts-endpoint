import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../index.css";
export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: null,
    terms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmPassword", formData.confirmPassword);
    formDataToSend.append("terms", formData.terms.toString());
    if (formData.profile) {
      formDataToSend.append("profile", formData.profile);
    }

    try {
      if (!formData.terms) {
        setErrorMessage("Please Accept Terms and Conditions to Signup");
        return;
      } else {
        const response = await axios.post("http://localhost/api/v1/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile: formData.profile,
        });
        if (response.status == 200) {
          alert("Signup Successful!!");
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/posts");
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error during inputs submission", error);
      setErrorMessage("Error");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue;
    if (name === "profile") {
      newValue = e.target.files ? e.target.files[0] : null;
    } else {
      newValue = value;
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, terms: !formData.terms });
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="profile"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profile"
            name="profile"
            className="mt-1 block w-full border border-gray-300 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="mr-2"
            checked={formData.terms}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms" className="text-sm font-medium text-gray-700">
            I accept the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={async () => {}}
        >
          Signup
        </button>
        {errorMessage && (
          <div className="mt-4 text-red-600">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};