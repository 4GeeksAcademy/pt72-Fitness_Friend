import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import FeaturedWorkout from "/workspaces/pt72-Fitness_Friend/src/front/js/component/FeaturedWorkout.js";
import WorkoutCategories from "../pages/WorkoutCategories";

const Workout = () => {
    const [url, setUrl] = useState("");
    const [workout, setWorkout] = useState([]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        async function getExercise() {
            if (!url) return; 
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.API_KEY,
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
                }
            };
            
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setWorkout(result);
                setShow(true);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        getExercise();
    }, [url]);

    const catIndex = (cat) => {
        setUrl(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${cat}`);
        setSelectedCategory(cat);
    };

    const searchExercise = (e) => {
        if (e.key === 'Enter') {
            setUrl(`https://exercisedb.p.rapidapi.com/exercises/name/${search}?offset=0&limit=10`);
            setSelectedCategory("search");
        }
    };

    return (
        <>
            <div className="main text-center">
                <div data-aos="zoom-out-right" className="workout-heading">
                    <h1 className="header">Workouts:</h1>
                    <h2 className="subheader">Simple Workout, Stunning Results</h2>
                    <div className="search--box">
                        <div className="search input-group mb-3">
                            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={searchExercise} type="search" className="input" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="categories text-center d-flex">
                    {/* <WorkoutCategories catIndex={(cat) => catIndex(cat)} /> */}
                </div>
                <div className="recipes_grid mt-5 mx-auto">
                    {/* {selectedCategory === null && <FeaturedWorkout />}
                    {show ? <WorkoutCard data={workout} /> : ""} */}
                </div>
            </div>
        </>
    );
};

export default Workout;
