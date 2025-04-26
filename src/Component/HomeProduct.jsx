import React from "react";
import { useNavigate } from "react-router-dom";
import { productData } from "../product";

const HomeProductPreview = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate("/productsDetails", { state: { product } });
  };

  const handleViewMore = () => {
    navigate("/productList", { state: { category: "All" } });
  };

  const previewProducts = productData.slice(0, 4); // Show only first 4 products

  return (
    <section id='home-products' className='section light-background'>
      <div className='container section-title' data-aos='fade-up'>
        <span>Top Picks</span>
        <h2 style={{ color: "#de4387" }}>Featured Products</h2>
      </div>
      <div className='container-sm'>
        <div className='row gy-4'>
          {previewProducts.map((product, index) => (
            <div
              className='col-lg-3 col-md-6 col-6'
              data-aos='fade-up'
              data-aos-delay={100 * (index + 1)}
              onClick={() => handleProductClick(product)}
              key={index}>
              <div className='service-item position-relative'>
                <img
                  src={product.icon}
                  alt={product.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <div style={{ textAlign: "left", marginTop: 15 }}>
                  <p>
                    <b>{product.title}</b>
                  </p>
                  <p>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center mt-4'>
          <button
            className='btn'
            onClick={handleViewMore}
            style={{
              backgroundColor: "#de4387",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
            }}>
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeProductPreview;
