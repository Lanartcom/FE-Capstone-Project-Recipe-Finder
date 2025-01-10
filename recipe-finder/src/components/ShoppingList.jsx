import { useState } from 'react';

const ShoppingList = ({ list, removeFromShoppingList, updateQuantity }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({ ...prev, [index]: value }));
    updateQuantity(index, value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      {list.length === 0 ? (
        <p className="text-gray-500">
          Your favorites list is empty. Let's add some ingredients!
        </p>
      ) : (
        <>
          <ul>
            {list.map((item, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <span>
                  {item.ingredient} - {item.measure}
                </span>
                <div>
                  <input
                    type="number"
                    value={quantities[index] || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-16 border p-1 rounded"
                  />
                  <button
                    onClick={() => removeFromShoppingList(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handlePrint}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Print List
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingList;