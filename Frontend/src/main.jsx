import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContext from "./GlobalContext/UserInfoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserInfoContext>
      <App />
    </UserInfoContext>
  </StrictMode>
);
