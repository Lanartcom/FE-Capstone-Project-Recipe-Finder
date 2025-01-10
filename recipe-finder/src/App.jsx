import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import { fetchRecipes } from './api/recipeAPI'; // Use named import
import About from './components/About';

const App = () => {
  const [recipes, setRecipes] = useState([]); // State for recipes
  const [query, setQuery] = useState('');    // State for search query

  // Function to handle search
const handleSearch = async (query) => {
  console.log('Search Query:', query); // Log the search query
  setQuery(query); // Update search query state
  if (query.trim()) {
    const data = await fetchRecipes(query); // Fetch data using API logic
    console.log('Fetched Recipes:', data); // Log the fetched data
    if (data && data.meals) {
      setRecipes(data.meals); // Update state with fetched recipes
    } else {
      setRecipes([]); // Clear results if no meals are found
    }
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
                {/* Grid Layout for Recipe Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))
                  ) : (
                    <p className="text-gray-500">No recipes found...🤔 How about another dish?</p>
                  )}
                </div>
              </main>
            </div>
          }
        />
            <Route path="/about" element={<About />} /> {/* Add the About route */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;