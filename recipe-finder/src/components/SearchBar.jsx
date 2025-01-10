const SearchBar = ({ onSearch }) => (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search recipes..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
  export default SearchBar;
  