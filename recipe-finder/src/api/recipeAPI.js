const fetchRecipes = async (query) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
  
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('API Error:', error.message);
      return [];
    }
  };
  
  export default fetchRecipes;
  