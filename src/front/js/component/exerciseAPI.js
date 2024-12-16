import axios from 'axios';

const BASE_URL = "https://exercisedb.p.rapidapi.com";

const API_KEY = "1f3fa9a56dmshc603ddd6d4dd3dep1edf02jsna1108152569f";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
  }
});

export const fetchExercises = async (bodyPart = '') => {
    const url = `/exercises${bodyPart ? `?bodyPart=${bodyPart}` : ''}`;
  
    return axiosInstance.get(url)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching exercises:", error);
        return [];
      });
  };