import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { UpdateUserModal } from "../component/updateUserModal";
import UploadImage from "../component/uploadImage ";

export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const [weightHistory, setWeightHistory] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

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
      console.log("Fetched weight history:", data);
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
      setName(store.user.name);
      setLastName(user.last_name);
    }
  }, [store.user]);

  return (
    <div className="mt-5">
      {store.token ? (
        <div className="container text-center  profile-layout ">
          <div className="profile-content my-auto">
            <UploadImage user={user} />
            <h1 className="profile-title">Hello, {name}</h1>
            <h3>Email: {email}</h3>
            <h4>
              Name: {name} {lastName}
            </h4>
            <h4>Height: {height} cm</h4>
            <h4>Weight: {newWeight} kg</h4>
          </div>{" "}
          <UpdateUserModal />
          <div className="container">
            <h2>Weight Tracker</h2>
            <input
              type="number"
              placeholder="Enter new weight"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="form-control"
            />
            <button
              onClick={addNewWeight}
              className="btn btn-primary mt-2"
              disabled={!newWeight || isNaN(newWeight)}
            >
              Add Weight
            </button>

            <h3>Weight History</h3>
            <ul className="list-group mx-auto mt-3">
              {weightHistory.length > 0 ? (
                weightHistory.map((entry) => (
                  <li key={entry.id} className="list-group-item">
                    <strong>
                      {new Date(entry.created_at).toLocaleDateString()}
                    </strong>
                    : {entry.weight} kg
                  </li>
                ))
              ) : (
                <li className="list-group-item">No weight history found.</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <h1>You must log in to view your profile</h1>
      )}
    </div>
  );
};
