import { useState } from 'react';

const ShoppingList = ({ list, removeFromShoppingList, updateQuantity, clearShoppingList }) => {
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  // Handle undefined or null list
  if (!list) {
    return <p className="text-gray-500">Unable to load shopping list. Please try again later.</p>;
  }

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: value }));
    updateQuantity(index, value);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm("Clear this shopping list?🧹");
    if (confirmClear) {
      clearShoppingList(); // Call the clear function from the parent
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      {list.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Your shopping list is empty. Let's add some ingredients!
        </p>
      ) : (
        <>
          <ul>
            {list.map((item, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2"
                  />
                  <span className={checkedItems[index] ? 'line-through text-gray-500' : ''}>
                    {item.ingredient} - {item.measure}
                  </span>
                </div>
                <div>
                  <label htmlFor={`quantity-${index}`} className="sr-only">
                    Quantity for {item.ingredient}
                  </label>
                  <input
                    id={`quantity-${index}`}
                    type="number"
                    value={quantities[index] || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-16 border p-1 rounded"
                    min="1"
                  />
                  <button
                    onClick={() => removeFromShoppingList(index)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.ingredient} from shopping list`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Print List
            </button>
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingList;