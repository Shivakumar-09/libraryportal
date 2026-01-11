import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth(); // ✅ use AuthContext for immediate updates
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/admin/login", formData);

      if (response.data.success) {
        loginAdmin(); // ✅ Update context immediately
        navigate("/admin/dashboard"); // Navigate to dashboard
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-premium">
      <div className="auth-card-glass">
        <div className="auth-header-premium">
          <h1>🔐 Admin Portal</h1>
          <p>Secure access for library administrators</p>
        </div>

        {error && <div className="error-message-glass">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group-floating">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="username"
              name="username"
              className="input-floating"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username"
            />
          </div>

          <div className="input-group-floating">
            <span className="input-icon">🔑</span>
            <input
              type="password"
              id="password"
              name="password"
              className="input-floating"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="btn-premium"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <div className="auth-footer-link">
          <Link to="/">← Back to Library Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
