import React, { useState, useEffect } from "react";
import MealCard from "./MealCard.js";


const FeaturedRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function getInfo() {
      const recipes = []
      for (let i = 0; i < 8; i++) {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        let data = await res.json();
        recipes.push(data.meals)
      }

      console.log(recipes);
      setRandomRecipes(recipes);
      setShow(true);
    }
    getInfo();
  }, []);


  return (
    <>
        {
          show ? randomRecipes?.map((recipe, index) => (
            <MealCard key={index} data={recipe} />

          ))
            : "Loading..."
        }

      


    </>
  );
}

export default FeaturedRecipes;