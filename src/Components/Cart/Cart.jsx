import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { FaTruckArrowRight } from "react-icons/fa6";
import "./Cart.css";

// import{loadStripe} from '@stripe/stripe-js'
// import { makePaymentRequest } from '../../utils/api';

const Cart = ({ setShowCart }) => {
  const { cartItems, cartSubtotal, newsetClient ,setclient, dark} = useContext(Context);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  // const [pay,setPay] = useState(false);
  // const stripePromise = loadStripe(
  //     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  // );
  // const handlePayment = async () => {
  //     try{
  //         const stripe = await stripePromise;
  //         const res = await makePaymentRequest.post("/api/orders", {
  //             products: cartItems,
  //         });
  //         await stripe.redirectToCheckout({
  //             sessionId: res.data.stripeSession.id
  //         });
  //     }catch(e){
  //         console.log(e);
  //     }
  // }

  const handleClick = () => {
    if (newsetClient) {
      setTimeout(() => {
        setClicked(true);
      }, 10000);

      navigate("/confirmorder");
      setShowCart(false);
    } else {
      navigate("/login");
      setShowCart(false);
      setclient(true);
    }
  };
  return (
    <>
      <div className={`${dark && "dark"} cart-panel fixed top-0 left-0 w-full h-full flex justify-end z-[99]`}>
        <div
          className="left bg-[rgba(0,0,0,0.2)] absolute w-0 md:w-[55%]  lg:w-[75%] h-full top-0 left-0"
          onClick={() => setShowCart(false)}
        ></div>
        <div className="right w-full md:w-[45%] lg:w-[25%] rounded-xl h-full bg-white dark:bg-gray-800 relative z-[1] flex flex-col">
          <div className="cart-header flex  max-w-sm mx-auto mb-5 border-b-2 py-4 justify-center items-center mt-6">
            <span className="heading font-serif font-bold  text-2xl dark:text-white ">
              Shopping Cart
            </span>
            <span
              className="close-btn flex cursor-pointer pl-28 dark:text-white"
              onClick={() => {
                setShowCart(false);
              }}
            >
              <MdClose size={25} />
            </span>
          </div>
          {!cartItems?.length && (
            <div className="empty-cart flex flex-col items-center gap-10 mt-20 ">
              <BsCartX size={150} className="text-gray-400 dark:text-white" />
              <span className="dark:text-white">Your Cart is empty</span>
              <button className="return-cta p-4 bg-orange-500 rounded-lg hover:bg-yellow-600 dark:text-white">
                RETURN TO SHOP
              </button>
            </div>
          )}
          <>
            {!!cartItems?.length && (
              <>
                <CartItem />
                <div className="cart-footer absolute bottom-0 w-full border-t-2">
                  <div className="subtotal px-[20px] py-[15px] flex justify-between">
                    <span className="text font-bold text-md dark:text-white">
                      Cart subtotal:
                    </span>
                    <span className="text text-orange-700 dark:text-orange-500">
                      &#8377;{cartSubtotal}
                    </span>
                  </div>
                  <div className="button flex justify-center border-t-2 py-4 ">
                    <button
                      className={`p-4 px-20 bg-slate-800 dark:bg-slate-400 dark:hover:bg-slate-600 rounded-lg hover:bg-slate-600 flex items-center ${
                        clicked ? "move-icon clicked" : "move-icon"
                      }`}
                      onClick={handleClick}
                    >
                      <FaTruckArrowRight
                        size={30}
                        className={`${
                          clicked ? "move-icon clicked" : "move-icon"
                        } text-white`}
                      />{" "}
                      <span className="text-white ml-10 focus:hidden uppercase">
                        Place Order
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};
export default Cart;
