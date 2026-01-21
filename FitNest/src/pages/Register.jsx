import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -------------------------------
  // PHONE VALIDATION (min 10 / max 15)
  // -------------------------------
  const handlePhoneChange = (e) => {
    let val = e.target.value;

    // allow only digits and "+", sanitize input
    val = val.replace(/[^0-9+]/g, "");

    // Keep + only at the first position
    if (val.includes("+")) {
      val = "+" + val.replace(/\+/g, "").replace(/[^0-9]/g, "");
    }

    // Max 15 characters
    if (val.length <= 15) {
      setFormData({ ...formData, phone: val });
    }
  };

  // -------------------------------
  // SUBMIT HANDLER
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, password, confirmPassword } = formData;

    // Validation
    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // PHONE LENGTH VALIDATION
    if (phone.length < 10 || phone.length > 15) {
      setError("Phone number must be between 10 and 15 characters.");
      return;
    }

    try {
      const response = await api.post("/api/users/register", formData);


      if (response.data) {
        setSuccess("Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data || "Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Create Account</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              required
              maxLength={15}
              className="w-full border rounded-lg px-3 py-2"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <p className="text-xs text-gray-500">10 to 15 characters allowed.</p>
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full border rounded-lg px-3 py-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="absolute right-3 bottom-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="block font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full border rounded-lg px-3 py-2"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <span
              className="absolute right-3 bottom-2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Register
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
