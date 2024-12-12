import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { validateString } from "../validation/validation-fn";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    try {
      validateString(formData.email).emailValidation().minLength(8);
    } catch (error) {
      validationErrors.email = error.message;
    }

    try {
      validateString(formData.password)
        .passwordValidation()
        .minLength(8)
        .maxLength(20);
    } catch (error) {
      validationErrors.password = error.message;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors.");
      return;
    }
    if(formData.email){
      navigate("/securePage")
      toast.success("Login successful!");
    }


    setFormData({
      email: "",
      password: "",
    });

    setErrors({});
  };

  return (
    <>
      <div className="login-form-container">
        <h1>
          <img
            src="src/img/logo.png"
            alt="Login-logo"
            style={{ width: 25, height: 25 }}
          />{" "}
          LOGIN{" "}
        </h1>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>

          <div className="form-footer">
            <span className="new-user">
              <Link to="/registration">New User?</Link>
            </span>
            <span className="forgot-password">
              <Link to="/forgetpassword">Forget Password?</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
