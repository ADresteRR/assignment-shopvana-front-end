// src/index.js or src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList"
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { CartProvider } from './context/CartContext';


function App() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/get-all-products`);
        setProduct(results.data.data);
      } catch (err) {
        console.log(`error while fetching products`);
      }
    }
    fetchProducts();


  }, []);
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/food-details/:id" element={<ProductDetails products={products} />} />
          <Route path="/view-cart" element={<Cart />} />

        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
