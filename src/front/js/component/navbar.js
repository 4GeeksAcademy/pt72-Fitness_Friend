import React, { useContext } from "react";
import { LoginModal } from "./loginmodal";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => { 
  const {store, actions} = useContext(Context)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <li className="nav-item">
          <Link to={"/"} className="logo nav-link">
            <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here" />
          </Link>
        </li>
        <li className="nav nav-tabs float-right border-0">

          <li className="nav-item" className="nav-link">
            <Link to={"/meal"}>Recipes</Link>
          </li>
          <li className="nav-item" className="nav-link">
            <a href="#">Workouts</a>
          </li>
          { store.user ? 
            <li className="nav-item" className="nav-link">
              <a href="#">Logout</a>
            </li> :
            <li className="nav-item" className="nav-link">
              <LoginModal />
            </li>
          }
        </li>
      </div>
    </nav>
  );
};
