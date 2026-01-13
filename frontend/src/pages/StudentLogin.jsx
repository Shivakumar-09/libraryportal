import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();
  const { loginStudent } = useAuth(); // ✅ AuthContext for immediate update

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", formData);

      const studentData = response.data.student;
      const token = response.data.token;

      // Update AuthContext
      loginStudent(studentData, token);

      alert("Login successful!");
      navigate("/student/dashboard"); // redirect to dashboard
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
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        {error && <div className="error-message-glass">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group-floating">
            <span className="input-icon">📧</span>
            <input
              type="email"
              id="email"
              name="email"
              className="input-floating"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
            />
          </div>

          <div className="input-group-floating">
            <span className="input-icon">🔒</span>
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
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer-link">
          <p>
            Don't have an account?{" "}
            <Link to="/student/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
