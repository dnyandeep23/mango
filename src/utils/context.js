import React, { createContext, useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'
export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [user, setUser] = useState();
  const location = useLocation();
  const [wishlistItems, setWishListItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [newClient, setnewClient] = useState([])
  const [newsetClient, setnewsetClient] = useState(false)
  const [setClient, setsetClient] = useState(false);
  const [client,setclient] = useState(false);
  const [dark, setDark] = useState(false);
  
  // console.log(wishlistItems);
  const [wishlistComItems, setWishlistComItems] = useState([
  ]);

  
  useEffect(() =>{
    window.scrollTo(0,0);
  },[location]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.forEach((item) => (subTotal += item.attributes.price * item.attributes.quantity));
    setCartSubtotal(subTotal);
  }, [cartItems]);


  const removeItem = (itemId) => {
    const updatedItems = wishlistItems.filter((item) => item.id !== itemId);
    setWishListItems(updatedItems);
  };

  const handleMouseEnter = (itemId) => {
    setWishListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, hovered: true } : item
      )
    );
  };
  
  const handleMouseLeave = (itemId) => {
    setWishListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, hovered: false } : item
      )
    );
  };

  const handleDark = ()=>{
    setDark(!dark)
  }
  const handleWishList = (product) => {
    if (newsetClient) { 
      setWishListItems((prevWishListItems) => [...prevWishListItems, product]);
      return true;
    } else {
      return false;
    }
  };

  
  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      product.attributes.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  const handleRemoveCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);
    if (type === 'inc') {
      items[index].attributes.quantity += 1;
    } else if (type === 'dec') {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubtotal,
        setCartSubtotal,
        handleAddToCart,
        handleRemoveCart,
        handleCartProductQuantity,
        user,
        setUser,
        removeItem,
        handleMouseEnter,
        handleWishList,
        handleMouseLeave,
        wishlistItems,
        setWishListItems,
        newClient,setnewClient,
        wishlistComItems,
        setWishlistComItems,
        newsetClient,
        setnewsetClient,
        wishlist,
        setWishlist,
        setClient,
        setsetClient,setDark,dark,handleDark,client,setclient

      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
