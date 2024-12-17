import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { UpdateUserModal } from "../component/updateUserModal";
import UploadImage from "../component/uploadImage";
import { LoginModal } from "../component/loginmodal";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const [weightHistory, setWeightHistory] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    await actions.getUser();
  };

  const getWeightHistory = async () => {
    let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let data = await response.json();
      setWeightHistory(data); // Set the weight history data
    } else {
      console.error("Failed to fetch weight history:", await response.text());
    }
  };

  const addNewWeight = async () => {
    let response = await fetch(process.env.BACKEND_URL + "/userMetrics", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight: parseFloat(newWeight) }),
    });
    if (response.ok) {
      setNewWeight("");
      getWeightHistory(); // Refresh weight history after adding new weight
    } else {
      console.error("Failed to add new weight:", response.status);
    }
  };

  useEffect(() => {
    if (store.token) {
      getUser();
      getWeightHistory();
    }
  }, [store.token]);

  useEffect(() => {
    if (store.user) {
      setUser(store.user); // Make sure the data is being set correctly
      setEmail(store.user.email);
      setHeight(store.user.height);
      setNewWeight(store.user.weight);
      setLastName(store.user.last_name);
      setName(store.user.name);
    }
  }, [store.user]);

  useEffect(() => {
    if (!store.token) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [store.token, navigate]);

  return (
    <div className="mt-5">
      {store.token ? (
        <div className="container text-center ">
          <div className="row">
            {/* Left Column - User Info, Basic Details, Social Links */}
            <div className="col-md-6">
              <div className="bg-white p-3 mb-3" style={{ borderRadius: "10px", marginLeft: "30px" }}>
                <div className="d-flex flex-column align-items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDAo21VVazGW2SUx8fkhhhhCYo3cY4cMvvK2FbgbKwMCz5BRfeoqeApiDGEagQ6RFLE-k&usqp=CAU" style={{ height: "227px", width: "232px" }} />
                  <UploadImage />
                  <p className="fw-bold h4 mt-3">{name} {lastName}</p>
                  <p className="text-muted">{email}</p>
                  <div className="d-flex">
                    <div className="btn btn-primary follow me-2">Follow</div>
                    <div className="btn-outline-primary message">
                      <UpdateUserModal />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {/* Basic Details */}
                  <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                    <p className="mb-0">Full Name</p>
                    <p className="mb-0 text-muted">{name} {lastName}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                    <p className="mb-0">Email</p>
                    <p className="mb-0 text-muted">{email}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                    <p className="mb-0">Height</p>
                    <p className="mb-0 text-muted">{height} cm</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <p className="mb-0">Weight</p>
                    <p className="mb-0 text-muted">{newWeight} kg</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white p-3 mb-3" style={{ borderRadius: "10px", marginLeft: "30px" }}>
                <h5>Social Links</h5>
                <div className="d-flex justify-content-between py-2">
                  <p><span className="fas fa-globe me-2"></span>Website</p>
                  <a href="#" className="text-muted">Link</a>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <p><span className="fab fa-github-alt me-2"></span>Github</p>
                  <a href="#" className="text-muted">Link</a>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <p><span className="fab fa-twitter me-2"></span>Twitter</p>
                  <a href="#" className="text-muted">Link</a>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <p><span className="fab fa-instagram me-2"></span>Instagram</p>
                  <a href="#" className="text-muted">Link</a>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <p><span className="fab fa-facebook-f me-2"></span>Facebook</p>
                  <a href="#" className="text-muted">Link</a>
                </div>
              </div>
            </div>

            {/* Right Column - Weight Tracker */}
            <div className="col-md-6">
              <div className="bg-white p-3 mb-3" style={{ borderRadius: "10px", marginRight: "10px", height: "552px" }}>
                <h2>Weight Tracker</h2>
                <input
                  type="number"
                  placeholder="Enter new weight"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="form-control mb-2"
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <button
                  onClick={addNewWeight}
                  className="btn btn-primary mt-2"
                  disabled={!newWeight || isNaN(newWeight)}
                  style={{
                    borderRadius: "5px",
                    padding: "8px 15px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  Add Weight
                </button>
                <h3 className="mt-4">Weight History</h3>
                <ul className="list-group mx-auto mt-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {weightHistory.length > 0 ? (
                    weightHistory.map((entry) => (
                      <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>{new Date(entry.created_at).toLocaleDateString()}</strong>
                        <span>{entry.weight} kg</span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center">No weight history found.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "240px" }}>
          <div className="alert alert-light">
            <div className="text-center" role="alert">
              You must log in to see your profile{" "}
              <a href="#" className="alert-link">
                <LoginModal />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

