import getRecipeInfo from './Edamame';
import axios from 'axios';
import getChatResponse from './Chatgpt';

const getAllFoodData = async (foodName) => {
  try {
    const recipeHits = await getRecipeInfo(foodName);
    if (recipeHits.length === 0) {
      throw new Error('No recipe found for the given food name.');
    }

    const recipeData = recipeHits[0].recipe;
    const ingredients = recipeData.ingredientLines;
    const nutrients = recipeData.totalNutrients;
    const recipeUrl = recipeData.url;
    const response = await getChatResponse(
      `Take this URL and give me JUST the recipe of the food on the website and return the message in a very concise step by step format.Do not just give me the ingredients as I already have them.Also Dont say anything else Other than listing down the steps.Also add a newline characte '\n'. ${recipeUrl}`,
    );
    const allData = {
      ingredients,
      nutrients,
      recipeContent: response.choices[0].message.content,
    };

    return allData;
  } catch (error) {
    console.error('Error fetching recipe data:', error);
    throw error;
  }
};

export default getAllFoodData;
