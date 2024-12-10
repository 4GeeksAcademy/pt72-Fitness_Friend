import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";



const WorkoutCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate()

    const handleClick = (e, workout) => {
        e.preventDefault();
        if (store.favs.some(fav => fav.idMeal === workout.idMeal && fav.type === "workout")) {    
            // come back to this to change IDs
            actions.removeFavs({ idMeal: workout.idMeal, type: "workout" });
        } else {
            actions.addFavs(workout, "workout");
        }
    };

    return (
        <>
            {
                (!data) ? "No Workout Found " : data.map((workout, index) => {
                    return (
                        <div className="recipe_card m-2 d-flex" style={{ borderRadius: "1.25rem", boxShadow: "0px 0px 13px 10px rgba(0,0,0,0.1)" }} key={index} >
                            <div onClick={() => {
                             navigate(`/${workout.idMeal}`)
                            //  comeback to this to change meal IDs to workout IDs
                            }}> 
                                <img src={workout.strMealThumb} alt="/" />
                            </div>
                            <h3 className="ms-2">{workout.strMeal}</h3>
                            <a onClick={(e) => handleClick(e, workout)} style={{ borderRadius: "1.25rem" }} href="#" className="btn btn-warning ms-5">
                                <i className={store.favs.some(fav => fav.idMeal === workout.idMeal && fav.type === "workout") ? "fa fa-solid fa-heart" : "fa fa-regular fa-heart test"}></i>

                            </a>
                        </div>

                    )
                })
            }

            {/* className="recipe_card " */}





        </>
    );
}

export default WorkoutCard;