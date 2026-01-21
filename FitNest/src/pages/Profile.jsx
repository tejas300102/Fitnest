import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    goals: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const userResponse = await api.get(`/api/users/${userId}`);
      setUser(userResponse.data);

      const profileResponse = await api.get(`/api/profile/${userId}`);
      setProfile(profileResponse.data);
      setFormData(profileResponse.data);
    } catch (err) {
      console.log("Profile not found or error fetching data.");
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const ageNum = Number(formData.age);
    const heightNum = Number(formData.height);
    const weightNum = Number(formData.weight);

    if (ageNum < 10 || ageNum > 100) {
      alert("Age must be between 10 and 100.");
      return;
    }
    if (heightNum < 50 || heightNum > 250) {
      alert("Height must be between 50 cm and 250 cm.");
      return;
    }
    if (weightNum < 20 || weightNum > 300) {
      alert("Weight must be between 20 kg and 300 kg.");
      return;
    }

    try {
      if (profile) {
        await api.put(`/api/profile/${profile.id}`, formData);
      } else {
        await api.post("/api/profile", { ...formData, userId });
      }
      setIsEditing(false);
      fetchData();
    } catch (err) {
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* User Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-indigo-100 to-white border border-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-sm">
              😎
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user ? user.name : "Loading..."}
            </h2>
            <p className="text-gray-500 mb-6">{user ? user.email : "..."}</p>

            <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-800">
                  {user?.phone || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium text-gray-800">
                  {user?.role || "USER"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">
                Physical Stats
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition text-sm"
                >
                  Edit Details
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      min="50"
                      max="250"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      min="20"
                      max="300"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Goals */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Goal</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={formData.goals}
                      onChange={(e) =>
                        setFormData({ ...formData, goals: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-md"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile);
                    }}
                    className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Age</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {profile?.age || "-"}{" "}
                    <span className="text-sm font-normal text-gray-400">yrs</span>
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Gender</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {profile?.gender || "-"}
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Height</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {profile?.height || "-"}{" "}
                    <span className="text-sm font-normal text-gray-400">cm</span>
                  </p>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Weight</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {profile?.weight || "-"}{" "}
                    <span className="text-sm font-normal text-gray-400">kg</span>
                  </p>
                </div>

                <div className="col-span-2 p-5 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">🎯</div>
                  <div>
                    <p className="text-indigo-600 text-xs uppercase tracking-wide font-bold">
                      Current Goal
                    </p>
                    <p className="text-lg font-semibold text-indigo-900">
                      {profile?.goals || "No goal set"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
