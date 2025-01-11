import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import { fetchRecipesByCategory, fetchRecipeDetails } from '../api/recipeAPI'; // Correct import

const CategoryPage = ({ addToFavorites, favorites = [] }) => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipesByCategoryName = async () => {
      const data = await fetchRecipesByCategory(categoryName);
      if (data && data.meals) {
        // Fetch additional details for each recipe
        const recipesWithDetails = await Promise.all(
          data.meals.map(async (recipe) => {
            const details = await fetchRecipeDetails(recipe.idMeal);
            return { ...recipe, ...details?.meals?.[0] }; // Merge basic and detailed data
          })
        );
        setRecipes(recipesWithDetails);
      } else {
        setRecipes([]);
      }
      setIsLoading(false);
    };

    fetchRecipesByCategoryName();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{categoryName} Recipes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              addToFavorites={addToFavorites}
              favorites={favorites}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recipes found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;