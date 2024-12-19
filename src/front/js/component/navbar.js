import React, { useContext, useState } from "react";
import { LoginModal } from "./loginmodal";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { LogoutButton } from "../pages/logoutButton";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation(); // Get the current location

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        <Link to={"/"} className="logo">
          <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here" />
        </Link>

        <h1 className="homeHeader">Meet Your Newest Friend in Fitness</h1>

        <div className="nav nav-tabs">
          <ul className="nav nav-tabs">
            <li className={`nav-item nav-link ${isActive("/meal")}`}>
              <Link to={"/meal"}>Recipes</Link>
            </li>
            <li className={`nav-item nav-link ${isActive("/workout")}`}>
              <Link to={"/workout"}>Workout</Link>
            </li>

            {/* Show Profile only if user is logged in */}
            {store.user ? (
              <li className={`nav-item nav-link ${isActive("/profile")}`}>
                <Link to={"/profile"}>Profile</Link>
              </li>
            ) : (
              <li className="nav-item nav-link">
                {/* Show Login Button */}
                <button
                  className="btn btn-link"
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    color: "#686868",
                    padding: "0",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              </li>
            )}

            {/* Show Logout if user is logged in */}
            {store.user && (
              <li className="nav-item nav-link">
                <LogoutButton />
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Render the LoginModal */}
      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </nav>
  );
};