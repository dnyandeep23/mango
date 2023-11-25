import React, { useState, useEffect, useContext, useRef } from "react";
import { IoPersonCircle } from "react-icons/io5";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import Cart from "../Cart/Cart";
import Search from "./Search";
import "./Header.css";
import Profile from "../Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";

import Wishlist from "../Wishlist/Wishlist";
import { Context } from "../../utils/context";
import CartItem from "../Cart/CartItem/CartItem";

const Header = () => {
  const [isOpen, setopen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { cartCount, newClient, dark, setDark, handleDark } =
    useContext(Context);
  const profileRef = useRef(null);
  // const location = useLocation();

  const toggleDropdown = () => {
    setopen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
      setShowSearch(false);
      setShowSearch(false);
      setopen(false);
    } else {
      setScrolled(false);
    }
  };

  return (
    <>
      <div className={`${dark ? "dark" : ""}`}>
        <nav
          className={`bg-gray-500 outline-none bg-opacity-0 main-header ${
            scrolled ? "sticky-header bg-opacity-80" : ""
          } z-40`}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center py-1">
              <div
                className="group hamburger inline-block p-4 space-y-2 cursor-pointer md:hidden"
                onClick={toggleDropdown}
              >
                <div className="space-y-2">
                  <span class="block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                  <span class="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                </div>
              </div>
              {isOpen && (
                <ul className="z-50 absolute top-0 left-0 mt-12 ml-4 bg-gray-500 text-black dark:text-white rounded-lg">
                  <li>
                    <div
                      className="block hover:bg-orange-500 py-2  px-20 rounded-lg"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Home
                    </div>
                  </li>
                  <li>
                    <div
                      className="block hover:bg-orange-500 py-2 px-20 rounded-lg"
                      onClick={() => navigate("/about")}
                    >
                      About
                    </div>
                  </li>
                  <li>
                    <div
                      className="block hover:bg-orange-500 py-2 px-20 rounded-lg"
                      onClick={() => {
                        setShowCart(true);
                      }}
                    >
                      Cart
                    </div>
                  </li>
                  <li>
                    <div
                      className="block hover:bg-orange-500 py-2 px-20 rounded-lg"
                      onClick={() => navigate("/wishlist")}
                    >
                      Wishlist
                    </div>
                  </li>
                  <li>
                    <div className="block hover:bg-orange-500 py-2 px-20 rounded-lg">
                      Profile
                    </div>
                  </li>
                </ul>
              )}
              <div
                className="text-white font-bold text-lg"
                onClick={() => navigate("")}
              >
                Logo
              </div>
              <div className="flex gap-3 text-white md:hidden pr-2">
                {dark ? (
                  <MdOutlineDarkMode
                    size={25}
                    className={`${clicked && "day"}`}
                    onClick={() => {
                      setDark(!dark);
                      setClicked(true);
                    }}
                  />
                ) : (
                  <MdOutlineLightMode
                    size={25}
                    className={`${clicked && "day"}`}
                    onClick={() => {
                      setDark(!dark);
                      setClicked(true);
                    }}
                  />
                )}

                <AiOutlineSearch
                  size={28}
                  onClick={() => {
                    setShowSearch(true);
                  }}
                />
                <IoPersonCircle
                  size={28}
                  onClick={() => {
                    setShowProfile(!showProfile);
                  }}
                />
              </div>
              <ul className="hidden md:flex space-x-4">
                <li className="visited">
                  <div
                    className="visit text-white hover:bg-orange-500 hover:underline hover:underline-offset-8 p-4 block rounded-lg"
                    onClick={() => {
                      setDark(!dark);
                      setClicked(true);
                    }}
                  >
                    {dark ? (
                      <MdOutlineDarkMode
                        size={25}
                        className={`${clicked && "day"}`}
                      />
                    ) : (
                      <MdOutlineLightMode
                        size={25}
                        className={`${clicked && "day"}`}
                      />
                    )}
                  </div>
                </li>
                <li>
                  <div
                    className="visit text-white  hover:bg-orange-500 hover:underline hover:underline-offset-8 p-4 block rounded-lg"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </div>
                </li>
                <li>
                  <div
                    className="visit text-white hover:bg-orange-500 hover:underline hover:underline-offset-8 p-4 block rounded-lg"
                    onClick={() => navigate("/about")}
                  >
                    About
                  </div>
                </li>
                <li>
                  <div
                    className=" visit text-white hover:bg-orange-500 p-4 block rounded-lg"
                    onClick={() => {
                      setShowSearch(true);
                    }}
                  >
                    <AiOutlineSearch size={25} />
                  </div>
                </li>
                <li>
                  <div
                    className="visit text-white hover:bg-orange-500 p-4 block rounded-lg"
                    onClick={() => {
                      setShowCart(true);
                    }}
                  >
                    <div className="relative">
                      <AiOutlineShoppingCart size={25} />
                      {cartCount > 0 && (
                        <div className="absolute -top-4 -right-4 bg-red-500 text-xs rounded-full px-2 py-1">
                          {cartCount}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className="visit text-white hover:bg-orange-500 p-4 block rounded-lg"
                    onClick={() => navigate("/wishlist")}
                  >
                    <AiOutlineHeart size={25} />
                  </div>
                </li>
                <li>
                  <div
                    className="visit text-white hover:bg-orange-500 p-4 w-16 overflow-hidden block rounded-lg"
                    onClick={() => {
                      setShowProfile(!showProfile);
                    }}
                  >
                    <IoPersonCircle size={25} />
                    {newClient && (
                      <div className="">
                        <span className="text-center text-[12px] text-ellipsis">
                          {newClient.email}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {showCart && <Cart setShowCart={setShowCart} />}
        {scrolled && (showSearch || showProfile) && (
          <div className="sticky top-3 z-50">
            {window.scrollTo(0, 0)}
            {showSearch && (
              <Search
                setShowSearch={setShowSearch}
                className="z-50"
                scrolled={scrolled}
              />
            )}
            {showProfile && <Profile setShowProfile={setShowProfile} />}
          </div>
        )}

        {showSearch && (
          <Search
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            className="z-50"
            scrolled={scrolled}
          />
        )}
        {showProfile && <Profile setShowProfile={setShowProfile} />}
      </div>
    </>
  );
};

export default Header;
