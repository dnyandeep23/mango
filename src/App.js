import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import AppContext, { Context } from './utils/context';
import About from './Components/About/About';
import SingleProduct from './Components/SingleProduct/SingleProduct';
import Categories from './Components/Categories/Categories';
import 'tailwindcss/tailwind.css';
import MainProfile from './Components/Profile/MainProfile/MainProfile';
import Order from "./Components/Order/Order";
import Wishlist from './Components/Wishlist/Wishlist';
import Login from './Components/Profile/Login/Login';
import Signup from './Components/Profile/Login/Signup';
import Address from './Components/Profile/Address/Address';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Success from './Components/Cart/Success';
import React, { useState, useLayoutEffect, useContext ,useEffect} from 'react';
import './App.css';
import Failure from './Components/Cart/Failure';
function App() {
  return (
    <div className='scrollbar-hide'>
    <Router>
      <AppContext>    
          <Inner />
      </AppContext>
    </Router></div>
  );
}
function Inner() {
  const [location, setLocation] = useState("");
  const currentPath = useLocation().pathname;
  const { dark ,setDark} = useContext(Context);
  const [newHome, setHome] = useState(false);
  const [pay , setPay] = useState(false);
  useLayoutEffect(() => {
    getBackgroundColor();
  }, [currentPath]);

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDarkMode);
    getBackgroundColor();
    if(currentPath === '/success' || currentPath === '/failure') {
      setPay(true);

    }
    else{
      setPay(false);
    }
  }, []);

  const getBackgroundColor = () => {
    if (currentPath === '/' && !dark) {
      setLocation('bg-gray-300');
      setHome(true)
    } else if (currentPath === '/'&& dark) {
      setLocation('bg-gray-900');
      setHome(true)
    } else if (currentPath === '/login') {
      setLocation('image-login');
      setHome(false)
    } else if (currentPath === '/signup') {
      setLocation('image-login');
      
      setHome(false)
    } else if (currentPath === '/confirmorder') {
      setLocation('kokan');
      setHome(false)
      
    } else if (currentPath === '/confirmorder') {
      setLocation('kokan');
      setHome(false)
      
    } else if (currentPath === '/product') {
      setLocation('bg-gray-300');
      setHome(false)
      
    } else if (currentPath === '/wishlist') {
      setLocation('kokan');
      setHome(false)
    } else if (currentPath === '/about') {
      setLocation('image-about');
      setHome(false)

    }else{
      setHome(false)
    }
  };

  return (
    
    <div className={`${location} min-h-screen  flex flex-col justify-between scrollbar-hide ${dark && "bg-slate-900"  }`}>

      {(!newHome && !pay) && <Header className='z-50' />}
      
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/success" element={<Success /> } />
        <Route path="/failure" element={<Failure /> } />
        <Route path="/about" element={<About className='z-0' />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/address" element={<Address />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/confirmorder" element={<ConfirmOrder />} />
        <Route path="/profile" element={<MainProfile />} />
        <Route path="/category/:id" element={<Categories />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
      </div>
      {!pay && <Footer />}

    </div>
  );
}

export default App;
