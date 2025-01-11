import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../api/recipeAPI';
import { FaArrowLeft, FaHeart } from 'react-icons/fa'; // Import FaHeart for the favorites icon

const RecipeDetails = ({ addToShoppingList, addToFavorites, favorites }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false); // Track favorite status

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecipes(id, true);
        if (data && data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // Check if the current recipe is in favorites
  useEffect(() => {
    if (recipe && favorites) {
      const isAlreadyFavorited = favorites.some((fav) => fav.idMeal === recipe.idMeal);
      setIsFavorited(isAlreadyFavorited);
    }
  }, [recipe, favorites]);

  // Function to extract ingredients and quantities
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  // Handle adding to favorites
  const handleAddToFavorites = () => {
    setIsFavorited(!isFavorited); // Toggle favorite status
    addToFavorites(recipe); // Add the recipe to favorites
  };

  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;
  if (isLoading) return <p className="text-center p-4">Loading...</p>;
  if (!recipe) return <p className="text-center p-4">No recipe found.</p>;

  return (
    <div className="p-4">
      {/* Left Arrow Icon to Navigate to Home Page */}
      <div className="flex justify-start">
        <Link
          to="/"
          className="text-gray-500 hover:text-red-700 transition-colors"
          aria-label="Go back to home"
        >
          <FaArrowLeft size={24} />
        </Link>
      </div>

      {/* Recipe Details */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Left Column: Text */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{recipe.strMeal}</h1>
          <p className="mt-2">
            <strong>Category:</strong> {recipe.strCategory}
          </p>
          <p className="mt-2">
            <strong>Cuisine:</strong> {recipe.strArea}
          </p>

          {/* Ingredients */}
          <h2 className="text-xl mt-4">Ingredients:</h2>
          <ul className="list-disc ml-8">
            {getIngredients().map((item, index) => (
              <li key={index} className="mt-2">
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>

          {/* Buttons: Add to Shopping List, Print Recipe, and Add to Favorites */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addToShoppingList(getIngredients())}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add to Shopping List
            </button>
            <button
              onClick={() => window.print()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Print Recipe
            </button>
            <button
              onClick={handleAddToFavorites}
              className={`flex items-center gap-2 ${
                isFavorited ? 'bg-red-500' : 'bg-gray-500'
              } text-white px-4 py-2 rounded hover:bg-red-600 transition-colors`}
            >
              <FaHeart /> {/* Heart icon */}
              {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          {/* Instructions */}
          <h2 className="text-xl mt-4">Instructions:</h2>
          <p className="whitespace-pre-wrap mt-2">{recipe.strInstructions}</p>

          {/* YouTube Video */}
          {recipe.strYoutube && (
            <div className="mt-4">
              <h2 className="text-xl">Video:</h2>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
                title={recipe.strMeal}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        {/* Right Column: Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="min-w-fit h-90 md:max-h-96 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;