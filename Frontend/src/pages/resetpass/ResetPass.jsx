import { Link } from 'react-router-dom'

export default function ResetPass() {
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
          <form>
            <div className="input-group">
              <label htmlFor="password" className="label">
                Password 
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                // value=''
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confrimPassword"
                name="confirm-Password"
                placeholder="Re-enter Password "
                // value=''
              />
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
    </>
  )
}
