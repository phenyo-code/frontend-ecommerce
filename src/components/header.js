import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
 import '@fortawesome/fontawesome-free/css/all.min.css';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import Search from '../pages/Search';
import Footer from './footer';
import Hero from './hero';
import './header.css';

const Header = () => {
  const { activeCategory, changeCategory, activeFilterTabs, setActiveFilterTabs } = useProducts();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);
  const [heroContent, setHeroContent] = useState({ title: 'Have Some FLARE', subtitle: 'Shop the latest trends!' });
  const location = useLocation();

  const categoriesContent = {
    men: { 
      title: "Men's Collection", 
      subtitle: 'Discover style and comfort.', 
      image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/01-03-25_S7_26_M50007327V_Charcoal_CZ_DJ_10-45-50_60479_CM.jpg?v=1736537219&width=600&height=900&crop=center' // Add image path here
    },
    women: { 
      title: "Women's Collection", 
      subtitle: 'Elevate your wardrobe today.', 
      image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/10-06-23Studio3_KT_DB_15-24-26_55_72399JBQ_Heather_P_20319_PXF.jpg?v=1697152211&width=600&height=900&crop=center' // Add image path here
    },
    brands: { 
      title: 'Top Brands', 
      subtitle: 'The best brands, all in one place.', 
      image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // Add image path here
    },
    home: { 
      title: 'Home Essentials', 
      subtitle: 'Revamp your space with style.', 
      image: 'https://images.pexels.com/photos/890669/pexels-photo-890669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' // Add image path here
    },
    jewellery: { 
      title: 'Jewellery Collection', 
      subtitle: 'Shine bright with our accessories.', 
      image: 'https://cdn.shopify.com/s/files/1/0293/9277/products/CroissantMultiRingSet-Gold_MER.jpg?v=1626992777&width=600&height=900&crop=center' // Add image path here
    },
  };
  

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, []);

  useEffect(() => {
    const filters = {
      men: ['New', 'Sale', 'T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
      women: ['New', 'Sale', 'Dresses', 'Tops', 'Jeans', 'Jackets'],
      brands: ['New', 'Sale', 'Nike', 'Adidas', 'Puma', 'Reebok'],
      home: ['Furniture', 'New', 'Sale', 'Decor', 'Lighting', 'Kitchen'],
      jewellery: ['Necklaces', 'Bracelets', 'New', 'Sale', 'Rings', 'Earrings'],
    };

    if (filters[activeCategory]) {
      setIsFiltersLoading(true);
      setTimeout(() => {
        setActiveFilterTabs(filters[activeCategory]);
        setIsFiltersLoading(false);
      }, 300);
    } else {
      setIsFiltersLoading(true);
      setActiveFilterTabs([]);
    }
  }, [activeCategory, setActiveFilterTabs]);

  useEffect(() => {
    setIsCartPage(location.pathname === '/cart');
  }, [location.pathname]);

  useEffect(() => {
    if (categoriesContent[activeCategory]) {
      setHeroContent(categoriesContent[activeCategory]);
    } else {
      setHeroContent({ title: 'Have Some FLARE', subtitle: 'Shop the latest trends!' });
    }
  }, [activeCategory]);

  const handleTabClick = (category) => {
    if (activeCategory !== category) {
      changeCategory(category);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  

  return (
    <header className="header">
      <div className="header-top-row">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">FLARE</span>
          </Link>
        </div>
        <div className="header-icons">
          <Link to="/search">
            <FiSearch className="icon search-icon" />
          </Link>
          <Link to="/cart" className="icon cart-icon-wrapper">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {isMenuOpen ? (
            <FiX onClick={toggleMenu} className="icon fa-x" />
          ) : (
            <FiMenu onClick={toggleMenu} className="icon menu-icon" />
          )}
        </div>
      </div>

      {isSearchOpen ? (
        <Search closeSearch={() => setSearchOpen(false)} />
      ) : (
        <>
          <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  Profile <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={toggleMenu}>
                  Settings <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={toggleMenu}>
                  Cart ({cartCount}) <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" onClick={toggleMenu}> 
                  Wishlist <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/help" onClick={toggleMenu}>
                  Help <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </li>
            </ul>
            <Footer />
          </div>

          {!isCartPage && (
            <div className="header-categories-row">
              <button
                className={`category-tab ${activeCategory === 'women' ? 'active' : ''}`}
                onClick={() => handleTabClick('women')}
              >
                Women
              </button>
              <button
                className={`category-tab ${activeCategory === 'men' ? 'active' : ''}`}
                onClick={() => handleTabClick('men')}
              >
                Men
              </button>
              <button
                className={`category-tab ${activeCategory === 'brands' ? 'active' : ''}`}
                onClick={() => handleTabClick('brands')}
              >
                Brands
              </button>
              <button
                className={`category-tab ${activeCategory === 'home' ? 'active' : ''}`}
                onClick={() => handleTabClick('home')}
              >
                Home
              </button>
              <button
                className={`category-tab ${activeCategory === 'jewellery' ? 'active' : ''}`}
                onClick={() => handleTabClick('jewellery')}
              >
                Jewellery
              </button>
            </div>
          )}

          {!isCartPage && (
            <div className="header-filters-row">
              {isFiltersLoading ? (
                <button className="filter-tab">Loading Filters...</button>
              ) : activeFilterTabs && activeFilterTabs.length > 0 ? (
                activeFilterTabs.map((filter, index) => (
                  <Link
                    key={index}
                    to={{
                      pathname: '/filter',
                      search: `?filter=${filter}&category=${activeCategory}`,
                    }}
                    className="filter-tab"
                  >
                    {filter}
                  </Link>
                ))
              ) : (
                <button className="filter-tab">No Filters Available</button>
              )}
            </div>
          )}

          <Hero title={heroContent.title} subtitle={heroContent.subtitle} Image={heroContent.image} />
        </>
      )}
    </header>
  );
};

export default Header;






























