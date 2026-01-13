import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    dept: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.studentId.trim())
      newErrors.studentId = "Roll number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.dept.trim()) newErrors.dept = "Department is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axiosInstance.post("/auth/register", registerData);
      console.log(confirmPassword);
      // Store token and student info
      localStorage.setItem("studentToken", response.data.token);
      localStorage.setItem(
        "studentInfo",
        JSON.stringify(response.data.student)
      );

      // Trigger event for Navbar update
      window.dispatchEvent(new Event("student-login"));

      alert("Registration successful!");
      navigate("/student/dashboard");
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Registration failed",
      });
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-premium">
      <div className="auth-card-glass auth-card-glass-wide">
        <div className="auth-header-premium">
          <h1>📝 Join the Library</h1>
          <p>Create your student account to start borrowing</p>
        </div>

        {errors.submit && <div className="error-message-glass">⚠️ {errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid-premium">
            {/* Left Column */}
            <div>
              <div className="input-group-floating">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  className="input-floating"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                {errors.name && <small className="form-error">{errors.name}</small>}
              </div>

              <div className="input-group-floating">
                <span className="input-icon">🆔</span>
                <input
                  type="text"
                  name="studentId"
                  className="input-floating"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Roll Number"
                />
                {errors.studentId && <small className="form-error">{errors.studentId}</small>}
              </div>

              <div className="input-group-floating">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  className="input-floating"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
                {errors.email && <small className="form-error">{errors.email}</small>}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="input-group-floating">
                <span className="input-icon">📚</span>
                <input
                  type="text"
                  name="dept"
                  className="input-floating"
                  value={formData.dept}
                  onChange={handleChange}
                  placeholder="Department"
                />
                {errors.dept && <small className="form-error">{errors.dept}</small>}
              </div>

              <div className="input-group-floating">
                <span className="input-icon">📱</span>
                <input
                  type="tel"
                  name="phone"
                  className="input-floating"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                {errors.phone && <small className="form-error">{errors.phone}</small>}
              </div>

              <div className="input-group-floating">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  className="input-floating"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (min 6 chars)"
                />
                {errors.password && <small className="form-error">{errors.password}</small>}
              </div>
            </div>
          </div>

          <div className="input-group-floating" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            <span className="input-icon">🔐</span>
            <input
              type="password"
              name="confirmPassword"
              className="input-floating"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <small className="form-error">{errors.confirmPassword}</small>}
          </div>

          <button
            type="submit"
            className="btn-premium"
            disabled={loading}
            style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
          >
            {loading ? "Creating Account..." : "Register Account"}
          </button>
        </form>

        <div className="auth-footer-link">
          <p>
            Already have an account? <Link to="/student/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
