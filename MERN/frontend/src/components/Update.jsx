import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [userId, setUserId] = useState(null); // ✅ Added userId state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserId(data.user._id); // ✅ Save userId here
          setUserData({ name: data.user.name, email: data.user.email });
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleUpdate = async () => {
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("An error occurred while updating user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-50 p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 border border-teal-100">
      <h2 className="text-xl font-semibold text-teal-800 mb-6">Edit Profile</h2>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-teal-700">Name</label>
        <input
          type="text"
          className="mt-1 p-2 w-full bg-teal-50 rounded-md border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-teal-700">Email</label>
        <input
          type="email"
          className="mt-1 p-2 w-full bg-teal-50 rounded-md border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
  
      <button
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-all duration-300"
        onClick={handleUpdate}
      >
        Save Changes
      </button>
  
      <button
        className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium py-2 rounded-md transition-all duration-300 mt-3"
        onClick={() => navigate("/profile")}
      >
        Cancel
      </button>
    </div>
  </div>
  
  );
};

export default Update;

