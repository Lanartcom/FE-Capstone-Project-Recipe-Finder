import { FaHeart } from 'react-icons/fa'; // Import heart icon
import { Link } from 'react-router-dom';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="border rounded-lg p-4 flex flex-col">
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
                {/* Heart Icon to Remove from Favorites */}
                <button
                  onClick={() => removeFromFavorites(recipe.idMeal)}
                  className="text-red-500"
                >
                  <FaHeart size={20} /> {/* Filled heart icon */}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your favorites list is empty. Let's add some recipes!</p>
      )}
    </div>
  );
};

export default Favorites;