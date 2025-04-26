import React from "react";
import { useNavigate } from "react-router-dom";

const BannerWithOverlay = () => {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate("/productList", { state: { category: "All" } });
  };

  return (
    <div className='relative w-full h-[600px]'>
      {/* Banner Image */}
      <img
        src='https://wandinfotech.s3.us-east-1.amazonaws.com/372390931276443657.png' // replace with your image URL
        alt='Banner'
        className='w-full h-full object-cover'
      />

      {/* Overlay Text + Button */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40'>
        <h1 className='text-3xl md:text-5xl font-bold mb-4'>
          Grace in Every Thread
        </h1>
        <button
          className='bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition'
          onClick={handleViewMore}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default BannerWithOverlay;
