import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import "./Product.css"
import { Context } from '../../../utils/context';


const Product = ({id,data})=> {
  const navigate = useNavigate();
  const{dark} = useContext(Context)
  return (
    <>
    <div className={`product-card  px-4 m-auto ${dark && "dark"}`} onClick={()=>{navigate("/product/"+id)}} >
        <div className='thumbnail w-full h-[180px] bg-opacity-20 md:h-[350px] rounded-lg bg-gray-200  mb-[10px] p-6 flex items-center'>
            <img src={process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url} className='w-[100%] block hover:scale-110 z-10' alt="" />        </div>
        <div className='product-details p-2'>
            <span className="name text-base block text-ellipsis whitespace-nowrap dark:text-white overflow-hidden font-medium">{data.title}</span>
            <span className="name text-base md:text-lg font-bold dark:text-white">&#8377;{data.price}</span>
        </div>
    </div>

    </>
  )
}

export default Product