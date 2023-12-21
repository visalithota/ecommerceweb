import React, { useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './Product';
import Signup from './Signup';
import Login from './Login';
import Cart from './Product/cart';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);


  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleSearch = (searchTerm) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterProducts(filteredProducts);
  };

  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Products addToCart={addToCart} products={filterProducts} />} 
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
