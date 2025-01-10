import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../api/recipeAPI'; // Adjust the path if necessary

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null); // Add error state for better debugging

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(id, true); // Fetch recipe by ID
      console.log(data); // Log the data to inspect its structure

      if (data && data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]); // Extract the first meal from the array
      } else {
        setError('Recipe not found');
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>; // Display errors if any
  if (!recipe) return <p>Loading...</p>; // Show loading message until recipe is loaded

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">Back to Search</Link>
      <h1 className="text-2xl font-bold mt-4">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-md mx-auto my-4"
      />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Cuisine:</strong> {recipe.strArea}</p>
      <h2 className="text-xl mt-4">Ingredients:</h2>
      <ul className="list-disc ml-8">
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key) => (
            <li key={key}>
              {recipe[key]} - {recipe[`strMeasure${key.slice(13)}`]}
            </li>
          ))}
      </ul>
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
  );
};

export default RecipeDetails;