import "./Register.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { validateString } from "../validation/validation-fn";

export default function Register() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    profilePicture: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "profilePicture") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    try {
      validateString(formData.firstName)
        .allowNumbers()
        .capitalize()
        .minLength(3)
        .maxLength(20);
    } catch (error) {
      validationErrors.firstName = error.message;
    }

    try {
      validateString(formData.lastName)
        .allowNumbers()
        .capitalize()
        .minLength(3)
        .maxLength(20);
    } catch (error) {
      validationErrors.lastName = error.message;
    }

    try {
      validateString(formData.email).emailValidation().minLength(8);
    } catch (error) {
      validationErrors.email = error.message;
    }

    try {
      validateString(formData.dob).allowedAge(); // Validate age when dob changes
    } catch (error) {
      validationErrors.dob = error.message;
    }

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

    if (!formData.profilePicture) {
      validationErrors.profilePicture = "Profile picture is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }

    console.log(formData, "form");

    try {
      const newFormData = new FormData();

      for (let key in formData) {
        newFormData.append(key, formData[key]);
      }

    const response = await fetch(`http://localhost:5000/app/registration`, {
      method: "POST",
      body: newFormData,
    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message || "User already Exist Try Diff email !");
    }

    // If no errors, submit the form
    toast.success("Form submitted successfully!");

    console.log("Form submitted successfully:", formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      profilePicture: " ",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
      
    } catch (error) {
      toast.error(error.message || "Failed to submit Form")
      
    }
  };

  return (
    <>
      <div className="registration-form-container">
        <h1>
          <img
            src="src/img/new.png"
            alt="Login-logo"
            style={{ width: 25, height: 25 }}
          />{" "}
          SignUp{" "}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">D.O.B.</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile</label>
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              accept=".jpg, .png"
              ref={fileInputRef}
              // value={formData.profilePicture}
              onChange={handleChange}
            />
            {errors.profilePicture && (
              <span className="error">{errors.profilePicture}</span>
            )}
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

          <button type="submit">SignUp</button>

          <div className="form-footer">
            <span className="already-user">
              <Link to="/">Already User?</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
