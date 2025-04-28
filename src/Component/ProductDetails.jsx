import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [mainImage, setMainImage] = useState(product?.icon);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (product?.size.length === 1) {
      setSelectedSize(product.size[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <p className='text-center text-red-500'>No Product Data Available</p>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(
      (item) =>
        item.productCode === product.productCode &&
        item.selectedSize === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");

    navigate("/checkout");
    window.location.reload();
  };

  return (
    <div className='flex flex-col md:flex-row p-6 max-w-5xl mx-auto'>
      {/* Image Section */}
      <div className='md:w-1/2 flex flex-col items-center'>
        <img
          src={mainImage}
          alt={product.title}
          className='w-full max-w-md rounded-lg shadow-lg mb-4'
        />

        {/* Alternative Images */}
        {/* {product.alternativeImages.length > 0 && (
          <div className='flex gap-4 mt-4'>
            {product.alternativeImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Alternative ${index + 1}`}
                onClick={() => setMainImage(img)}
                className='w-16 h-16 object-cover rounded cursor-pointer border-2 border-gray-300 hover:border-pink-400'
              />
            ))}
          </div>
        )} */}
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

        {/* Size Selection */}
        <div className='mt-4'>
          <p className='text-lg font-medium mb-2'>Select Size:</p>
          <div className='flex flex-wrap gap-3'>
            {product.size.map((sizeOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(sizeOption)}
                className={`px-4 py-2 rounded-full border-2 ${
                  selectedSize === sizeOption
                    ? "border-pink-400 text-pink-600 font-bold"
                    : "border-gray-300 text-gray-600"
                } hover:border-pink-400 hover:text-pink-500`}>
                {sizeOption}
              </button>
            ))}
          </div>
          {/* Show selected size if available */}
          {selectedSize && (
            <p className='mt-2 text-green-600 font-medium'>
              Selected Size: {selectedSize}
            </p>
          )}
        </div>

        {/* Alternative Images again (Above Add to Cart) */}
        {product.alternativeImages.length > 0 && (
          <div className='flex gap-4 mt-6'>
            {product.alternativeImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Alternative ${index + 1}`}
                onClick={() => setMainImage(img)}
                className='w-16 h-16 object-cover rounded cursor-pointer border-2 border-gray-300 hover:border-pink-400'
              />
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <div className='mt-6'>
          <button
            onClick={addToCart}
            style={{
              color: "#fff",
              background: "#de4387",
              fontSize: "16px",
              padding: "10px 30px",
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
