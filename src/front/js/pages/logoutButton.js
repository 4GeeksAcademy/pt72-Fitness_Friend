import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Perform logout
      actions.logout();  // This should update the store and sessionStorage
      navigate("/", { replace: true });  // Navigate to homepage or login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button className="btn btn-info" onClick={handleLogout}>
      Log Out
    </button>
  );
};

