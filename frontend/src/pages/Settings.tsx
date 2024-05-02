import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    navigate("/signup");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center shadow-xl  flex-col p-10 gap-5">
        <input
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password" // Changed to password type for security
          placeholder="Enter Current Password"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          type="password" // Changed to password type for security
          placeholder="Enter New Password"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/resetpassword",
                { password: currentPassword, newPassword },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                setIsCorrect(true);
                alert(response.data.message);
                navigate("/posts");
              } else {
                setIsCorrect(false);
              }
            } catch (error) {
              // Handle network or other errors here
              console.error("Error changing password:", error);
              setIsCorrect(false);
            }
          }}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Change Password
        </button>
        <button
          onClick={() => navigate("/posts")}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Home
        </button>
        {!isCorrect && (
          <div className="text-sm text-red-500 text-center">Wrong Password</div>
        )}
      </div>
    </div>
  );
}
