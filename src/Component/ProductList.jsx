import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productData } from "../product";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategory = location.state?.category || "All";

  const handleProductClick = (product) => {
    navigate("/productsDetails", { state: { product } });
  };

  // Group products by category
  const groupedProducts = productData.reduce((groups, product) => {
    const category = product.category || "Uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  // If specific category is selected, only show that
  const categoriesToDisplay =
    selectedCategory === "All"
      ? Object.keys(groupedProducts)
      : [selectedCategory];

  return (
    <section id='services' className='services section light-background'>
      <div className='container section-title' data-aos='fade-up'>
        <span>Our Products</span>
        <h2 style={{ color: "#de4387" }}>Our Products</h2>
      </div>

      <div className='container-sm'>
        <h4>Showing: {selectedCategory} Products</h4>

        {categoriesToDisplay.map((category, catIndex) => (
          <div key={catIndex} style={{ marginBottom: "40px" }}>
            <h3 style={{ marginTop: 20, color: "#19A2A9" }}>{category}</h3>
            <div className='row gy-4'>
              {groupedProducts[category]?.map((product, index) => (
                <div
                  className='col-lg-4 col-md-6 col-6'
                  data-aos='fade-up'
                  data-aos-delay={100 * (index + 1)}
                  onClick={() => handleProductClick(product)}
                  key={index}>
                  <div className='service-item position-relative'>
                    <div>
                      <img
                        src={product.icon}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        marginLeft: 20,
                        marginTop: 30,
                      }}>
                      <p style={{ fontSize: 20 }}>
                        <b>{product.title}</b>
                      </p>
                      <p>{product.category}</p>
                      <p>{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              {groupedProducts[category]?.length === 0 && (
                <p>No products in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
