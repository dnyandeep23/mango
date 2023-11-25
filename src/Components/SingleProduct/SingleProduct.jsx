import React, { useEffect } from "react";
import { useState } from "react";
import RelatedProducts from "./RelatedProducts";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import { Context } from "../../utils/context";
import { useContext } from "react";

import { useParams } from "react-router-dom";

import { IoMdShareAlt } from "react-icons/io";
import useFetch from "../../hook/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "../Wishlist/Wishlist";

const SingleProduct = () => {
  const [wish, setWish] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const { handleAddToCart, handleWishList, wishlistItems, removeItem, dark } =
    useContext(Context);

  useEffect(() => {
    const isProductInWishlist = wishlistItems.some(
      (item) => item.id.toString() === id
    );
    setWish(isProductInWishlist);
  }, [wishlistItems, id]);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) {
        return 1;
      } else {
        return prevState - 1;
      }
    });
  };

  useEffect(() => {});

  // console.log(data);

  if (!data) return;

  const product = data.data[0].attributes;

  const handleclick = () => {
    const w = handleWishList({ product, id: id });

    if (!w) {
      toast.error("Login is required to add product to your wishlist", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setWish(!wish);
      // handleWishList({ product, id: id });
    }
  };

  const handleShare = (platform) => {
    // Implement your sharing functionality for each platform here
    switch (platform) {
      case "facebook":
        // Code to share on Facebook
        break;
      case "twitter":
        // Code to share on Twitter
        break;
      case "instagram":
        // Code to share on Instagram
        break;
      case "linkedin":
        // Code to share on LinkedIn
        break;
      case "pinterest":
        // Code to share on Pinterest
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`single-product-main-content m-[20px] md:m-[65px] ${
        dark ? "dark" : ""
      }`}
    >
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
      <div className="bg-slate-400 rounded-lg">
        <div className="absolute top-25 right-6 lg:right-[260px] mt-12 p-2 bg-zinc-200  rounded-full object-center">
          <IoMdShareAlt
            size={30}
            onClick={() => {
              setShowShare(!showShare);
            }}
            className="z-10 hover:scale-125"
          />
          {showShare && (
            <div className="flex flex-col items-center justify-center gap-4">
              <FaFacebookF
                size={20}
                className="hover:text-blue-500 hover:scale-125 mt-4"
              />
              <FaTwitter
                size={20}
                className="hover:text-sky-500 hover:scale-125 "
              />
              <FaInstagram
                size={20}
                className="hover:text-pink-500 hover:scale-125 "
              />
              <FaLinkedinIn
                size={20}
                className="hover:text-blue-700 hover:scale-125 "
              />
              <FaPinterest
                size={20}
                className="hover:text-red-500 hover:scale-125 "
              />
              <LuCopy
                size={20}
                className="hover:text-white hover:scale-125 mb-4"
              />
            </div>
          )}
        </div>
        <div className="absolute top-25 right-20 lg:right-[310px] mt-12 p-2 bg-zinc-200  rounded-full object-center z-20 ">
          {wish ? (
            <AiFillHeart
              size={30}
              className="text-red-500 hover:scale-125"
              onClick={() => {
                setWish(!wish);
                removeItem(id);
              }}
            />
          ) : (
            <AiOutlineHeart
              size={30}
              className="hover:scale-125"
              onClick={() => {
                handleclick();
              }}
            />
          )}
        </div>
        <div className="layout max-w-[calc(100% - 20px)] m-auto md:max-w-[1200px] ">
          <div className="single-product-page flex flex-col lg:flex-row">
            <div className="left w-full bg-[rgba(0,0,0,0.05)] flex-shrink-0 md:w-[600px] md:h-[600px] m-14 rounded-2xl">
              <img
                src={
                  process.env.REACT_APP_DEV_URL +
                  product.img.data[0].attributes.url
                }
                className="w-11/12 block"
                alt=""
              />
            </div>
            <div className="right flex flex-col pt-[20px] md:p-[35px]">
              <span className="name text-lg mb-[20px] md:text-xl dark:text-white">
                {product.title}
              </span>
              <span className="price text-xl mb-[22px] dark:text-white">
                &#8377; {product.price}
              </span>
              <span className="desc text-lg mb-[20px] text-slate-500 dark:text-slate-300">
                {product.desc}
              </span>
              <div className="cart-buttons flex md:mt-[30px]">
                <div className="quantity-buttons w-fit flex border-2 mr-[10px] h-10 rounded-lg">
                  <span
                    className="text-xl w-10 bg-[rgba(0,0,0,0.2)] flex justify-center items-center border-r-2 dark:text-white"
                    onClick={decrement}
                  >
                    -
                  </span>
                  <span className="text-xl w-10 flex justify-center items-center rounded-xl dark:text-white">
                    {quantity}
                  </span>
                  <span
                    className="text-xl w-10 bg-[rgba(0,0,0,0.2)] flex justify-center items-center border-l-2 dark:text-white"
                    onClick={increment}
                  >
                    +
                  </span>
                </div>
                <button
                  className="add-to-cart-button outline-0 border-0 h-[40px] w-[180px] flex justify-center items-center cursor-pointer text-lg text-white bg-orange-500 bottom-3 flex-grow md:flex-grow-0 hover:opacity-80 rounded-lg  "
                  onClick={() => {
                    handleAddToCart(data.data[0], quantity);
                    setQuantity(1);
                  }}
                >
                  ADD TO CART
                </button>
              </div>

              <span className="divider my-5 h-[1px] w-full bg-[rgba(0,0,0,0.1)]" />
              <div className="info-item">
                <span className="text-bold text-lg block mb-5 dark:text-white">
                  Category :
                  <span className="text-base font-medium cursor-pointer text-[rgba(0,0,0,1)] dark:text-white">
                    {" "}
                    {product.categories.data[0].attributes.title}
                  </span>
                </span>
                <span className="text-bold text-lg flex items-center dark:text-white mb-5">
                  Share:
                  <span className="social-icons font-medium flex gap-4 cursor-pointer text-[rgba(0,0,0,1)] dark:text-white">
                    <FaFacebookF
                      size={20}
                      onClick={() => handleShare("facebook")}
                      className="hover:text-blue-700"
                    />
                    <FaTwitter
                      size={20}
                      onClick={() => handleShare("twitter")}
                      className="hover:text-blue-700"
                    />
                    <FaInstagram
                      size={20}
                      onClick={() => handleShare("instagram")}
                      className="hover:text-blue-700"
                    />
                    <FaLinkedinIn
                      size={20}
                      onClick={() => handleShare("linkedin")}
                      className="hover:text-blue-700"
                    />
                    <FaPinterest
                      size={20}
                      onClick={() => handleShare("pinterest")}
                      className="hover:text-blue-700"
                    />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <RelatedProducts productId={id} categoryId={product.categories.data[0].id}/> */}
      </div>
    </div>
  );
};

export default SingleProduct;
