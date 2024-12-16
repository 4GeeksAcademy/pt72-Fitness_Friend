// src/components/ExerciseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchExercises } from '/workspaces/pt72-Fitness_Friend/src/front/js/component/exerciseAPI.js';

const ExerciseDetail = () => {
  const { id } = useParams(); // Get the exercise ID from the URL
  const [exercise, setExercise] = useState(null);
  
  useEffect(() => {
    const loadExerciseDetail = async () => {
      // Fetch exercise data from the API
      const exercises = await fetchExercises();  // Or filter based on the ID
      const selectedExercise = exercises.find(ex => ex.id === id);
      setExercise(selectedExercise);
    };
    
    loadExerciseDetail();
  }, [id]);
  
  if (!exercise) {
    return <p>Loading exercise details...</p>;
  }

  return (
    <div className="exercise-detail">
      <img 
        src={exercise.thumbnail} 
        alt={exercise.name} 
        className="exercise-thumbnail" 
      />
      <h2>{exercise.name}</h2>
      <p><strong>Type:</strong> {exercise.type}</p>
      <p><strong>Equipment:</strong> {exercise.equipment}</p>
      <p><strong>Target Area:</strong> {exercise.bodyPart}</p>
      <p>{exercise.description}</p>
      <a href={exercise.video} target="_blank" rel="noopener noreferrer">Watch Video</a>
    </div>
  );
};

export default ExerciseDetail;