import { useState } from "react";
import "./OtpVerify.css"
import { Link } from "react-router-dom";
import { validateString } from "../validation/validation-fn";
import { toast, ToastContainer } from "react-toastify";

export default function OtpVerify() {
  const [formData , setFormData] = useState({
    otp:"",
    email: ""
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {}

    try {
      validateString(formData.otp);
    } catch (error) {
      validationErrors.otp = error.message;
    }

    if (isNaN(Number(formData.otp))) {
      throw new Error("OTP must be a numeric value.");
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/app/otpverify`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Server Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid OTP!");
      }

      const data = await response.json();
      toast.success("OTP verified")
      setFormData({otp:"", email:""})
      setErrors({})
      
    } catch (error) {
      toast.error("Failed to verify OTP")
    }
  }
  

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
            OTP Verification
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="otp" className="label">
                 OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
              />
              {errors.otp && <span className="error">{errors.otp}</span>}
            </div>
            <button type="submit" className="button">
              Validate OTP
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
