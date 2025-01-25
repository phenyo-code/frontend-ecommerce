import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";
import { FiTrash } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart || [];
  });

  // Remove item from cart
  const removeFromCart = (id, size) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCartItems(updatedCart);
  };

  // Update quantity of item
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
        : item
    );
    setCartItems(updatedCart);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate total savings
  const getTotalSavings = () => {
    return cartItems
      .reduce((totalSavings, item) => {
        if (item.originalPrice) {
          const savings = (item.originalPrice - item.price) * item.quantity;
          return totalSavings + savings;
        }
        return totalSavings;
      }, 0)
      .toFixed(2);
  };

  // Persist cart items to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);



  // Cart is empty
  const renderEmptyCart = () => (
    <div className="cart-empty">
      <p>Your cart is empty</p>
      <p>
        <Link to="/" className="shop-now">
          Shop Now
        </Link>
      </p>
    </div>
  );

  // Render cart items
  const renderCartItems = () => (
    <div className="cart-items">
      {cartItems.map((item) => (
        <div key={`${item.id}-${item.size}`} className="cart-item">
          <div className="cart-item-wrapper">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.images?.[0] || "/placeholder-image.png"}
                alt={item.name}
                className="cart-item-image"
              />
            </Link>
            <div className="cart-item-details">
              <div className="cart-item-header">
                <p className="item-name">{item.name}</p>
                <FiTrash
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="remove-btn"
                />
              </div>
              <p className="cart-item-size">Size: {item.size}</p>
              <div className="cart-item-info">
                <div className="cart-item-price">
                  <span className="current-price">R{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">
                      R{item.originalPrice}
                    </span>
                  )}
                </div>
                <div className="quantity-controls">
                  <FaMinus
                    onClick={() => updateQuantity(item.id, -1)}
                    className="controlls"
                  />
                  <span className="cart-quantity">{item.quantity}</span>
                  <FaPlus
                    onClick={() => updateQuantity(item.id, 1)}
                    className="controlls"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render cart totals
  const renderCartTotals = () => (
    <div className="cart-total">
      <div className="totals-info">
        <h3 className="total-amount">Total: R{getTotalPrice()}</h3>
        <p className="savings-text">You Saved: R{getTotalSavings()}</p>
      </div>
      <Link to="/checkout" className="checkout">
        Checkout
      </Link>
    </div>
  );

  return (
    <div className="cart-page">
      <SearchHeader placeholder="Search for products..." />
      {cartItems.length === 0 ? renderEmptyCart() : renderCartItems()}
      {cartItems.length > 0 && renderCartTotals()}
    </div>
  );
}

export default Cart;








