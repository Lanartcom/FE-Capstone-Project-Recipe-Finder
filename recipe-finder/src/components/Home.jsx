import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import { fetchRecipes } from '../api/recipeAPI'; // Import fetchRecipes

const Home = ({ handleSearch, recipes, addToFavorites, favorites }) => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      const queries = ['Pasta', 'Pizza', 'Chicken', 'Burger', 'Salad'];
      const recipes = await Promise.all(
        queries.map((query) => fetchRecipes(query)) // Use fetchRecipes
      );
      // Filter out duplicates
      const uniqueRecipes = recipes
        .flatMap((data) => data.meals || [])
        .filter((recipe, index, self) =>
          self.findIndex((r) => r.idMeal === recipe.idMeal) === index
        );
      setPopularRecipes(uniqueRecipes);
      setIsLoading(false);
    };

    fetchPopularRecipes();
  }, []);

  return (
    <div className="p-4">
      {/* Welcome Message */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-amber-600">Welcome to Foodie!</h1>
        <p className="mt-4 text-gray-600">
          Discover delicious recipes from around the world. Start by searching for your favorite dish above.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-0">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Display Search Results */}
      {recipes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Search Results</h2>
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
        </div>
      )}

      {/* Popular Recipes */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Popular Recipes</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                addToFavorites={addToFavorites}
                favorites={favorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;