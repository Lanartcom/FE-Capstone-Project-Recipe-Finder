import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
console.log(RecipeDetails); // Check if this logs the component or `undefined`
import fetchRecipes from './api/recipeAPI'; // Import API logic

const App = () => {
  const [recipes, setRecipes] = useState([]); // State for recipes
  const [query, setQuery] = useState('');    // State for search query

  // Function to handle search
  const handleSearch = async (query) => {
    setQuery(query); // Update search query state
    if (query.trim()) {
      const data = await fetchRecipes(query); // Fetch data using API logic
      setRecipes(data); // Update state with fetched recipes
    } else {
      setRecipes([]); // Clear results if query is empty
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SearchBar onSearch={handleSearch} />
              <main className="p-4">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                  ))
                ) : (
                  <p className="text-gray-500">No recipes found. Try searching for a dish!</p>
                )}
              </main>
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
