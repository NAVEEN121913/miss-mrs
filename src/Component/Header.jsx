import React, { useEffect, useState } from "react";
import { productData } from "../product";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/new_logo.png";
import "../App.css";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalCount);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    navigate("/productList", { state: { category } });
  };

  return (
    <header
      id='header'
      className={`header d-flex align-items-center sticky-top scrolled`}>
      <div className='container-fluid container-xl position-relative d-flex align-items-center'>
        <a
          href='/'
          className='logo d-flex align-items-center me-auto no-underline'>
          <img
            src='https://wandinfotech.s3.us-east-1.amazonaws.com/logo/logo+miss+and+mrs.jpg'
            alt='Logo'
          />
        </a>
        <nav id='navmenu' className='navmenu'>
          <ul>
            <li>
              <a className='active no-underline'>Home</a>
            </li>
            <li>
              <a className='no-underline'>About</a>
            </li>
            <li className='dropdown'>
              <a className='no-underline'>
                <span>Product</span>{" "}
                <i className='bi bi-chevron-down toggle-dropdown'></i>
              </a>
              <ul>
                <li>
                  <a
                    className='no-underline'
                    onClick={() => handleCategoryClick("All")}>
                    All
                  </a>
                </li>
                {Array.from(
                  new Set(productData.map((data) => data.category)),
                ).map((category, i) => (
                  <li key={i}>
                    <a
                      className='no-underline'
                      onClick={() => handleCategoryClick(category)}>
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a className='no-underline'>Contact</a>
            </li>
          </ul>
        </nav>
        <a
          className='btn-getstarted no-underline'
          onClick={() => navigate("/checkout")}>
          <i className='bi bi-cart' style={{ marginRight: 5 }}></i> Cart
          {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
        </a>
      </div>
    </header>
  );
};

export default Header;
