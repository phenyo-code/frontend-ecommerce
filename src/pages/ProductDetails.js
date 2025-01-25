import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './ProductDetails.css';
import SearchHeader from '../components/SearchHeader'; 
import FloatingCart from '../components/FloatingCart';
import { FiHeart } from 'react-icons/fi'; 
import { FaFire } from 'react-icons/fa';

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); 
  const [errorText, setErrorText] = useState('');
  const [showSold, setShowSold] = useState(false); // State to toggle Sold/Left
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageWrapperRef = useRef(null);


  useEffect(() => {
    const productFound = products.find((prod) => prod.id === parseInt(id));
    setProduct(productFound);

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productInWishlist = wishlist.some(item => item.id === productFound?.id);
    setIsInWishlist(productInWishlist);

    const toggleSold = setInterval(() => {
      setShowSold(prev => !prev);
    }, 1000); // Toggle every 3 seconds

    return () => clearInterval(toggleSold); // Cleanup on unmount
  }, [id, products]);

  const calculateDiscount = () => {
    if (product?.originalPrice && product?.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const handleSizeSelection = (sizeObj) => {
    setSelectedSize(sizeObj.size); // Set the actual size
    setSelectedSizeQuantity(sizeObj.quantity); // Set the associated quantity
    setErrorText(''); // Clear error if any
  };

  const handleScroll = () => {
    const scrollPosition = imageWrapperRef.current.scrollLeft;
    const containerWidth = imageWrapperRef.current.offsetWidth;

    // Calculate the current image index
    const newIndex = Math.round(scrollPosition / containerWidth);
    setCurrentImageIndex(newIndex);
  };

  const addToCart = () => {
    if (!selectedSize) {
      setErrorText('Please choose size');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = existingCart.find((item) => item.id === product.id && item.size === selectedSize);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1, size: selectedSize });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setShowAnimation(true);

    setTimeout(() => setShowAnimation(false), 1000);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = wishlist.some(item => item.id === product.id);

    if (!isProductInWishlist) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true); 
    } else {
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false); 
    }
  };

  console.log(document.querySelector('.image-count'));


  const discount = calculateDiscount();

  return (
    <div className="product-page">
      <SearchHeader placeholder={product ? product.filter : "Search for products..."} />
      {product ? (
        <>
        <div>
            <div className="prod-image-wrapper" ref={imageWrapperRef} onScroll={handleScroll}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  className="prod-image"
                />
              ))}
            </div>
            <div className="image-count">
                {currentImageIndex + 1}/{product.images.length}
              </div>
           </div>  
            

          <div className="prod-details">
            <div className="price-container">
              <p className="price">R{product.price}</p>
              {discount > 0 && (
                <p className="discount-text">
                  DISCOUNT OF
                  <span className="discount-percent">{discount}%</span>
                </p>
              )}
              {product.originalPrice && <p className="original-price">R{product.originalPrice} </p>}
            </div>
            <p className="prod-name">{product.name}</p>
          </div>

         {/* Product Size Selector */}
          <div className="size-selector">
            <p className="size-text">Size:</p>
            <div className="size-options">
              {product.sizes.map((sizeObj, index) => (
                <div
                  key={index}
                  className={`size-option ${selectedSize === sizeObj.size ? 'selected' : ''} ${
                    sizeObj.quantity === 0 ? 'disabled' : ''
                  }`}
                  onClick={() => sizeObj.quantity > 0 && handleSizeSelection(sizeObj)} // Disable click for size with 0 quantity
                >
                  {sizeObj.size}
                </div>
              ))}
            </div>
            {selectedSizeQuantity !== null && (
              <p className="size-quantity">
                <FaFire className="flame" />
                {showSold
                  ? `${product.sizes.find((s) => s.size === selectedSize)?.sold || 0} Sold`
                  : `${selectedSizeQuantity} Left`}
              </p>
            )}
            {errorText && <p className="errorText">{errorText}</p>}
          </div>
         
          <div className="add-button">
            <FiHeart 
              className={`wish-list ${isInWishlist ? 'added' : ''}`} 
              onClick={addToWishlist} 
            />
            {showAnimation && <div className="cart-dot"></div>}
            <button onClick={addToCart} className="add-to-cart">Add to Cart</button>
          </div>

          <div className="shipping-details">
            <p>Shipping Details </p>
          </div>

          <div className="description">
            <p>Description</p>
          </div>

          <div className="reviews">
            <p>Reviews</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <FloatingCart />
    </div>
  );
}

export default ProductDetails;












