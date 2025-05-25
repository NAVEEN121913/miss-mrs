import React, { useEffect } from "react";
import Banner1 from "../assets/banner/banner1.png";
import Banner2 from "../assets/banner/banner2.png";
import Banner3 from "../assets/banner/banner3.png";

const Carousel = () => {
  const banners = [
    { src: Banner1, alt: "Slide 1" },
    { src: Banner2, alt: "Slide 2" },
    { src: Banner3, alt: "Slide 3" },
  ];
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    const autoSlide = setInterval(() => {
      const nextButton = document.querySelector(".carousel-control-next");
      if (nextButton) nextButton.click();
    }, 2000);

    return () => clearInterval(autoSlide);
  }, [2000]);

  return (
    <div
      id='carouselExampleIndicators'
      className='carousel slide'
      data-bs-ride='carousel'
      data-aos='zoom-out'
      data-aos-delay='100'>
      <div className='carousel-indicators'>
        {banners.map((_, index) => (
          <button
            key={index}
            type='button'
            data-bs-target='#carouselExampleIndicators'
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}></button>
        ))}
      </div>

      <div className='carousel-inner'>
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={banner.src} className='d-block w-100' alt={banner.alt} />
          </div>
        ))}
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
