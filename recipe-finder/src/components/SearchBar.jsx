import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import search and close icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Debounce the search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query); // Pass the query to the parent component after a delay
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [query, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query state
  };

  const handleClear = () => {
    setQuery(''); // Clear the input field
  };

  return (
    <div className="p-4">
      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          id="search"
          className="border border-gray-300 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
          placeholder="Search your favorite recipes..."
          value={query}
          onChange={handleInputChange}
          aria-label="Search for recipes"
        />
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;