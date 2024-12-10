import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import RecipeLetters from "./RecipeLetters";
import MealCategories from "./MealCategories";
import FeaturedRecipes from "/workspaces/pt72-Fitness_Friend/src/front/js/component/FeaturedRecipes.js"

const Meal = () => {
  const [url, setUrl] = useState("");
  const [meal, setMeal] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      setMeal(data.meals);
      setShow(true);
    }
    const searchRecipe = (e) => {
        if (e.key == 'Enter')
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)

        setSelectedCategory("search")

    }
    return (
        <>
            <div className="main text-center">
                <div data-aos="zoom-out-right" className="heading">
                    <h1 className="header">Recipes:</h1>
                    <h2 className="subheader">Simple Recipes, Stunning Results</h2>
                    <div className="search--box">
                        <div class="search input-group mb-3">
                            <input onChange={(e) => setSearch(e.target.value)} onKeyDown={searchRecipe} type="search" class="input" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <i class="fas fa-search"></i>

                    </div>
                </div>
                <div className="categories text-center d-flex">
                    <MealCategories catIndex={(cat) => catIndex(cat)} />
                </div>


                <div className="">
                    {selectedCategory === null && <FeaturedRecipes />}  
                    {show ? <MealCard data={meal} /> : "Not found"}
                    
                    
                </div>
                     
                {/* Recipes Sort by Letters */}
                {/* <div className="lettersContainer">
                <RecipeLetters letterIndex={(letter) => letterIndex(letter)}/>
            </div> */}
      </div>
    </>
  );
};
// https://github.com/Valerieclaire96/whoKnows
export default Meal;
