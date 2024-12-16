import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import RecipeLetters from "./RecipeLetters";
import MealCategories from "/workspaces/pt72-Fitness_Friend/src/front/js/pages/MealCategories.js";
import FeaturedRecipes from "/workspaces/pt72-Fitness_Friend/src/front/js/component/FeaturedRecipes.js"

const Meal = () => {
  const [url, setUrl] = useState("");
  const [meal, setMeal] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle recipe search
  const searchRecipe = async (e) => {
    if (e.key === 'Enter' && search.trim() !== "") {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      setSelectedCategory("search"); // Update the selected category to 'search'
    }
  };

  useEffect(() => {
    // Fetch recipes when URL changes
    if (url) {
      async function getRecipe() {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setMeal(data.meals);
        setShow(true);
      }
      getRecipe();
    }
  }, [url]); // This useEffect runs only when `url` is updated

  return (
    <>
      <div className="main text-center">
        <div data-aos="zoom-out-right" className="heading">
          <h1 className="header">Recipes:</h1>
          <h2 className="subheader">Simple Recipes, Stunning Results</h2>
          <div className="search--box">
            <div className="search input-group mb-3">
              <input 
                onChange={(e) => setSearch(e.target.value)} 
                onKeyDown={searchRecipe} 
                type="search" 
                className="input" 
                placeholder="Search for recipes..." 
                aria-label="Search" 
              />
            </div>
            <i className="fas fa-search"></i>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories text-center d-flex">
          <MealCategories catIndex={(cat) => setSelectedCategory(cat)} />
        </div>

        <div>
          {/* Show FeaturedRecipes if no category is selected */}
          {selectedCategory === null && <FeaturedRecipes />}
          {/* Show meal cards if meals are fetched */}
          {show ? <MealCard data={meal} /> : "Not found"}
        </div>

        {/* Optional: Recipes Sort by Letters */}
        {/* <div className="lettersContainer">
          <RecipeLetters letterIndex={(letter) => letterIndex(letter)} />
        </div> */}
      </div>
    </>
  );
};

export default Meal;