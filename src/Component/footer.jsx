import React from "react";

const Footer = () => {
  return (
    <footer className='bg-gray-100 text-center p-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <p className='mt-4 text-gray-700 text-sm sm:text-base'>
          Explore elegant, affordable fashion at <b>Miss and Mrs Collection</b>{" "}
          — perfect for gifts or your unique style!
        </p>

        <div className='mt-6 text-sm sm:text-base'>
          <h2 className='font-semibold text-lg sm:text-xl'>Contact Us</h2>
          <p className='text-gray-700 mt-2'>
            Greams Dugar, 6th Floor, New No.64, Old No.149, Greams Road,
            Thousand Lights West, Chennai, Tamil Nadu – 600006
          </p>
          <p className='text-gray-700 mt-2'>
            Mail Us:{" "}
            <span className='text-blue-500 break-all'>
              niranjana20052008@gmail.com
            </span>
          </p>
          <p className='text-gray-700 mt-2'>
            Call Us: <span className='text-blue-500'>+91 63813 22301</span>
          </p>
        </div>

        <div className='mt-6 flex justify-center gap-6 text-2xl'>
          <i className='bi bi-facebook text-gray-600 hover:text-black'></i>
          <i className='bi bi-instagram text-gray-600 hover:text-black'></i>
          <i className='bi bi-twitter-x text-gray-600 hover:text-black'></i>
        </div>

        <p className='mt-6 text-gray-600 text-xs sm:text-sm'>
          ©2025 WAND INFO TECH SOLUTION | Designed and Developed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
