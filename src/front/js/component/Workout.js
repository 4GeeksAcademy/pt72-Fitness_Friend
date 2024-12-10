import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import MealCategories from "../pages/MealCategories";
import FeaturedWorkout from "/workspaces/pt72-Fitness_Friend/src/front/js/component/FeaturedWorkout.js"

const Workout = () => {
    const [url, setUrl] = useState("");
    const [workout, setWorkout] = useState([])
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        async function getExercise() {
            let res = await fetch(url, {
                method: "GET", 
                headers: {'X-Api-Key': proccess.env.API_KEY}
            });
            let data = await res.json();
            console.log(data);
            setWorkout(data);
            setShow(true)


        }
        getExercise();
    }, [url])


    const catIndex = (cat) => {
        setUrl(`https://api.api-ninjas.com/v1/exercises?type=${cat}`)
        setSelectedCategory(cat)
    }

    const searchExercise = (e) => {
        if (e.key == 'Enter')
            setUrl(`https://api.api-ninjas.com/v1/exercises?name=${search}`)
        setSelectedCategory("search")
    }
    return (
        <>
            <div className="main text-center">


                <div data-aos="zoom-out-right" className="heading">
                    <h1 className="header">Workouts:</h1>
                    <h2 className="subheader">Simple Workout, Stunning Results</h2>
                    <div className="search--box">
                        <div class="search input-group mb-3">
                            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={searchExercise} type="search" class="input" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <div className="categories text-center d-flex">
                    <MealCategories catIndex={(cat) => catIndex(cat)} />
                </div>

                <div className="recipes_grid mt-5 mx-auto">
                    {selectedCategory === null && <FeaturedWorkout />}
                    {show ? <WorkoutCard data={workout} /> : ""}


                </div>

            
            </div>


        </>

    );
}
export default Workout;