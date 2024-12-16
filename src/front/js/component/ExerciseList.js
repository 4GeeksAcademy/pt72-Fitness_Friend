// src/components/ExerciseList.js
import React, { useState, useEffect } from 'react';
import { fetchExercises } from '/workspaces/pt72-Fitness_Friend/src/front/js/component/exerciseAPI.js';
import { Link } from 'react-router-dom';
import '/workspaces/pt72-Fitness_Friend/src/front/styles/exercise.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercises = async () => {
      const data = await fetchExercises();
      setExercises(data);
      setLoading(false);
    };
    loadExercises();
  }, []);

  if (loading) {
    return <p>Loading exercises...</p>;
  }

  return (
    <div className="exercise-list">
      {exercises.map(exercise => (
        <div key={exercise.id} className="exercise-card">
          <Link to={`/exercise/${exercise.id}`}>
            <img 
              src={exercise.thumbnail} 
              alt={exercise.name} 
              className="exercise-thumbnail" 
            />
            <h3>{exercise.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;