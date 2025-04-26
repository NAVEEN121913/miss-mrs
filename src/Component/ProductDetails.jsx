import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <p className='text-center text-red-500'>No Product Data Available</p>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(
      (item) => item.productCode === product.productCode,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");

    navigate("/checkout");
    window.location.reload();
  };

  return (
    <div className='flex flex-col md:flex-row p-6 max-w-5xl mx-auto'>
      {/* Image Section */}
      <div className='md:w-1/2 flex justify-center'>
        <img
          src={product.icon}
          alt={product.title}
          className='w-full max-w-md rounded-lg shadow-lg'
        />
      </div>

      {/* Details Section */}
      <div className='md:w-1/2 p-6'>
        <h2 className='text-3xl font-semibold' style={{ color: "#de4387" }}>
          {product.title}
        </h2>

        <p className='text-2xl font-semibold'>
          {product.price} + Free Shipping
        </p>
        <p className='mt-4 text-gray-700'>{product.description}</p>

        {/* Add to Cart Button */}
        <div className='mt-6'>
          <button
            onClick={addToCart}
            style={{
              color: "#fff",
              background: "#de4387",
              fontSize: "16px",
              padding: "8px 25px",
              borderRadius: "50px",
              transition: "0.3s",
            }}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
