import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";



const MealCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate()

    const handleClick = (e, meal) => {
        e.preventDefault();
        if (store.favs.some(fav => fav.idMeal === meal.idMeal && fav.type === "meal")) {
            actions.removeFavs({ idMeal: meal.idMeal, type: "meal" });
        } else {
            actions.addFavs(meal, "meal");
        }
    };

    return (
        <>
            {
                (!data) ? "No Meal Found " : data.map((meal, index) => {
                    return (
                        <div className="recipe_card m-2 d-flex" style={{ borderRadius: "1.25rem", boxShadow: "0px 0px 13px 10px rgba(0,0,0,0.1)" }} key={index} >
                            <div onClick={() => {
                             navigate(`/${meal.idMeal}`)
                            }}> 
                                <img src={meal.strMealThumb} alt="/" />
                            </div>
                            <h3 className="ms-2">{meal.strMeal}</h3>
                            <a onClick={(e) => handleClick(e, meal)} style={{ borderRadius: "1.25rem" }} href="#" className="btn btn-warning ms-5">
                                <i className={store.favs.some(fav => fav.idMeal === meal.idMeal && fav.type === "meal") ? "fa fa-solid fa-heart" : "fa fa-regular fa-heart test"}></i>

                            </a>

                        </div>

                    )
                })
            }

            {/* className="recipe_card " */}

        </>
    );
}

export default MealCard;