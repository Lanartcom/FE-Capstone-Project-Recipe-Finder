import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard'; // Ensure this is imported

const Favorites = ({ favorites = [], removeFromFavorites }) => {
  // Predefined categories
  const categories = [
    { name: 'Desserts', path: '/category/Desserts' },
    { name: 'Pasta', path: '/category/Pasta' },
    { name: 'Burgers', path: '/category/Burgers' },
    { name: 'Curries', path: '/category/Curries' },
    { name: 'Stir-Fries', path: '/category/Stir-Fries' },
    { name: 'Grilled Dishes', path: '/category/Grilled Dishes' },
    { name: 'Breakfast', path: '/category/Breakfast' },
    { name: 'Snacks', path: '/category/Snacks' },
    { name: 'Smoothies', path: '/category/Smoothies' },

  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 italic py-8">
            Your favorites list is empty. Let's add some recipes! ✍🏼
          </p>
          {/* Display Recipe Categories */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-6">Discover Recipes by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              addToFavorites={() => removeFromFavorites(recipe.idMeal)} // Toggle favorite
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Default props
Favorites.defaultProps = {
  favorites: [],
};

export default Favorites;