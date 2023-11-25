import React from "react";
import CartItem from "./CartItem/CartItem";
import "./ConfirmOrder.css";
import { Context } from "../../utils/context";
import { useContext, useState } from "react";
import { HiArrowCircleDown, HiArrowCircleUp } from "react-icons/hi";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import axios from "axios";
// import { Input, initTE } from "tw-elements";

const intialaddress = {};

// initTE({ Input });

const ConfirmOrder = () => {
  const formRef = useRef(null);
  const { cartSubtotal, cartItems } = useContext(Context);
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    locality: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternate: "",
    type: "home",
  });
  const [error, seterror] = useState({
    nameerror: "",
    localityerror: "",
    phoneerror: "",
    pincodeerror: "",
    addresserror: "",
    addresstypeerror: "",
    cityerror: "",
    stateerror: "",
    landmarkerror: "",
    alternateerror: "",
  });

  // const [aerror, setAerror] = useState({
  //   Nameerror: false,
  //   Localityerror: false,
  //   Phoneerror: false,
  //   Pincodeerror: false,
  //   Addresserror: false,
  //   Cityerror: false,
  //   Stateerror: false,
  //   Landmarkerror: false,
  //   Alternateerror: false,
  // });

  const [Nameerror, setNameerror] = useState(false);
  const [Localityerror, setLocalityerror] = useState(false);
  const [Phoneerror, setPhoneerror] = useState(false);
  const [Pincodeerror, setPincodeerror] = useState(false);
  const [Addresserror, setAddresserror] = useState(false);
  const [Addresstypeerror, setAddresstypeerror] = useState(false);
  const [Cityerror, setCityerror] = useState(false);
  const [Stateerror, setStateerror] = useState(false);
  const [Landmarkerror, setLandmarkerror] = useState(false);
  const [Alternateerror, setAlternateerror] = useState(false);
  const [noerror, setNoerror] = useState(false);
  const [err, seterr] = useState("");
  const [added, setAdded] = useState(false);
  const [noadded, setNoadded] = useState(false);

  const tax = 15;
  const [selectedOption, setSelectedOption] = useState("home");

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  console.log(cartItems);

  const handlePayment = async () => {
    if (added) {
      setNoadded(false);
      try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {
          products: cartItems,
        });
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setNoadded(true);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setAddress((prevAddress) => ({
      ...prevAddress,
      type: event.target.value,
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    if (name === "name") {
      const isValidName = /^[a-zA-Z\s]+$/.test(value);
      if (value.trim() !== "" && value.length < 3) {
        setNameerror(true);
        setNoerror(true);
        seterror({ ...error, nameerror: "Please enter a valid name" });
      } else if (value.trim() !== "" && !isValidName) {
        setNameerror(true);
        setNoerror(true);
        seterror({
          ...error,
          nameerror: "Name should only contain alphabets and spaces",
        });
      } else {
        setNameerror(false);
        setNoerror(false);
        seterror({ ...error, nameerror: "" });
      }
    }

    if (name === "phone") {
      const isValidMobile = /[789][0-9]{9}/.test(value);
      if (value.trim() !== "" && !isValidMobile) {
        setPhoneerror(true);
        seterror({
          ...error,
          phoneerror: "Please enter a valid mobile number",
        });
      } else {
        setNoerror(false);
        setPhoneerror(false);
        seterror({ ...error, phoneerror: "" });
      }
    }

    if (name === "locality") {
      const isValidLocality = /^[a-zA-Z\s]+$/.test(value);
      if (value.trim() !== "" && value.length < 2) {
        setLocalityerror(true);
        setNoerror(true);
        seterror({ ...error, localityerror: "Please enter a valid locality" });
      } else if (value.trim() !== "" && !isValidLocality) {
        setLocalityerror(true);
        setNoerror(true);
        seterror({
          ...error,
          localityerror: "Locality should only contain alphabets and spaces",
        });
      } else {
        setNoerror(false);
        setLocalityerror(false);

        seterror({ ...error, localityerror: "" });
      }
    }

    if (name === "pincode") {
      const isValidPincode = /^[0-9]{6}$/.test(value);
      if (value.trim() !== "" && !isValidPincode) {
        setPincodeerror(true);
        setNoerror(true);
        seterror({ ...error, pincodeerror: "Please enter a valid pincode" });
      } else {
        setNoerror(false);
        setPincodeerror(false);
        seterror({ ...error, pincodeerror: "" });
      }
    }

    if (name === "address") {
      if (value.trim() !== "" && value.length < 3) {
        setAddresserror(true);
        setNoerror(true);
        seterror({ ...error, addresserror: "Please enter a valid address" });
      } else {
        setNoerror(false);
        setAddresserror(false);
        seterror({ ...error, addresserror: "" });
      }
    }

    if (name === "city") {
      const isValidCity = /^[a-zA-Z\s]+$/.test(value);
      if (value.trim() !== "" && value.length < 3) {
        setCityerror(true);
        setNoerror(true);
        seterror({ ...error, cityerror: "Please enter a valid city" });
      } else if (!isValidCity) {
        setCityerror(true);
        setNoerror(true);
        seterror({
          ...error,
          cityerror: "City should only contain alphabets and spaces",
        });
      } else {
        setCityerror(false);
        setNoerror(false);
        seterror({ ...error, cityerror: "" });
      }
    }

    if (name === "state") {
      if (value.trim() === "") {
        setStateerror(true);
        setNoerror(true);
        seterror({ ...error, stateerror: "Plese select state" });
      } else {
        setStateerror(false);
        setNoerror(false);
        seterror({ ...error, stateerror: "" });
      }
    }

    if (name === "landmark") {
      if (value.trim() !== "" && value.length < 3) {
        setLandmarkerror(true);
        setNoerror(true);
        seterror({ ...error, landmarkerror: "Please enter a valid landmark" });
      } else {
        setLandmarkerror(false);
        setNoerror(false);
        seterror({ ...error, landmarkerror: "" });
      }
    }

    if (name === "addresstype") {
      const isValidCity = /^[a-zA-Z\s]+$/.test(value);
      if (value.trim() !== "" && value.length < 3) {
        setAddresstypeerror(true);
        setNoerror(true);
        seterror({
          ...error,
          addresstypeerror: "Please enter a valid address type",
        });
      } else if (value.trim() !== "" && !isValidCity) {
        setAddresstypeerror(true);
        setNoerror(true);
        seterror({
          ...error,
          addresstypeerror:
            "Address type should only contain alphabets and spaces",
        });
      } else {
        setAddresstypeerror(false);
        setNoerror(false);
        seterror({ ...error, addresstypeerror: "" });
      }
    }

    if (name === "alternate") {
      const isValidMobile = /[789][0-9]{9}/.test(value);
      if (value.trim() !== "" && !isValidMobile) {
        setAlternateerror(true);
        setNoerror(true);
        seterror({
          ...error,
          alternateerror: "Please enter a valid mobile number",
        });
      } else if (value.trim() !== "" && address.phone === value) {
        setAlternateerror(true);
        setNoerror(true);
        seterror({
          ...error,
          alternateerror: "Alternate number must not be same as primary number",
        });
      } else {
        setAlternateerror(false);
        setNoerror(false);
        seterror({ ...error, alternateerror: "" });
      }
    }
  };

  const btnClicked = () => {
    if (
      address.name === "" ||
      address.phone === "" ||
      address.address === "" ||
      address.city === "" ||
      address.pincode === "" ||
      address.state === ""
    ) {
      setNoerror(true);
      seterr("All Fields are mandatory");
      if (address.name === "") {
        setNameerror(true);
        seterror((prevError) => ({
          ...prevError,
          nameerror: "Name must be given",
        }));
      }
      if (address.phone === "") {
        setPhoneerror(true);
        seterror((prevError) => ({
          ...prevError,
          phoneerror: "Phone no must be given",
        }));
      }
      if (address.address === "") {
        setAddresserror(true);
        seterror((prevError) => ({
          ...prevError,
          addresserror: "Address must be given",
        }));
      }
      if (address.city === "") {
        setCityerror(true);
        seterror((prevError) => ({
          ...prevError,
          cityerror: "City must be given",
        }));
      }
      if (address.state === "") {
        setStateerror(true);
        seterror((prevError) => ({
          ...prevError,
          stateerror: "State must be selected",
        }));
      }
      if (address.pincode === "") {
        setPincodeerror(true);
        seterror((prevError) => ({
          ...prevError,
          pincodeerror: "Pin - code must be given",
        }));
      }
    } else {
      setNoerror(false);
      seterr("");
      setClicked(false);
      setAdded(true);
      console.log(address);
    }
  };

  return (
    <>
      <div className="p-4 md:p-8">
        <div className="w-[99%] md:w-[95%] mx-auto rounded-xl p-4 my-8 bg-slate-400 bg-opacity-70">
          <div className="border-b-4 pb-4 ">
            <span className="mx-5 md:mx-10 text-white text-2xl font-bold uppercase font-serif">
              Order Details
            </span>
          </div>
          {noadded ? (
            <div className="flex justify-center items-center bounce">
              <div className="flex items-center">
              <hr className="my-auto mt-4 border-[1px] border-black w-96 " />

              </div>
              <div className="mt-4 px-14 py-1 bg-white  rounded-3xl border-2 border-black min-w-lg flex justify-center">
                <span className="text-red-500 text-xl text-center  ">
                  {" "}
                  Address must be given
                </span>
              </div>
              <div className="flex items-center">
              <hr className="my-auto mt-4 border-[1px] border-black w-96" />

              </div>
            </div>
          ) : null}

          <div className="flex flex-col md:flex-row w-full">
            <div className="mx-auto w-full md:w-[65%]">
              <div className="left bg-slate-300 rounded-2xl p-4 md:p-8 my-4">
                <div className="border-b-2 border-black pb-2">
                  <span className="uppercase text-xl font-serif font-bold ">
                    Products
                  </span>
                </div>
                <div className="mt-4 max-h-64 overflow-y-scroll scrollbar-hide">
                  <CartItem />
                </div>
              </div>
              <div className="left bg-slate-300 rounded-2xl p-4 md:p-8 my-4 ">
                <div className="flex w-full">
                  <div className="flex w-full md:w-[95%] justify-center border-b-2 border-black pb-4">
                    <span className="text-2xl font-serif uppercase font-medium text-center">
                      Address
                    </span>
                  </div>
                  {clicked && !added ? (
                    <HiArrowCircleUp
                      size={25}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  ) : (
                    <HiArrowCircleDown
                      size={25}
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  )}
                </div>

                {clicked && !added ? (
                  <div className="w-full h-fit md:space-y-8">
                    <div className="my-4 md:ml-2 font-serif font-medium">
                      <span className="text-xl ">Address Details</span>
                    </div>
                    {noerror && (
                      <div ref={formRef} className="flex justify-center -p-4">
                        <span className="text-red-600 text-base font-medium">
                          {err}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row w-full  md:px-5 ">
                      <div className="relative md:mx-auto h-10 w-full mb-7 md:mb-0 md:w-[45%]">
                        <input
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Enter your name"
                          type="text"
                          name="name"
                          id="name"
                          value={address.name}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="name"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Name
                        </label>
                        {/* <span>{error.nameerror}</span> */}
                        {Nameerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.nameerror}
                          </span>
                        ) : null}
                      </div>
                      <div className="relative md:mx-auto h-10 w-full mb-3 md:mb-0 md:w-[45%]">
                        <input
                          type="number"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Enter your mobile number"
                          name="phone"
                          id="phone"
                          value={address.phone}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="phone"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Phone no
                        </label>
                        {Phoneerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.phoneerror}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full mt-4  md:px-5">
                      <div className="relative  md:mx-auto h-10  w-full mb-7 md:mb-0 md:w-[45%]">
                        <input
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Enter your pin-code"
                          type="number"
                          value={address.pincode}
                          onChange={handleChange}
                          id="pincode"
                          name="pincode"
                        />
                        <label
                          htmlFor="pincode"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Pin-code
                        </label>
                        {Pincodeerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.pincodeerror}
                          </span>
                        ) : null}
                      </div>
                      <div className="relative  md:mx-auto h-10 w-full mb-7 md:mb-0 md:w-[45%]">
                        <input
                          type="text"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Locality"
                          onChange={handleChange}
                          value={address.locality}
                          name="locality"
                          id="locality"
                        />
                        <label
                          htmlFor="locality"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Locality (Optional)
                        </label>
                        {Localityerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.localityerror}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex w-full md:px-5">
                      <div className="relative  md:mx-auto w-full md:w-[95%]">
                        <textarea
                          type="text"
                          className="peer h-20 w-full rounded-[7px]  border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Address ( street and road )"
                          value={address.address}
                          name="address"
                          id="address"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="address"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Address
                        </label>
                        {Addresserror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.addresserror}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full mt-4 md:px-5">
                      <div className="relative md:mx-auto h-10 w-full mb-8 md:mb-0 md:w-[45%]">
                        <input
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="City / District / Town"
                          onChange={handleChange}
                          value={address.city}
                          name="city"
                          id="city"
                          type="text"
                        />
                        <label
                          htmlFor="city"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          City
                        </label>
                        {Cityerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.cityerror}
                          </span>
                        ) : null}
                      </div>
                      <div className="relative  md:mx-auto h-10 w-full mb-4 md:mb-0 md:w-[45%]">
                        <select
                          className="peer h-full bg-white w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          value={address.state}
                          onChange={handleChange}
                          id="state"
                          name="state"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadar and Nagar Haveli">
                            Dadar and Nagar Haveli
                          </option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                        <label
                          htmlFor="state"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-orange-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Select a State
                        </label>
                        {Stateerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.stateerror}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 w-full  md:px-5">
                      <div className="relative  md:mx-auto h-10 w-full mb-4 md:mb-0 md:w-[45%]">
                        <input
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Enter Landmark"
                          type="text"
                          name="landmark"
                          id="landmark"
                          value={address.landmark}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="landmark"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Landmark (Optional)
                        </label>
                        {Landmarkerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.landmarkerror}
                          </span>
                        ) : null}
                      </div>
                      <div className="relative  md:mx-auto h-10 w-full mb-3 md:mb-0 md:w-[45%]">
                        <input
                          type="number"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                          placeholder="Enter your alternate mobile number"
                          value={address.alternate}
                          name="alternate"
                          id="alternate"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="alternate"
                          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                        >
                          Alternate phone no (optional)
                        </label>
                        {Alternateerror ? (
                          <span className="text-red-500 text-xs md:text-sm">
                            {error.alternateerror}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 w-full md:items-center md:px-5">
                      <div className="mb-[0.125rem] block min-h-[1.5rem] md:pl-[1.5rem]">
                        Address Type :
                      </div>
                      <div className="md:ml-4 h-10 flex flex-col md:flex-row  md:items-center md:space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="home"
                            value="home"
                            checked={selectedOption === "home"}
                            onChange={handleOptionChange}
                            className="form-radio text-orange-600"
                          />
                          <label htmlFor="home" className="ml-2 text-gray-700">
                            Home
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="office"
                            value="office"
                            checked={selectedOption === "office"}
                            onChange={handleOptionChange}
                            className="form-radio text-orange-600"
                          />
                          <label
                            htmlFor="office"
                            className="ml-2 text-gray-700"
                          >
                            Office
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="other"
                            value="other"
                            checked={selectedOption === "other"}
                            onChange={handleOptionChange}
                            className="form-radio text-orange-600"
                          />
                          <label htmlFor="other" className="ml-2 text-gray-700">
                            Other
                          </label>
                          {selectedOption === "other" && (
                            <>
                              <input
                                type="text"
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-orange-500 focus:border-t-orange-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:placeholder:visible placeholder:invisible"
                                placeholder="Address type"
                                onChange={handleChange}
                                value={address.value}
                                name="addresstype"
                                id="addresstype"
                              />
                              <label
                                htmlFor="addresstype"
                                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                              >
                                Other
                              </label>
                              {Addresstypeerror ? (
                                <span className="text-red-500 text-xs md:text-sm">
                                  {error.addresstypeerror}
                                </span>
                              ) : null}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-8">
                      <button
                        className="py-2 px-6 uppercase text-center text-white bg-slate-800 rounded-xl hover:bg-slate-700"
                        onClick={btnClicked}
                      >
                        Deliver here
                      </button>
                    </div>
                  </div>
                ) : null}
                {added && (
                  <div className="w-full h-fit ">
                    <div className="my-4 ml-2 md:ml-4 ">
                      <span className="font-medium text-lg underline cursor-pointer font-serif underline-offset-8">
                        Address
                      </span>
                    </div>
                    <div className="mx-auto w-[98%] md:w-[91%] bg-slate-200 rounded-xl p-4 ">
                      <div className="relative flex justify-end ">
                        <div
                          className=" bg-slate-900 right-0 top-0  rounded-lg p-2 text-white cursor-pointer"
                          onClick={() => {
                            setClicked(true);
                            setAdded(false);
                          }}
                        >
                          <FiEdit size={15} />
                        </div>
                      </div>
                      <div className="flex mt-2 items-center gap-2">
                        <span className="uppercase font-medium text-xs  md:text-base">
                          Name:{" "}
                        </span>
                        <span className="text-xs md:text-base">
                          {address.name}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 gap-2">
                        <span className="uppercase font-medium text-xs  md:text-base">
                          Mobile no:{" "}
                        </span>
                        <span className="text-xs  md:text-base ">
                          {" "}
                          {address.phone + "  " + address.alternate}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 gap-2">
                        <span className="uppercase font-medium text-xs  md:text-base">
                          Address:{" "}
                        </span>
                        <span className="text-xs  md:text-base">
                          {" "}
                          {address.address +
                            " " +
                            address.city +
                            " " +
                            address.state +
                            " " +
                            address.pincode}
                        </span>
                      </div>
                      <div className="flex items-center mt-2 gap-2">
                        <span className="uppercase font-medium text-xs  md:text-base">
                          Address-Type:{" "}
                        </span>
                        <span className="text-xs  md:text-base ">
                          {" "}
                          {address.type}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="right bg-slate-300 rounded-2xl p-8 my-4 h-96 mx-auto w-full md:w-[30%]">
              <div className="pb-8">
                <span className="uppercase text-xl font-serif font-bold">
                  Price Details
                </span>
              </div>
              <div className="subtotal px-[20px] pt-[15px] flex justify-between">
                <span className="text font-medium uppercase text-base">
                  Price :
                </span>
                <span className="text font-semibold text-lg text-orange-700">
                  &#8377; {cartSubtotal}
                </span>
              </div>
              <div className="subtotal px-[20px]  flex justify-between">
                <span className="text font-medium uppercase text-base">
                  Tax :
                </span>
                <span className="text font-semibold text-lg text-orange-700">
                  &#8377; {tax}
                </span>
              </div>
              <div className="subtotal px-[20px]  flex justify-between border-b-2 pb-4 border-black">
                <span className="text font-medium uppercase text-base">
                  Delivery Charges :
                </span>
                <span className="text font-semibold text-lg text-green-700">
                  {/* &#8377; Free */} Free
                </span>
              </div>

              <div className="subtotal px-[20px] py-5  flex justify-between">
                <span className="text font-medium uppercase text-base">
                  Total :
                </span>
                <span className="text font-semibold text-lg text-orange-700">
                  &#8377; {cartSubtotal + tax}
                </span>
              </div>
              <div className="subtotal px-[20px] py-5  flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-20 text-white rounded-lg hover:bg-slate-500 bg-slate-800"
                  onClick={handlePayment}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
