import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.js";


const CategoryWorkout = ({cat}) => {
  const [categoryWorkout, setCategoryWorkout] = useState()
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function getWorkout() {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        let data = await res.json();
        console.log(data);
        setCategoryWorkout(data.meals);
        setShow(true)


    }
    getWorkout();
}, [cat])


  return (
    <>
      
        {
          show ? categoryWorkout?.map((workout, index) => (
            <WorkoutCard key={index} data={workout} />

          ))

            : "Loading..."
        }

      


    </>
  );
}

export default CategoryWorkout;