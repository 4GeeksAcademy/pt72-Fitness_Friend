import React, { useState } from 'react';
import ExerciseList from 'src/front/js/component/ExerciseList.js';

const ExercisePage = () => {
  const [bodyPart, setBodyPart] = useState('');

  return (
    <div className="exercise-page">
      <h1>Exercise List</h1>
      
      <select onChange={(e) => setBodyPart(e.target.value)} value={bodyPart}>
        <option value="">All Body Parts</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="legs">Legs</option>
        <option value="shoulders">Shoulders</option>
        <option value="arms">Arms</option>
      </select>
      
      <ExerciseList bodyPart={bodyPart} />
    </div>
  );
};

export default ExercisePage;