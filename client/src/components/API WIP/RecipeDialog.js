
import React, { useState, useEffect } from 'react';
import getAllFoodData from './FoodData'; // Import the function to fetch all food data

import { Box, Tab, Typography as Text } from '@mui/material'; // Import MUI components for UI
import { TabContext, TabList, TabPanel } from '@mui/lab'; // Import MUI Lab components for tab functionality
import CircularProgress from '@mui/material/CircularProgress'; // Import MUI component for loading indicator

const RecipeDialog = ({ foodName }) => { // Define the component with props
  const [activeTab, setActiveTab] = useState('recipe'); // State for active tab
  const [data, setData] = useState({ // State to store food data
    ingredients: [],
    nutrients: {},
    recipeContent: '',
  });

  useEffect(() => { 
    const fetchData = async () => { // Define async function to fetch data
      try {
        console.log('hi'); // Log to console as part of the debug process
        const allData = await getAllFoodData(foodName); // Fetch data using the food name
        setData(allData); // Set the fetched data to state
      } catch (error) {
        console.error('Failed to fetch recipe data', error); // Log error if fetching fails
      }
    };
    fetchData(); // Call fetch function when component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  const renderRecipe = () => ( // Function to render recipe ingredients
    <div>
      <ul>
        {data.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li> // Map each ingredient to a list item
        ))}
      </ul>
    </div>
  );

  const renderNutrition = () => ( // Function to render nutrition facts
    <div>
      <ul>
        {Object.entries(data.nutrients).map(([key, value]) => (
          <li key={key}>
            {value.label}: {Math.round(value.quantity)} {value.unit} // Map each nutrient to a list item
          </li>
        ))}
      </ul>
    </div>
  );

  const renderContent = () => { // Function to render the recipe steps
   
    const steps = data.recipeContent
      .split('\n')
      .map((step, index) => step.trim()) // Trim each step and split by newline
      .filter((step) => step.length > 0); // Filter out empty steps
    return (
      <div>
        {steps.map((step, index) => (
          <li className="list">{step}</li> // Map each step to a list item
        ))}
      </div>
    );
  };

  const [tabValue, setTabValue] = useState(); // State to keep track of tab selection
  const handleChange = (event, newValue) => { // Handler for changing tabs
    setTabValue(newValue); // Update the tab state to the new value
  };
  return (
    <Box>
      <TabContext value={tabValue}> 
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}> 
          <TabList onChange={handleChange}>
            <Tab label="Ingredients" value={'1'} /> 
            <Tab label="Nutrition" value={'2'} /> 
            <Tab label="Recipe" value={'3'} /> 
          </TabList>
        </Box>
        <TabPanel value="1"> 
          {data.ingredients.length > 0 ? (
            renderRecipe()
          ) : (
            <Box sx={{ display: 'flex', paddingLeft: '50%' }}>
              <CircularProgress /> 
            </Box>
          )}
        </TabPanel>
        <TabPanel value="2"> 
          {data.ingredients.length > 0 ? (
            renderNutrition()
          ) : (
            <Box sx={{ display: 'flex', paddingLeft: '50%' }}>
              <CircularProgress />
            </Box>
          )}
        </TabPanel>
        <TabPanel value="3"> 
          {data.ingredients.length > 0 ? (
            renderContent()
          ) : (
            <Box sx={{ display: 'flex', paddingLeft: '50%' }}>
              <CircularProgress />
            </Box>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RecipeDialog; 
