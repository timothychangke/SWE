
import getRecipeInfo from './Edamame'; // Import the getRecipeInfo function from local module
import axios from 'axios'; // Import axios for HTTP requests
import getChatResponse from './Chatgpt'; // Import getChatResponse function from local module

/**
 * Aggregates all relevant food data including recipe information and chatbot response.
 * 
 * @param {string} foodName - The name of the food to search for recipe and chat response.
 * @returns {Promise<Object>} A promise that resolves to an object containing ingredients, nutrients, and formatted recipe content.
 */

const getAllFoodData = async (foodName) => { // Define an async function to aggregate all relevant food data
  try {
    const recipeHits = await getRecipeInfo(foodName); // Retrieve recipe information
    if (recipeHits.length === 0) {
      throw new Error('No recipe found for the given food name.'); // Throw an error if no recipes are found
    }

    const recipeData = recipeHits[0].recipe;
    const ingredients = recipeData.ingredientLines;
    const nutrients = recipeData.totalNutrients;
    const recipeUrl = recipeData.url;
    const response = await getChatResponse(
      `Take this URL and give me JUST the recipe of the food on the website and return the message in a very concise step by step format. Do not just give me the ingredients as I already have them. Also don't say anything else other than listing down the steps. Also add a newline character '\n'. ${recipeUrl}`, // Request Webscraped Recipe of Food from recipe URL
    );
    const allData = {
      ingredients,
      nutrients,
      recipeContent: response.choices[0].message.content, // Store the formatted recipe content
    };

    return allData; // Return the aggregated food data
  } catch (error) {
    console.error('Error fetching recipe data:', error); // Log any errors during the process
    throw error; 
  }
};

export default getAllFoodData; 

