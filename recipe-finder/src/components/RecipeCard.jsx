import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="border rounded-lg p-4 flex flex-col">
    {/* Image */}
    <div className="w-full h-40 overflow-hidden rounded-lg">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Title */}
    <h2 className="text-lg font-bold mt-2 truncate">{recipe.strMeal}</h2>

    {/* Category and Area */}
    <p className="text-sm text-gray-600 mt-1">{recipe.strCategory} - {recipe.strArea}</p>

    {/* View Details Link */}
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="text-blue-500 underline mt-2 inline-block"
    >
      View Details
    </Link>
  </div>
);

export default RecipeCard;