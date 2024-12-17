import React, { useState, useEffect } from "react";

// www.themealdb.com/api/json/v1/1/categories.php
// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood


const MealCategories = ({ catIndex }) => {
    const [cat, setCat] = useState([])

    useEffect(() => {
        async function getCategories() {
            let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
            let data = await res.json();
            console.log(data);
            setCat(data.categories);



        }
        getCategories();
    }, [])


    return (
        <>
            {cat.map((cat) => (
                <div className="box" key={cat.idCategory}
                    onClick={() => catIndex(cat.strCategory)}>
                    <div className="cat_button p-3">
                    <h3>{cat.strCategory}</h3>
                    </div>
                    
                </div>
            )
            )
            }


        </>

    );
}

export default MealCategories;