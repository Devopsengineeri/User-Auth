import "./OtpVerify.css"
import { Link } from "react-router-dom";

export default function OtpVerify() {
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
          <form>
            <div className="input-group">
              <label htmlFor="otp" className="label">
                 OTP
              </label>
              <input
                type="Number"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
              />
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
    </>
  );
}
