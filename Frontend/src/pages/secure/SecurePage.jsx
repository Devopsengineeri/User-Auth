import "./SecurePage.css"; // Add appropriate styles in this CSS file

const SecurePage = () => {
  return (
    <div className="user-dashboard-container">
      <div className="dashboard-card">
        <div className="profile-picture-section">
          <img
            src="https://w0.peakpx.com/wallpaper/766/843/HD-wallpaper-cool-anime-boy-mirror-selfie-animation-thumbnail.jpg"
            alt={`Nitin's profile`}
            className="profile-picture"
          />
        </div>
        <div className="user-details-section">
          <h2 className="user-name">{"Nitin Goyat"}</h2>
          <p className="user-email">Email: Nitin@gmail.com</p>
          <p className="user-dob">D.O.B.: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SecurePage;
