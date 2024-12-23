import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot/ForgotPassword";
import NavBar from "./pages/navbar/Navbar";
import SecurePage from "./pages/secure/SecurePage";
import ResetPass from "./pages/resetpass/ResetPass";
import OtpVerify from "./pages/otpvalidate/OtpVerify";
import UpdatePassword from "./pages/updatepassword/UpdatePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/securepage" element={<SecurePage />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
