import Header from './components/Header';
import SearchBar from './components/SearchBar';

const App = () => {
  const handleSearch = (query) => {
    console.log(query); // Placeholder for search handling
  };

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <main className="p-4">
        {/* Recipe cards will go here */}
      </main>
    </div>
  );
};
export default App;