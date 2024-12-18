import "./SecurePage.css"; // Add appropriate styles in this CSS file
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../GlobalContext/UserInfoContext";

const SecurePage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   dob: "",
  //   profilePicture: "",
  // });

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const email = params.get("email") || "";
  //   setFormData((prev) => ({ ...prev, email }));
  // }, [navigate.search]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  let image = `${user.profilePicture}`;
  console.log(image);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear session data
    navigate("/");
  };

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
          <h2 className="user-name">{user.firstName + user.lastName}</h2>
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
