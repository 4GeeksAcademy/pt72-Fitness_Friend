import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.js";


const FeaturedWorkout = () => {
  const [randomWorkout, setRandomWorkout] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function getInfo() {
      const workouts = []
      const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0';
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
        console.log(result);
        workouts.push(result)
      } catch (error) {
        console.error(error);
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

      
{/* proccess.env.API_KEY */}

    </>
  );
}

export default FeaturedWorkout;


// const workouts = []
// for (let i = 0; i < 8; i++) {
//   let res = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPartList`, {
//     method: "GET", 
//     headers: {
//       'x-rapidapi-key': process.env.API_KEY,
//       'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
//     }
// });
//   let data = await res.json();
//   workouts.push(data)
// }