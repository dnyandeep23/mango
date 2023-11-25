import React, { useEffect, useContext, useRef } from "react";
import Banner from "../Banner/Banner";
import Products from "./Products";
import Category from "./Category/Category";
import { fetchDataFromAPI } from "../../utils/api";
import { Context } from "../../utils/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import "./Home.css"


const Home = () => {

  const { categories, setCategories, products, setProducts , setsetClient ,setClient } = useContext(Context);
  const productsRef = useRef(null);

  useEffect(()=>{
    if(setClient) {
      toast.success('You have logged in', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setsetClient(false)
    }
  },[setClient]);

  useEffect(()=>{
    getCategory();
    getProducts();
  }, []);

  const getCategory = () => {
    fetchDataFromAPI("/api/categories?populate=*").then((res) => {
      console.log(res);
      setCategories(res);
    });
  };

  const getProducts = () => {
    fetchDataFromAPI("/api/products?populate=*").then((res) => {
      console.log(res);
      setProducts(res);
    });
  };

  const handleBuyNowClick = () => {
    if (productsRef.current) {
      window.scrollTo({
        top: productsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
      <div className="scrollbar-hide">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="mt-16 rounded-full"
      />
      
        <Banner handleBuyNowClick={handleBuyNowClick} className="scrollbar-hide"/>
        {/* <Category categories={categories}  className="scrollbar-hide"/> */}
        <div ref={productsRef} className="scrollbar-hide">
          <Products products={products} HeadingText="Popular Products" className="scrollbar-hide" />
        </div>
      </div>

  );
};

export default Home;
