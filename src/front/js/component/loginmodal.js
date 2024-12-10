import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginModal = () => {
  const [signupView, setSignupView] = useState(false);
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    last_name: "",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInUser = async () => {
    actions.login(email, password);
  };
  const createUser = async (e) => {
    e.preventDefault();
    let response = await fetch(process.env.BACKEND_URL + "/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("User created successfully!");
    } else {
      alert("Error creating user.");
    }

    let data = await response.json();
  };

  return (
    <div>
      <button
        type="button"
        className="button modal-btn"
        style={{ maxHeight: "47px" }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Login
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <img
                className="img-fluid"
                alt="Responsive image"
                src="https://i.imgur.com/sB3VJu2.png"
                style={{ width: "105px", marginLeft: "auto" }}
              />

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"

                style={{ marginBottom: "30px" }}
              ></button>
            </div>
            <div className="modal-body">
              {signupView ? (
                <form onSubmit={createUser} className=" mx-auto">
                  <div className=" mb-3">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label"></label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                      />

                    </div>
                    <div className="mb-3">
                      <label htmlFor="last_name" className="form-label"></label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="height" className="form-label"></label>
                      <input
                        type="number"
                        className="form-control"
                        id="height"
                        name="height"
                        placeholder="Height (cm)"
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label"></label>
                      <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        placeholder="Weight (kg)"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">

                    <label htmlFor="email" className="form-label"></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">

                    <label htmlFor="password" className="form-label"></label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-warning w-100">
                    Sign up
                  </button>
                </form>
              ) : (
                <div className="input-group input-group-lg">
                  <div className="input-group input-group-lg">
                    <span
                      style={{ "font-size": "15px" }}
                      className="input-group input-group-lg mb-3 my-auto"
                      id="inputGroup-sizing-default"
                    >
                      {" "}
                      Email
                    </span>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <div className="input-group input-group-lg">
                    <span
                      className="input-group input-group-lg mb-3"
                      id="inputGroup-sizing-default"
                      style={{ fontSize: "15px" }}
                    >
                      {" "}
                      Password
                    </span>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>

                  <button
                    className=" btn btn-warning mt-3 rounded"
                    onClick={() => logInUser()}
                    style={{ width: "483px" }}
                  >
                    Log in
                  </button>
                </div>
              )}

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn"
                onClick={() => setSignupView(!signupView)}
              >
                {signupView ? "Go to Login" : "Create New Acount"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
