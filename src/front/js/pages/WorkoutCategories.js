import React, { useState, useEffect } from "react";

const WorkoutCategories = ({ catIndex }) => {
    const [cat, setCat] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
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
                setCat(result);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        getCategories();
    }, []);

    return (
        <>
            {cat.map((category) => (
                <div className="box" key={category}
                    onClick={() => catIndex(category)}>
                    <div className="cat_button p-3">
                        <h3>{category}</h3>
                    </div>
                </div>
            ))}
        </>
    );
}

export default WorkoutCategories;
