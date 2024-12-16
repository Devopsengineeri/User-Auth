import "./ForgotPassword.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { validateString } from "../validation/validation-fn";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = {};

    try {
      validateString(formData.email).emailValidation().minLength(8);
    } catch (error) {
      validationErrors.email = error.message;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/app/ForgotPassword`, {
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

      toast.success("Reset code sent to your email!");
      setFormData({ email: "" });
      setErrors({});
      navigate("/otpverify");
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
              alt="Forgot Password Logo"
              style={{ width: 20, height: 20 }}
            />{" "}
            Forgot Password
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error" aria-live="polite">
                  {errors.email}
                </span>
              )}
            </div>
            <button type="submit" className="button">
              Send Reset Code
            </button>
            <div className="form-footer">
              <span className="already-user">
                <Link to="/">Back to login!</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
