// components/SearchBar.jsx
const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    const query = e.target.value;
    console.log('Input Value:', query); // Log the input value
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search your favorite recipes..."
        onChange={handleInputChange} // Trigger on input change
      />
    </div>
  );
};

export default SearchBar;