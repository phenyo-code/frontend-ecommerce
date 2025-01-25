import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext'; 
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import ProductCard from './ProductCard'; 
import './AllProductList.css'; 

const AllProductsList = () => {
  const { allProducts } = useProducts(); // Access all products from the context
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // Local state for search query
  const [headerText, setHeaderText] = useState('Discover'); // Local state for header text

  useEffect(() => {
    // Automatically focus the input field when the component mounts
    document.getElementById('search-input').focus();
  }, []);

  useEffect(() => {
    // Update headerText dynamically based on searchQuery in real-time
    if (searchQuery.trim()) {
      setHeaderText(`Results for "${searchQuery}"`);
    } else {
      setHeaderText('Discover');
    }
  }, [searchQuery]);

  // Filter products based on search query in real-time
  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state in real-time
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="product-list">
      <div className="all-header">
        <IoIosArrowBack onClick={handleBack} className="back-icon" />
        <div className="search-form">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <FiSearch className="search-icons" />
      </div>
      <div>
        <p className="top">{headerText}</p> {/* Real-time updating header */}
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> 
          ))
        ) : (
          <p>No products found. Please try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default AllProductsList;





