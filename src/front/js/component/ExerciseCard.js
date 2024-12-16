// src/components/ExerciseCard.js
import React from 'react';

const Exercisecard1 = ({ exercise }) => {
  // Fallback URLs i2n case the API doesn't provide data
  const fallbackImage = "https://via.placeholder.com/250?text=No+Image+Available";  // Placeholder image
  const fallbackVideo = "https://www.youtube.com/watch?v=IODxDxX7oi4";  // Default YouTube video link

  // If the thumbnail URL is relative, prepend the base URL
  const BASE_URL = "https://exercisedb.p.rapidapi.com";  // Replace with the actual base URL if needed
  const imageUrl = exercise.thumbnail && exercise.thumbnail.startsWith('http')
    ? exercise.thumbnail
    : `${BASE_URL}${exercise.thumbnail}`;  // Construct full URL if thumbnail is relative

  // Check if the video URL exists; if not, use the fallback
  const videoUrl = exercise.video || fallbackVideo;

  return (
    <div className="exercise-card1">
      <div className="exercise-card2">
        {/* Image */}
        <img
          src={imageUrl || fallbackImage}
          alt={exercise.name}
          className="exercise-thumbnail"
        />
        <div className="exercise-info">
          {/* Exercise Name */}
          <h3 className="exercise-name">{exercise.name}</h3>

          {/* Exercise Description */}
          <p className="exercise-description">{exercise.description || 'No description available.'}</p>

          {/* Body Part (Target Muscle Group) */}
          <p><strong>Target Area:</strong> {exercise.bodyPart}</p>

          {/* Equipment */}
          <p><strong>Equipment:</strong> {exercise.equipment}</p>

          {/* Video Link */}
          {exercise.video && (
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="exercise-video-link">
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
