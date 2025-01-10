import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

const RecipeCard = ({ recipe, addToFavorites }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    addToFavorites(recipe);
  };

  return (
    <div className="border rounded-lg p-4 m-2 flex flex-col">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-2 truncate">{recipe.strMeal}</h2>
      <p className="text-sm text-gray-600">{recipe.strCategory} - {recipe.strArea}</p>
      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="text-blue-500 underline"
        >
          View Details
        </Link>
        {/* Heart Icon */}
        <button onClick={toggleFavorite} className="text-red-500">
          {isFavorited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;