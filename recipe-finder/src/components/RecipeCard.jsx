const RecipeCard = ({ recipe }) => (
    <div className="border rounded p-4 m-2">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strCategory} - {recipe.strArea}</p>
    </div>
  );
  export default RecipeCard;
  