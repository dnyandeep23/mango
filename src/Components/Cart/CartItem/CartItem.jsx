import React from "react";
import img from "../../../assets/bg.png";
import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../../utils/context";

const CartItem = () => {
  const { cartItems, handleRemoveCart, handleCartProductQuantity ,dark} =
    useContext(Context);
  return (
    <div className={`${dark && "dark"}cart-products flex-grow`}>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="cart-product  px-4 py-[15px] flex gap-10 hover:bg-[rgba(0,0,0,0.3)] border-b-2"
        >
          <div className="img-container bg-[rgba(0,0,0,0.2)] w-[60px] h-[60px] flex-shrink-0">
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                item.attributes.img.data[0].attributes.url
              }
              className="w-full h-full"
              alt=""
            />
          </div>
          <div className="product-details w-full overflow-hidden relative ">
            <div className="flex  justify-between items-center dark:text-white">
              <span className="text-ellipsis whitespace-nowrap dark:text-white overflow-hidden text-sm mb-2 font-medium block pr-[25px]">
                {item.attributes.title}
              </span>
              <MdClose onClick={() => handleRemoveCart(item)} />
            </div>

            <div className="quantity-buttons w-fit flex border-2 mr-[10px] h-7">
              <span
                className="text-xl w-7 flex justify-center dark:text-white items-center cursor-pointer border-r-2"
                onClick={() => handleCartProductQuantity("dec", item)}
              >
                -
              </span>
              <span className="text-xl w-7 flex justify-center dark:text-white items-center">
                {item.attributes.quantity}
              </span>
              <span
                className="text-xl w-7 flex justify-center items-center dark:text-white cursor-pointer border-l-2"
                onClick={() => handleCartProductQuantity("inc", item)}
              >
                +
              </span>
            </div>
            <div className="text flex items-center gap-1 text-lg font-bold pt-4">
              <span className="text-sm w-7 flex justify-center dark:text-white items-center ">
                {item.attributes.quantity}
              </span>
              <span className="text-sm w-7 flex justify-center dark:text-white items-center ">
                x
              </span>
              <span className="text-sm w-7 flex justify-center items-center dark:text-orange-500 text-orange-700">
                &#8377;{item.attributes.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
