import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.js";


const FeaturedWorkout = () => {
  const [randomWorkout, setRandomWorkout] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function getInfo() {
      const workouts = []
      for (let i = 0; i < 8; i++) {
        let res = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=biceps`, {
          method: "GET", 
          headers: {'X-Api-Key': proccess.env.API_KEY}
      });
        let data = await res.json();
        workouts.push(data.meals)
      }

      console.log(workouts);
      setRandomWorkout(workouts);
      setShow(true);
    }
    getInfo();
  }, []);


  return (
    <>
      
        {
          show ? randomWorkout?.map((workout, index) => (
            <WorkoutCard key={index} data={workout} />

          ))

            : "Loading..."
        }

      


    </>
  );
}

export default FeaturedWorkout;