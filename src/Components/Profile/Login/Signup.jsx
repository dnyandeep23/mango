import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    // username: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const countryCodes = [{ value: "+91", label: "+91 (India)" }];

  const [display, setDisplay] = useState(false);
  const [error, seterror] = useState("");
  const [Aerror, setAerror] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  // const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [EmailFound, setEmailFound] = useState(false);
  const [Client, setClient] = useState();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      await axios
        .get(`http://localhost:1337/api/clients?email=${formData.email}`)
        .then((response) => {
          setClient(response.data);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    if (Client) {
      const users = Client?.data?.data ?? [];
      const newEmails = users
        .map((user) => user?.attributes?.email)
        .filter((email) => email);
      setEmails((prevEmails) => [...prevEmails, ...newEmails]);
    }
  }, [Client]);

  useEffect(() => {
    // console.log(emails);
    console.log(emails.length);
  }, [emails]);

  const register = async () => {
    if(formData.email==="" || formData.password=== "" || formData.confirmPassword==="" || formData.mobile=== ""){
      setAerror(true);
      seterror("All fields are required");
    }
    else if (!Aerror) {
      setDisplay(false);
      try {
        for (let i = 0; i < emails.length; i++) {
          if (emails[i] === formData.email) {
            setAerror(true);
            setEmailFound(true);
            seterror("Email already exists. Please use a different email.");
            const offset = 100;
            window.scrollTo({
              top: formRef?.current?.offsetTop - offset,
              behavior: "smooth",
            });
            return;
          }
        }

        if (!EmailFound) {
          await axios
            .post(process.env.REACT_APP_DEV_URL+"/api/clients", {
              data: {
                password: formData.password,
                email: formData.email,
                mobile: formData.mobile,
              },
            })
            .then((res) => {
              setDisplay(true);
              console.log(res);
              navigate("/login");
            });
        }
      } catch (error) {
        console.log(error);
        setAerror(error);
        seterror("Email already exists. Please use a different email.");
        const offset = 100;
        window.scrollTo({
          top: formRef?.current?.offsetTop - offset,
          behavior: "smooth",
        });
      }
    } else {
      setDisplay(false);
      setAerror(true);
      // seterror("Please solve the occurred error");
      if (error === "Email already exists. Please use a different email.") {
        seterror("Email already exists. Please use a different email.");
      }
      const offset = 100;
      window.scrollTo({
        top: formRef?.current?.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "mobile") {
      const isValidMobile = /[789][0-9]{9}/.test(value);
      if (value.trim() !== "" && !isValidMobile) {
        setAerror(true);
        setMobileError(true);
      } else {
        setAerror(false);
        seterror("");
        setMobileError(false);
      }
    }

    // if (name === "username") {
    //   if (value.trim() !== "" && value.length < 3) {
    //     setAerror(true);
    //     setUsernameError(true);
    //   } else {
    //     setAerror(false);
    //     seterror("");
    //     setUsernameError(false);
    //   }
    // }

    if (name === "password") {
      setPassword(value);
      if (
        value.trim() !== "" &&
        !(
          password.match(/[0-9]/g) &&
          password.match(/[a-z]/g) &&
          password.match(/[A-Z]/g) &&
          password.match(/[0-9]/g)
        )
      ) {
        setAerror(true);
        setPasswordError(true);
      } else {
        setPasswordError(false);
        setAerror(false);
        seterror(false);
      }
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() !== "" && /\s/.test(value)) {
        setAerror(true);
        setMailError("Email address cannot contain whitespace");
        setEmailError(true);
      } else if (value.trim() !== "" && !emailRegex.test(value)) {
        setAerror(true);
        setMailError("Invalid email address");
        setEmailError(true);
      } else {
        setAerror(false);
        setMailError("");
        seterror("");
        setEmailError(false);
      }
    }

    setFormData((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));

    if (
      name === "confirmPassword" &&
      (formData.password === value || value === "")
    ) {
      setAerror(false);
      seterror("");
      setConfirmPasswordError(false);
    } else if (value.trim() !== "" && name === "confirmPassword") {
      setAerror(true);
      setConfirmPasswordError(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-gray-950 bg-opacity-70 outline-double outline-orange-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-center m-4">
          {display ? (
            <BsFillPatchCheckFill
              className="text-center text-green-500"
              size={100}
            />
          ) : null}
        </div>
        <h2 className="text-2xl text-center text-orange-300 font-bold mb-6">
          Sign Up
        </h2>
        {Aerror && (
          <div ref={formRef} className="flex justify-center pb-4">
            <span className="text-red-600 text-base font-medium">{error}</span>
          </div>
        )}

        {/* <div className="mb-4">
          <label htmlFor="username" className="text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            className={`w-full px-4 py-2 mt-2 rounded border border-gray-300 ${
              usernameError
                ? "focus:border-red-500 outline-none"
                : "focus:border-indigo-500 outline-none"
            }`}
          />
          {usernameError ? (
            <div>
              <span className="text-red-600 text-sm font-medium">
                Username must be at least 3 characters long
              </span>
            </div>
          ) : null}
        </div> */}

        <div className="mb-4">
          <label htmlFor="email" className="text-orange-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email number"
            required
            className={`w-full px-4 py-2 mt-2 rounded border text-orange-100 placeholder:text-orange-200 bg-transparent border-orange-500 ${
              emailError
                ? "focus:border-red-500 outline-none"
                : "focus:border-indigo-500 outline-none"
            }`}
          />
          {emailError ? (
            <div>
              <span className="text-red-600 text-sm font-medium">
                {mailError}
              </span>
            </div>
          ) : null}
          {/* <span className="p-2 text-xs text-gray-600">( optional )</span> */}
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="text-orange-300">
            Mobile Number:
          </label>
          <div className="flex h-full">
            <select className={`w-20 px-4 py-2 mr-2 mt-2 rounded border text-orange-100 placeholder:text-orange-300 text-sm bg-transparent border-orange-500 ${
                mobileError
                  ? "focus:border-red-500 outline-none"
                  : "focus:border-indigo-500 outline-none"
              }`} defaultValue="Country code">
                <option defaultValue="Country code" selected className="overflow-ellipsis bg-black" >Country code</option>
              <option value="option1" className="text-orange-300 bg-black">+91</option>
              {/* <option value="option2" className="text-orange-300 bg-transparent">+81</option>
              <option value="option3" className="text-orange-300 bg-transparent">+7</option> */}
              
            </select>

            <input
              type="number"
              id="mobile"
              name="mobile"
              pattern="[789][0-9]{9}"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Number"
              required
              className={`w-full px-4 py-2 mt-2 rounded border text-orange-100 placeholder:text-orange-200 bg-transparent border-orange-500 ${
                mobileError
                  ? "focus:border-red-500 outline-none"
                  : "focus:border-indigo-500 outline-none"
              }`}
            />
          </div>
          {mobileError && (
            <div>
              <span className="text-red-600 text-sm font-medium">
                Mobile no must belong to india and it contains only 10 digit
              </span>
            </div>
          )}
          <span className="pl-2 text-xs text-orange-300">(optional)</span>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-orange-300">
            Password:
          </label>
          <div className="relative" id="tool">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className={`w-full px-4 py-2 mt-2 rounded border text-orange-100 placeholder:text-orange-200 bg-transparent border-orange-500 ${
                passwordError
                  ? "focus:border-red-500 outline-none"
                  : "focus:border-indigo-500 outline-none"
              }`}
            />
            <Tooltip anchorSelect="#tool" place="bottom" className="z-50">
              <h3>Password must contain the following:</h3>
              <div className="flex gap-2 items-center">
                {password.match(/[a-z]/g) ? (
                  <BsCheckLg className="text-green-500" />
                ) : (
                  <RxCross2 className="text-red-500" />
                )}
                <p
                  id="letter"
                  className={`${
                    password.match(/[a-z]/g)
                      ? "valid text-green-500"
                      : "invalid text-red-500"
                  }`}
                >
                  A <b>lowercase</b> letter
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {password.match(/[A-Z]/g) ? (
                  <BsCheckLg className="text-green-500" />
                ) : (
                  <RxCross2 className="text-red-500" />
                )}
                <p
                  id="capital"
                  className={`${
                    password.match(/[A-Z]/g)
                      ? "valid text-green-500"
                      : "invalid text-red-500"
                  }`}
                >
                  A <b>capital (uppercase)</b> letter
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {password.match(/[0-9]/g) ? (
                  <BsCheckLg className="text-green-500" />
                ) : (
                  <RxCross2 className="text-red-500" />
                )}
                <p
                  id="number"
                  className={`${
                    password.match(/[0-9]/g)
                      ? "valid text-green-500"
                      : "invalid text-red-500"
                  }`}
                >
                  A <b>number</b>
                </p>
              </div>

              <div className="flex gap-2 items-center">
                {password.length >= 8 ? (
                  <BsCheckLg className="text-green-500" />
                ) : (
                  <RxCross2 className="text-red-500" />
                )}
                <p
                  id="length"
                  className={`${
                    password.length >= 8
                      ? "valid text-green-500"
                      : "invalid text-red-500"
                  }`}
                >
                  Minimum <b>8 characters</b>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {!/\s/.test(password) ? (
                  <BsCheckLg className="text-green-500" />
                ) : (
                  <RxCross2 className="text-red-500" />
                )}
                <p
                  id="length"
                  className={`${
                    !/\s/.test(password)
                      ? "valid text-green-500"
                      : "invalid text-red-500"
                  }`}
                >
                  Password must not contain <b>blank spaces</b>
                </p>
              </div>
            </Tooltip>
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="text-orange-300">
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className={`w-full px-4 py-2 mt-2 rounded border text-orange-100 placeholder:text-orange-200 bg-transparent border-orange-500 ${
                confirmPasswordError
                  ? "focus:border-red-500 outline-none"
                  : "focus:border-indigo-500 outline-none"
              }`}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
          {confirmPasswordError && (
            <span className="text-red-600 text-sm font-medium">
              Password and Confirm Password must be the same
            </span>
          )}
        </div>

        <button
          onClick={register}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700"
        >
          Sign Up
        </button>

        <span
          className="flex justify-center mt-5 hover:underline-offset-1 text-orange-200 hover:text-orange-500 hover:underline"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an Account? <b>Log-in</b>{" "}
        </span>
      </div>
    </div>
  );
};

export default Signup;
