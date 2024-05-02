import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null as File | null,
    terms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
    }

    try {
      if (!formData.terms) {
        setErrorMessage("Please Accept Terms and Conditions to Signup");
        return;
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/signup",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          alert("Signup Successful!!");
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/posts");
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error during inputs submission", error);
      setErrorMessage("Error during Signup / Invalid Inputs");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target;
    if (name === "profilePic" && files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, terms: !formData.terms });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="profile"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture:
          </label>
          <input
            type="file"
            id="profile"
            name="profilePic"
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
