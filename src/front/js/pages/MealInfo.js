import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealInfo = () => {
  const { MealId } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function getInfo() {
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
      let data = await res.json();
      console.log(data);
      setInfo(data.meals[0]);
    }
    getInfo();
  }, [MealId]);

  const ingredientArray = Object.keys(info)
    .filter(key => key.startsWith('strIngredient') && info[key])
    .map(key => info[key]);

  const measureArray = Object.keys(info)
    .filter(key => key.startsWith('strMeasure') && info[key])
    .map(key => info[key]);

  const videoId = () => {
    let vId = '';
    if (info) {
      const videoUrl = info.strYoutube;
      if (videoUrl) {
        const videoStr = videoUrl.split('=');
        vId = videoStr[videoStr.length - 1];
      }
    }
    return vId;
  };


  const vId = videoId()

  return (
    <>
      {!info ? (
        ""
      ) : (
        <div data-aos="fade-in" className="recipe-box card mb-3 m-5" style={{ minWidth: "540px", borderRadius: "1.25rem", boxShadow: "0px 0px 30px 7px rgba(0,0,0,0.1)" }}>
          <div className="" style={{ flexDirection: "row-reverse" }}>
            <div className="meal-info_header d-flex">
              <div data-aos="fade-up-left" style={{ "border-radius": "20px !important" }} >
                <img style={{ borderRadius: "1.25rem", width: "300px" }} className="img-fluid" src={info.strMealThumb} alt={info.strMeal} />
              </div>
              <h1 data-aos="fade-down-right" style={{ alignSelf: "center", fontSize: "2rem", marginLeft: "3rem" }}>{info.strMeal}</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>


              <div className="meal-body my-3">
                <div data-aos="fade-right" class="meal-ingredients">
                  <h2>Ingredients</h2>
                  <ul className="list-group list-group-vertical">
                    {ingredientArray.map((ingredient, index) => (
                      <li style={{ width: "100%" }} class="list-group-item" key={index}>{ingredient} - {measureArray[index]} </li>
                    ))}
                  </ul>
                </div>
                <div data-aos="fade-left" class="meal-instructions ps-4">
                  <h2>Instructions</h2>
                  <p>{info.strInstructions}</p>
                </div>

              </div>
            </div>
          </div>
          <div data-aos="zoom-out-up">
            <h2>Video Tutorial</h2>
            <div style={{ height: "499px" }} className="tutorialVideo corner-wrapper ">
              <iframe src={`https://www.youtube.com/embed/${vId}`}
                title="Youtube video" allowFullScreen>
              </iframe>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default MealInfo;