import React, { useState, useEffect } from 'react';
import getAllFoodData from './FoodData'; // Make sure this import path is correct

import { Box, Tab, Typography as Text } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';

const RecipeDialog = ({ foodName }) => {
  const [activeTab, setActiveTab] = useState('recipe');
  const [data, setData] = useState({
    ingredients: [],
    nutrients: {},
    recipeContent: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('hi');
        const allData = await getAllFoodData(foodName);
        setData(allData);
      } catch (error) {
        console.error('Failed to fetch recipe data', error);
      }
    };
    fetchData();
  }, []);

  const renderRecipe = () => (
    <div>
      <ul>
        {data.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );

  const renderNutrition = () => (
    <div>
      <ul>
        {Object.entries(data.nutrients).map(([key, value]) => (
          <li key={key}>
            {value.label}: {Math.round(value.quantity)} {value.unit}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderContent = () => {
    // Assuming each step is separated by a newline character in `data.recipeContent`
    const steps = data.recipeContent
      .split('\n')
      .map((step, index) => step.trim())
      .filter((step) => step.length > 0);
    return (
      <div>
        {steps.map((step, index) => (
          <li className="list">{step}</li>
        ))}
      </div>
    );
  };

  const [tabValue, setTabValue] = useState();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <TabList onChange={handleChange}>
            <Tab label="Ingridents" value={'1'} />
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
