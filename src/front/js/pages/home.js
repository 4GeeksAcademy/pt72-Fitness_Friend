import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carouselhome"
import "../../styles/home.css";
import { Link } from "react-router-dom";
import FeaturedRecipes from "../component/FeaturedRecipes";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<div className="mx-auto">
			<div className="homeHeader">
				<h1>Meet Your Newest Friend in Fitness! 
					</h1>
			</div>
			<Carousel />
			<div data-aos="fade-in">
				<h2>Featured Recipes: </h2>
				<div className="recipes_grid mt-5 mx-auto">
					<FeaturedRecipes />
				</div>
			</div>
		</div>
	);
};
