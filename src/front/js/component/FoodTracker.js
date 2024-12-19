import React, { useState } from "react";
export const FoodTracker = () => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [foodList, setFoodList] = useState([]);
  const handleSubmit = () => {
    const newFood = {
      foodName,
      calories,
      protein: `${protein} grams`,
      carbs: `${carbs} grams`,
      fats: `${fats} grams`,
    };
    setFoodList([...foodList, newFood]);
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
  };
  return (
    <div className="bg-white p-3 mb-3 mx-auto" style={{ borderRadius: "10px", width: "1466px" }}>
      <h2>Food Tracker</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          className="form-control mb-2"
          style={{ borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="form-control mb-2"
          style={{ borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
        />
        <input
          type="number"
          placeholder="Protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          className="form-control mb-2"
          style={{ borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
        />
        <input
          type="number"
          placeholder="Carbs"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          className="form-control mb-2"
          style={{ borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
        />
        <input
          type="number"
          placeholder="Fats"
          value={fats}
          onChange={(e) => setFats(e.target.value)}
          className="form-control mb-2"
          style={{ borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="btn btn-primary mt-2"
        disabled={!foodName || !calories || !protein || !carbs || !fats}
        style={{
          borderRadius: "5px",
          padding: "8px 15px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        Add Food
      </button>
      <h3 className="mt-4">Food History</h3>
      <div className="food-history-list mt-3">
        {foodList.length > 0 ? (
          foodList.map((food, index) => (
            <div key={index} className="mb-3 p-3 border rounded" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="mb-2" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {food.foodName.charAt(0).toUpperCase() + food.foodName.slice(1)}
              </div>
              <div className="mb-2" style={{ fontSize: "1rem" }}>
                <strong>{food.calories} Calories</strong>
              </div>
              <div className="mb-2" style={{ fontSize: "1rem" }}>
                <strong>Protein:</strong> {food.protein}
              </div>
              <div className="mb-2" style={{ fontSize: "1rem" }}>
                <strong>Carbs:</strong> {food.carbs}
              </div>
              <div className="mb-2" style={{ fontSize: "1rem" }}>
                <strong>Fats:</strong> {food.fats}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No food history found.</div>
        )}
      </div>
    </div>
  );
};
export default FoodTracker;