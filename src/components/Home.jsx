import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productName, setProductName] = useState('');  // (Checking, product name ko track)
  const [price, setPrice] = useState('');  // (Checking, Price input ko track)
  const navigate = useNavigate();

  useEffect(() => {
    // We are Checking that user is Logged in, otherwise redirect to login 
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    // Fetch products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const addProduct = () => {
    // Add product to local array if product is not duplicate
    const newProduct = { name: productName, price: price };
    const productExists = products.some(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    );
    if (!productExists && productName && price) {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts)); // (Save to localStorage)
      // Clear input fields after adding the product
      setProductName('');
      setPrice('');
    }
  };


   // New Function (Delete Product)
   const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // (Updating LocalStorage)
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative flex flex-col items-center">
    {/* Navbar */}
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-xl tracking-tight font-semibold text-blue-600">Product Management</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transform transition duration-300 ease-in-out"
      >
        Logout
      </button>
    </div>
  
    <div className="w-full max-w-3xl mt-24 bg-white shadow-lg rounded-lg p-6 transition-all duration-300 ease-in-out">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
      </div>
  
      {/* Add Product Form */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addProduct()}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addProduct()}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        />
        <button
          onClick={addProduct}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transform transition duration-300 ease-in-out"
        >
          Add
        </button>
      </div>
  
      {/* Show Product List */}
      <div>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No Product Found</p>
        ) : (
          <ul className="space-y-2">
            {filteredProducts.map((product, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md transform transition duration-300 hover:scale-102 hover:bg-gray-300"
              >
                <span className="font-semibold">{product.name} - ${product.price}</span>
                <button
                  onClick={() => deleteProduct(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transform transition duration-300 ease-in-out"
                >
                 <RxCross1 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default Home;
