import "./ForgotPassword.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { validateString } from "../validation/validation-fn";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessages = { ...errors };

    try {
      if (name === "email") {
        validateString(value).emailValidation().minLength(8);
        delete errorMessages[name];
      }
    } catch (error) {
      errorMessages[name] = error.message;
    }

    setErrors(errorMessages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    const response = await fetch(`http://localhost:5000/app/ForgotPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // This header is necessary to tell the server that you're sending JSON
      },
      body: JSON.stringify(formData), // Make sure to send the data as a JSON string
    });

    console.log(response, "sdfsdgg");

    console.log("Reset code sent to:", formData.email);
    toast.success("Reset code sent to your email!");

    setFormData({ email: "" });
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else {
      try {
        validateString(formData.email).emailValidation().minLength(8);
      } catch (error) {
        validationErrors.email = error.message;
      }
    }
    return validationErrors;
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
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
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
