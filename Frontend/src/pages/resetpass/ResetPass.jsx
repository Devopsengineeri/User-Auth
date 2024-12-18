import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateString } from "../validation/validation-fn";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

export default function ResetPass() {
  const navigate = useNavigate();
  const location = useLocation(); // Import useLocation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Extract email from URL query parameters
    const params = new URLSearchParams(location.search);
    const email = params.get("email") || "";
    setFormData((prev) => ({ ...prev, email }));
  }, [location.search]); // Depend on location.search, not navigate.search

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    try {
      validateString(formData.password)
        .passwordValidation()
        .minLength(8)
        .maxLength(20);
    } catch (error) {
      validationErrors.password = error.message;
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/app/resetpass`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed.");
      }

      toast.success("Your password has been reset successfully!");
      navigate("/");
      setFormData({ password: "", confirmPassword: "" });
      setErrors({});
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-container">
          <h2 className="header">
            <img
              src="src/img/forgot-password.png"
              alt="Reset Password Logo"
              style={{ width: 20, height: 20 }}
            />{" "}
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="button">
              Reset Password
            </button>
            <div className="form-footer">
              <span className="already-user">
                <Link to="/">Back to login!</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
