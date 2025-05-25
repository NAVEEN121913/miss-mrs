import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { db } from "../firebase"; // Firebase config import
import { ref, onValue } from "firebase/database";
import "./ProductList.css";

const HomeProductPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategoryFromState = location.state?.category || "All";

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryFromState,
  );
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(true);

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.values(data);
        setProductData(productsArray);
      } else {
        setProductData([]);
      }
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProductClick = (product) => {
    navigate("/productsDetails", { state: { product } });
  };

  const categories = ["All", ...new Set(productData.map((p) => p.category))];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (size) => {
    if (size === "All") {
      setSelectedSizes([]);
    } else {
      setSelectedSizes((prev) =>
        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
      );
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseInt(e.target.value));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let filteredProducts = productData
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory,
    )
    .filter((product) =>
      selectedSizes.length > 0 ? selectedSizes.includes(product.size) : true,
    )
    .filter((product) =>
      selectedRatings.length > 0
        ? selectedRatings.includes(product.rating)
        : true,
    )
    .filter((product) =>
      priceRange > 0
        ? parseInt(product.price.replace(/[^\d]/g, "")) <= priceRange
        : true,
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  if (sortOption === "priceLowHigh") {
    filteredProducts.sort(
      (a, b) =>
        parseInt(a.price.replace(/[^\d]/g, "")) -
        parseInt(b.price.replace(/[^\d]/g, "")),
    );
  } else if (sortOption === "priceHighLow") {
    filteredProducts.sort(
      (a, b) =>
        parseInt(b.price.replace(/[^\d]/g, "")) -
        parseInt(a.price.replace(/[^\d]/g, "")),
    );
  } else if (sortOption === "ratingHighLow") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "ratingLowHigh") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id='services' className='services section light-background'>
      <div className='container section-title' data-aos='fade-up'>
        <span>Our Products</span>
        <h2 style={{ color: "#de4387" }}>Our Products</h2>
      </div>

      <div className='container-sm products-container'>
        {isMobile && !showFilters && (
          <button
            className='filter-toggle-btn'
            onClick={() => {
              setShowFilters(true);
              setFiltersApplied(false);
            }}>
            Show Filters
          </button>
        )}

        {(showFilters || !isMobile) && (
          <div className='filter-sidebar'>
            <div className='filter-group'>
              <input
                type='text'
                placeholder='Search Products...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='filter-input'
              />
            </div>

            <div className='filter-group'>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className='filter-input'>
                <option value=''>Sort By</option>
                <option value='priceLowHigh'>Price: Low to High</option>
                <option value='priceHighLow'>Price: High to Low</option>
                <option value='ratingHighLow'>Rating: High to Low</option>
                <option value='ratingLowHigh'>Rating: Low to High</option>
              </select>
            </div>

            <div className='filter-group'>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>Category</p>
              <div className='scrollable'>
                {categories.map((cat, index) => (
                  <div className='filter-item' key={index}>
                    <label>
                      <input
                        type='radio'
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        name='category'
                      />{" "}
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='filter-group'>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>Size</p>
              <div className='scrollable'>
                {sizes.map((size, index) => (
                  <div className='filter-item' key={index}>
                    <label>
                      <input
                        type='checkbox'
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                      />{" "}
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='filter-group'>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>Ratings</p>
              {Array.from({ length: 5 }, (_, i) => 5 - i).map((rating) => (
                <div className='filter-item' key={rating}>
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <input
                      type='checkbox'
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                    />
                    {Array(rating)
                      .fill()
                      .map((_, idx) => (
                        <FaStar key={idx} style={{ color: "#FFD700" }} />
                      ))}
                  </label>
                </div>
              ))}
            </div>

            <div className='filter-group'>
              <p style={{ fontSize: 18, fontWeight: "bold" }}>
                Price Range: ₹0 - ₹{priceRange}
              </p>
              <input
                type='range'
                min='0'
                max='5000'
                step='100'
                value={priceRange}
                onChange={handlePriceChange}
                style={{ width: "100%" }}
              />
            </div>

            {isMobile && (
              <button
                className='apply-filter-btn'
                onClick={() => {
                  setShowFilters(false);
                  setFiltersApplied(true);
                }}>
                Apply
              </button>
            )}
          </div>
        )}

        <div className='products-list'>
          {!isMobile || (!showFilters && filtersApplied) ? (
            currentProducts.length > 0 ? (
              <div className='row gy-4'>
                {currentProducts.map((product, index) => (
                  <div
                    className='col-lg-4 col-md-6 col-6'
                    data-aos='fade-up'
                    data-aos-delay={100 * (index + 1)}
                    onClick={() => handleProductClick(product)}
                    key={index}>
                    <div className='service-item position-relative'>
                      <img
                        src={product.icon}
                        alt={product.title}
                        className='product-image'
                      />
                      <div className='product-details'>
                        <p className='product-title'>{product.title}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h5>No Products Found.</h5>
            )
          ) : (
            <h5>Please Apply Filters to View Products</h5>
          )}
        </div>
      </div>

      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={`page-btn ${currentPage === num ? "active" : ""}`}>
            {num}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HomeProductPreview;
