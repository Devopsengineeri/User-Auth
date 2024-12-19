import "./SecurePage.css"; // Add appropriate styles in this CSS file
import { useNavigate } from "react-router-dom";
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
          credentials: "include", // Include session cookies if available
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token if needed
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized! Redirecting to login...");
        }

        const data = await response.json();
        setUser(data.user); // Update context with user data
      } catch (error) {
        console.error(error.message);
        handleLogout(); // Redirect to login if unauthorized
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear session data
    navigate("/"); // Redirect to login page
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-dashboard-container">
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
      </div>
    </div>
  );
};

export default SecurePage;
