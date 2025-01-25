import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';
import './CheckOut.css';
import SearchHeader from '../components/SearchHeader';

function Checkout() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      return storedCart || [];
    } catch (error) {
      console.error('Error fetching cart from localStorage:', error.message);
      return [];
    }
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const { user } = useAuth();

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip) {
      alert('Please complete all fields.');
      return;
    }
    
    // Create the order object
    const order = {
      userId: user?.id,  
      items: cartItems,
      total: getTotalPrice(),
      shippingInfo,
      status: 'Pending'
    };

    console.log('Order Details:', order);

    // Proceed with order (you can integrate payment gateway here)
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  return (
    <div className="checkout-page">
      <SearchHeader />
      <h2>Checkout</h2>

      {cartItems.length > 0 ? (
        <div className="checkout-content">
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <form>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
              />
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
              />
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
              />
              <label>Zip Code:</label>
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
              />
            </form>
          </div>

          <div className="checkout-total">
            <h3>Total: ${getTotalPrice()}</h3>
            <button onClick={handleCheckout}>Proceed to Payment</button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. <Link to="/">Shop now</Link></p>
      )}
    </div>
  );
}

export default Checkout;




