import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";



const WorkoutCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    let navigate = useNavigate()

    // const handleClick = (e, workout) => {
    //     e.preventDefault();
    //     if (store.favs.some(fav => fav.id === workout.id && fav.type === "workout")) {
    //         // come back to this to change IDs
    //         actions.removeFavs({ id: workout.id, type: "workout" });
    //     } else {
    //         actions.addFavs(workout, "workout");
    //     }
    // };
    const handleClick = (e, workout) => {
        e.preventDefault();
    
        const existingFav = store.favs.find(
            (fav) => fav.name === workout.name && fav.type === "workout"
        );
    
        if (existingFav) {
            actions.removeFav(existingFav.id); // Remove favorite from backend
        } else {
            actions.addFav({ name: workout.name }, "workout"); // Add favorite to backend
        }
    };
    return (
        <>
            {
                (!data) ? "No Workout Found " : data.map((workout, index) => {
                    return (
                        <div data-aos="fade-in">
                            <div className="recipe_card m-2 d-flex" style={{ borderRadius: "1.25rem", boxShadow: "0px 0px 13px 10px rgba(0,0,0,0.1)" }} key={index} >
                                {store.token ? (
                                    <div onClick={() => {
                                        navigate(`/workout/${workout.id}`)
                                    }}>
                                        <img src={workout.gifUrl} alt="/" />
                                    </div>
                                ) : (
                                    <div onClick={() => {
                                        navigate(`/profile`)
                                    }}>
                                        <img src={workout.gifUrl} alt="/" />
                                    </div>
                                )}

                                <h3 className="ms-2">{workout.name}</h3>
                                {store.token ? (
                                    <div className="fav-button-container">
                                        <a onClick={(e) => handleClick(e, workout)} style={{ borderRadius: "1.25rem" }} href="#" className="btn btn-warning ms-5">
                                            <i className={store.favs.some(fav => fav.id === workout.id && fav.type === "workout") ? "fa fa-solid fa-heart" : "fa fa-regular fa-heart test"}></i>
                                        </a>
                                    </div>
                                ) : (<div className="d-none"></div>)}

                            </div>
                        </div>

                    )
                })
            }

            {/* className="recipe_card " */}





        </>
    );
}

export default WorkoutCard;