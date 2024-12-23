import { useState } from "react";
import "./UpdatePassword.css";
import { toast, ToastContainer } from "react-toastify";
import { validateString } from "../validation/validation-fn";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formData.oldpassword) {
      validationErrors.oldpassword = "Current password is required.";
    }

    try {
      validateString(formData.newpassword)
        .passwordValidation()
        .minLength(8)
        .maxLength(20);
    } catch (error) {
      validationErrors.newpassword = error.message;
    }

    if (formData.newpassword !== formData.confirmnewpassword) {
      validationErrors.confirmnewpassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/app/updatepassword`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify({
          oldpassword: formData.oldpassword,
          newpassword: formData.newpassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to update password.");
      }

      toast.success("Your password has been updated successfully!");
      setFormData({
        oldpassword: "",
        newpassword: "",
        confirmnewpassword: "",
      });
      setErrors({});
      navigate("/securepage"); 
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="newpass-form-container">
        <h2 className="header">
          <img
            src="src/img/forgot-password.png"
            alt="Reset Password Logo"
            style={{ width: 20, height: 20 }}
          />{" "}
          Update Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldpassword">Current Password</label>
            <input
              type="password"
              name="oldpassword"
              id="oldpassword"
              placeholder="Enter Current Password"
              value={formData.oldpassword}
              onChange={handleChange}
            />
            {errors.oldpassword && (
              <span className="error">{errors.oldpassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="newpassword">New Password</label>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="Enter New Password"
              value={formData.newpassword}
              onChange={handleChange}
            />
            {errors.newpassword && (
              <span className="error">{errors.newpassword}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmnewpassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmnewpassword"
              id="confirmnewpassword"
              placeholder="Re-enter New Password"
              value={formData.confirmnewpassword}
              onChange={handleChange}
            />
            {errors.confirmnewpassword && (
              <span className="error">{errors.confirmnewpassword}</span>
            )}
          </div>

          <button type="submit" className="button">
            Update Password
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
