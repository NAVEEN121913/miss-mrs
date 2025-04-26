import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Carousel from "./Component/Carousel";
import ProductList from "./Component/ProductList.jsx";
import Footer from "./Component/footer";
import ProductDetails from "./Component/ProductDetails.jsx";
import MainComponent from "./Component/MainComponent.jsx";
import Checkout from "./Component/Checkout.jsx";
import { initializeApp } from "firebase/app";
import Shop from "./admin.js";

const App = () => {
  return (
    <Router>
      <div className='index-page'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path='/' element={<MainComponent />} />
            <Route path='/productsDetails' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/productList' element={<ProductList />} />
            <Route path='/admin' element={<Shop />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
