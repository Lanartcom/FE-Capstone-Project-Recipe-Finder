import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import ShoppingList from './components/ShoppingList';
import About from './components/About';
import Favorites from './components/Favorites'; // Import the Favorites component
import { fetchRecipes } from './api/recipeAPI';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    setQuery(query);
    if (query.trim()) {
      const data = await fetchRecipes(query);
      setRecipes(data.meals || []);
    } else {
      setRecipes([]);
    }
  };

  const addToShoppingList = (ingredients) => {
    setShoppingList((prevList) => [...prevList, ...ingredients]);
  };

  const removeFromShoppingList = (index) => {
    setShoppingList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    setShoppingList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const addToFavorites = (recipe) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorited = prevFavorites.some((fav) => fav.idMeal === recipe.idMeal);
      if (isAlreadyFavorited) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      } else {
        // Add to favorites
        return [...prevFavorites, recipe];
      }
    });
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.idMeal !== recipeId)
    );
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.idMeal}
                        recipe={recipe}
                        addToFavorites={addToFavorites}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">No recipes found. Try searching for another dish!</p>
                  )}
                </div>
              </main>
            </div>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              addToShoppingList={addToShoppingList}
            />
          }
        />
        <Route
          path="/shopping-list"
          element={
            <ShoppingList
              list={shoppingList}
              removeFromShoppingList={removeFromShoppingList}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;