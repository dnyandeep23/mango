import React, { useContext } from "react";
import Product from "./Product/Product";
import { useNavigate } from "react-router-dom";
import "./Products.css"
import { Context } from "../../utils/context";


const Products = ({ innerPage, HeadingText, products, buyClick }) => {
  const navigate = useNavigate();
  if (buyClick) {
    navigate("#product");
  }
  const {dark} = useContext(Context);
  
  return (
    <>
      <div
        className={` my-[50px] md:my
        -[75px] p-4 ${dark && "dark"}`}
        id="product"
      >
        {!innerPage && (
          <h1 className="sec-heading mb-5 md:mb-7 text-xl md:text-2xl dark:text-white font-semibold pl-6">
            {HeadingText}
          </h1>
        )}
        <div className="Product  flex  gap-[10px] md:gap-[16px] flex-wrap">
          {products && products.data
            ? products.data.map((item) => (
                <Product key={item.id} id={item.id} data={item.attributes} />
              ))
            : null}
        </div>
      </div>

    </>
  );
};

export default Products;
