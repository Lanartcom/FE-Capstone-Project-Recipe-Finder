// api/recipeAPI.js

// Fetch recipes by name or ID
export const fetchRecipes = async (query, byId = false) => {
  try {
    let url;
    if (byId) {
      // Fetch recipe details by ID
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${query}`;
    } else {
      // Search recipes by name
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response:', data); // Log the API response
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};

// Fetch recipes by category
export const fetchRecipesByCategory = async (category) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response (Category):', data); // Log the API response
    return data;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    return null;
  }
};

// Fetch detailed recipe information by ID
export const fetchRecipeDetails = async (id) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Response (Details):', data); // Log the API response
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};