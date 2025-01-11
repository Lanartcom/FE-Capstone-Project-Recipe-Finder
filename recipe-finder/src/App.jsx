import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import ShoppingList from './components/ShoppingList';
import About from './components/About';
import Favorites from './components/Favorites';
import Home from './components/Home'; // Import the Home component
import { fetchRecipes } from './api/recipeAPI';
import CategoryPage from './components/CategoryPage'; // Import CategoryPage

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
// Function to clear the shopping list
const clearShoppingList = () => {
  setShoppingList([]); // Clear the list by setting it to an empty array
};

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
        {/* Home Page */}
        <Route
          path="/"
          element={
            <Home
              handleSearch={handleSearch} // Pass handleSearch to Home
              recipes={recipes} // Pass recipes to Home
              addToFavorites={addToFavorites} // Pass addToFavorites to Home
              favorites={favorites} // Pass favorites to Home
            />
          }
        />

        {/* Recipe Details Page */}
        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              addToShoppingList={addToShoppingList}
              addToFavorites={addToFavorites}
              favorites={favorites}
            />
          }
        />

        {/* Shopping List Page */}
        <Route
          path="/shopping-list"
          element={
            <ShoppingList
              list={shoppingList}
              removeFromShoppingList={removeFromShoppingList}
              updateQuantity={updateQuantity}
              clearShoppingList={clearShoppingList} // Pass the clear function
            />
          }
        />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Favorites Page */}
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        {/* Category Page */}
        <Route
  path="/category/:categoryName"
  element={
    <CategoryPage
      addToFavorites={addToFavorites}
      favorites={favorites}
    />
  }
/>
      </Routes>
    </Router>
  );
};

export default App;