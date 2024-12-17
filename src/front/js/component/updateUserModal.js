import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UpdateUserModal = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    height: "",
    name: "",
    last_name: "",
    weight: "",
    pic: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user profile
  const handleUpdateUser = async () => {
    const updatedFormData = { ...formData };
    await actions.updateUser(updatedFormData);
    alert("Profile updated successfully!");
  };

  const update = async (e) => {
    e.preventDefault();
    let response = await fetch(process.env.BACKEND_URL + "/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("User updated successfully!");
    } else {
      alert("Error updating user.");
    }
    let data = await response.json();
  };

  useEffect(() => {
    if (store.user) {
      setFormData({
        email: store.user.email,
        height: store.user.height,
        name: store.user.name,
        last_name: store.user.last_name,
        weight: store.user.weight,
      }); // Make sure the data is being set correctly
    } else {
      actions.getUser();
    }
  }, [store.user]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#updateUserModal"
      >
        Update Profile
      </button>

      <div
        className="modal fade"
        id="updateUserModal"
        tabIndex="-1"
        aria-labelledby="updateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateUserModalLabel">
                Update Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-warning"
                onClick={handleUpdateUser}
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
