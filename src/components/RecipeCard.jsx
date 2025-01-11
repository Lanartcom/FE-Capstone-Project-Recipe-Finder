import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

const RecipeCard = ({ recipe, addToFavorites, favorites = [] }) => {
  console.log('RecipeCard - favorites:', favorites); // Debugging log
  console.log('RecipeCard - recipe:', recipe); // Debugging log

  const isFavorited = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const toggleFavorite = () => {
    addToFavorites(recipe);
  };

  return (
    <div className="border rounded-lg p-4 m-2 flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow">
      {/* Recipe Image */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Recipe Title */}
      <h2 className="text-lg font-bold mt-2 truncate">{recipe.strMeal}</h2>

      {/* Recipe Category and Cuisine */}
      <p className="text-sm text-gray-600">
        {recipe.strCategory} - {recipe.strArea}
      </p>

      {/* View Details and Favorite Button */}
      <div className="flex justify-between items-center mt-4">
        {/* View Details Link */}
        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label={`View details for ${recipe.strMeal}`}
        >
          View Details
        </Link>

        {/* Heart Icon for Favorites */}
        <button
          onClick={toggleFavorite}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label={`${isFavorited ? 'Remove' : 'Add'} ${recipe.strMeal} from favorites`}
        >
          {isFavorited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>
      </div>
    </div>
  );
};

RecipeCard.defaultProps = {
  favorites: [],
};

export default RecipeCard;