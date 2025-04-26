import React, { useEffect } from "react";
import Banner1 from "../assets/banner/banner1.png";
import Banner2 from "../assets/banner/banner2.png";
import Banner3 from "../assets/banner/banner3.png";

const Carousel = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    const interval = setInterval(() => {
      const nextButton = document.querySelector(".carousel-control-next");
      if (nextButton) {
        nextButton.click(); // Simulate clicking the "Next" button
      }
    }, 2000); // 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      id='carouselExampleIndicators'
      className='carousel slide'
      data-bs-ride='carousel'
      data-aos='zoom-out'
      data-aos-delay='100'>
      <div className='carousel-indicators'>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='0'
          className='active'
          aria-current='true'
          aria-label='Slide 1'></button>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='1'
          aria-label='Slide 2'></button>
        <button
          type='button'
          data-bs-target='#carouselExampleIndicators'
          data-bs-slide-to='2'
          aria-label='Slide 3'></button>
      </div>
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img src={Banner1} className='d-block w-100' alt='Slide 1' />
        </div>
        <div className='carousel-item'>
          <img src={Banner2} className='d-block w-100' alt='Slide 2' />
        </div>
        <div className='carousel-item'>
          <img src={Banner3} className='d-block w-100' alt='Slide 3' />
        </div>
      </div>

      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='prev'>
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleIndicators'
        data-bs-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};

export default Carousel;
