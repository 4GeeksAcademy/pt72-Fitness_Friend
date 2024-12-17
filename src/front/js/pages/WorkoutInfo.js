import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkoutInfo = () => {
  const { WorkoutID } = useParams();
  const [info, setInfo] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);

  useEffect(() => {
    async function getInfo() {
      const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${WorkoutID}`;
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
        setInfo(result);

        if (result.instructions) {
          setInstructions(result.instructions);
        }
        if (result.secondaryMuscles) {
          setSecondaryMuscles(result.secondaryMuscles);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getInfo();
  }, [WorkoutID]);



  return (
    <>
      {!info ? (
        ""
      ) : (
        <div data-aos="fade-in" className="recipe-box card mb-3 m-5" style={{ minWidth: "540px", borderRadius: "1.25rem", boxShadow: "0px 0px 30px 7px rgba(0,0,0,0.1)" }}>
          <div className="" style={{ flexDirection: "row-reverse" }}>
            <div className="meal-info_header d-flex">
              <div data-aos="fade-up-left" style={{ "border-radius": "20px !important" }} >
                <img style={{ borderRadius: "1.25rem", width: "300px" }} className="img-fluid" src={info.gifUrl} alt={info.name} />
              </div>
              <h1 data-aos="fade-down-right" style={{ alignSelf: "center", fontSize: "2rem", marginLeft: "3rem" }}>{info.name}</h1>
              <h2 data-aos="fade-down-right" style={{ alignSelf: "center", fontSize: "2rem", marginLeft: "3rem" }}>Target: {info.target}</h2>
              <h2 data-aos="fade-down-right" style={{ alignSelf: "center", fontSize: "2rem", marginLeft: "3rem" }}>Body Part: {info.bodyPart}</h2>
              <h2 data-aos="fade-down-right" style={{ alignSelf: "center", fontSize: "2rem", marginLeft: "3rem" }}>secondaryMuscles:
                <ul>
                  {secondaryMuscles.map((secondaryMuscle, index) => (
                    <li key={index}>{secondaryMuscle}</li>
                  ))}
                </ul></h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="meal-body my-3">
                <div style={{borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }} data-aos="fade-left" className="meal-instructions ps-4">
                  <h2>Instructions</h2>
                  <ul>
                    {instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutInfo;

bodyPart
:
"waist"
equipment
:
"body weight"
gifUrl
:
"https://v2.exercisedb.io/image/n5lhFRwIiHQhuz"
id
:
"0001"
instructions
:
(5)['Lie flat on your back with your knees bent and feet flat on the ground.', 'Place your hands behind your head with your elbows pointing outwards.', 'Engaging your abs, slowly lift your upper body off…forward until your torso is at a 45-degree angle.', 'Pause for a moment at the top, then slowly lower your upper body back down to the starting position.', 'Repeat for the desired number of repetitions.']
name
:
"3/4 sit-up"
secondaryMuscles
:
(2)['hip flexors', 'lower back']
target
:
"abs"