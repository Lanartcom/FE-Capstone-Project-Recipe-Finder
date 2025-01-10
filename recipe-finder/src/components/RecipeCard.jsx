import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="border rounded p-4 m-2">
    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
    <h2 className="text-lg font-bold mt-2">{recipe.strMeal}</h2>
    <p>{recipe.strCategory} - {recipe.strArea}</p>
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="text-blue-500 underline mt-2 inline-block"
    >
      View Details
    </Link>
  </div>
);

export default RecipeCard;
