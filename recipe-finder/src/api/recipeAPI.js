// api/recipeAPI.js
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