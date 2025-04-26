import React from "react";
import Carousel from "./Carousel";
import ProductList from "./ProductList";
import BannerWithOverlay from "./Banner";
import HomeProductPreview from "./HomeProduct";

const MainComponent = () => {
  return (
    <>
      {/* <Carousel /> */}
      <BannerWithOverlay />
      {/* <ProductList products={productData} /> */}
      {/* <ProductList /> */}
      <HomeProductPreview />
    </>
  );
};

export default MainComponent;
