import "./SecurePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../GlobalContext/UserInfoContext";
import { useEffect } from "react";

const SecurePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/app/securepage", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          navigate("/");
          throw new Error("Unauthorized! Redirecting to login...");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error.message);
        handleLogout();
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      console.log(document.cookie);
      const response = await fetch("http://localhost:5000/app/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("logout failed");
      }
      // localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error.message, "error logout");
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-dashboard-container">
      <form className="user-dashboard-form">
        <div className="dashboard-card">
          <div className="profile-picture-section">
            <img
              src={`http://localhost:5000/${user.profilePicture}`}
              alt={user.firstName}
              className="profile-picture"
            />
          </div>
          <div className="user-details-section">
            <h2 className="user-name">{`${user.firstName} ${user.lastName}`}</h2>
            <p className="user-email">{user.email}</p>
            <p className="user-dob">
              D.O.B.: {new Date(user.dob).toLocaleDateString()}
            </p>
          </div>
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        <div className="form-footer">
          <span className="already-user">
            <Link to="/updatepassword">Update Password!</Link>
          </span>
        </div>
        </div>
      </form>
    </div>
  );
};

export default SecurePage;
