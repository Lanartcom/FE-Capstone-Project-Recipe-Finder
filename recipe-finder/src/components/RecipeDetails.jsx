// RecipeDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../api/recipeAPI';

const RecipeDetails = ({ addToShoppingList }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(id, true);
      if (data && data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      } else {
        setError('Recipe not found');
      }
    };

    fetchRecipeDetails();
  }, [id]);

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

  if (error) return <p className="text-red-500">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">Back to Search</Link>
      
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Left Column: Text */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{recipe.strMeal}</h1>
          <p className="mt-2"><strong>Category:</strong> {recipe.strCategory}</p>
          <p className="mt-2"><strong>Cuisine:</strong> {recipe.strArea}</p>
          <h2 className="text-xl mt-4">Ingredients:</h2>
          <ul className="list-disc ml-8">
            {getIngredients().map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>
          <button
            onClick={() => addToShoppingList(getIngredients())}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Shopping List
          </button>
          <h2 className="text-xl mt-4">Instructions:</h2>
          <p className="whitespace-pre-wrap">{recipe.strInstructions}</p>
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
        <div className="flex-1">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-80 mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;