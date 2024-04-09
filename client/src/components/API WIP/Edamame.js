
import Axios from 'axios'; 

const getRecipeInfo = async (foodName) => { // Define an async function to fetch recipe information by food name
  const app_id = 'e243a229'; // Application ID for the API
  const app_key = '0dc63dbb444368a2123c9de54be9884e'; // Application key for the API
  var result = await Axios.get(
    `https://api.edamam.com/search?q=${foodName}&app_id=${app_id}&app_key=${app_key}`, // Construct and send the HTTP GET request
  );
  return [result.data.hits[0]]; // Return the first hit from the API response containing the most accurate recipe and ingredients 
};

export default getRecipeInfo; 

