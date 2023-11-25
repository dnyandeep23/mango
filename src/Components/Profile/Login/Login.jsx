import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useRef } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Context } from "../../../utils/context";
import { useContext } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState("");
  const [Aerror, setAerror] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passError, setPassError] = useState("");
  const [Client, setClient] = useState([]);
  const [password, setPassword] = useState("");
  const [a, seta] = useState(false);
  const [display, setDisplay] = useState(false);
  const { setnewClient, setnewsetClient, setsetClient, client } =
    useContext(Context);

  useEffect(() => {
    if (client) {
      toast.warn("To place an order login is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setsetClient(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/clients?email=${user.email}`
      );
      if (response.data.data && response.data.data.length > 0) {
        const matchingData = response.data.data.find(
          (item) => item.attributes.email === user.email
        );
        if (matchingData) {
          setClient(matchingData.attributes);
          console.log(Client);
          setverified(true);
        } else {
          setAerror(true);
          seterror("Invalid Email Address");
          const offset = 100;
          window.scrollTo({
            top: formRef?.current?.offsetTop - offset,
            behavior: "smooth",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return true;
  };

  const [showPassword, setShowPassword] = useState(false); // ye bhi maine kiya hai

  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() !== "" && /\s/.test(value)) {
        setAerror(true);
        setMailError("Email address cannot contain whitespace");
        setEmailError(true);
      } else if (value.trim() !== "" && !emailRegex.test(value)) {
        setAerror(true);
        setMailError("Email address should contain '@' symbol");
        setEmailError(true);
      } else {
        setAerror(false);
        setMailError("");
        seterror("");
        setEmailError(false);
      }
    }

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
        setPassError("Invalid password syntax");
        setPasswordError(true);
      } else {
        setPasswordError(false);
        setAerror(false);
      }
    }
  };

  const handleLogin = async () => {
    if (
      user.password === "" ||
      user.email === "" ||
      (user.password === "" && user.email === "")
    ) {
      setAerror(true);
      seterror("All fields are required");
    } else {
      seta(false);
      fetchData();
      if (verified) {
        if (user.password === Client.password) {
          seta(true);
          setAerror(true);
          seterror("You have logged in successfully");
          setDisplay(true);
          setnewClient(Client);
          setnewsetClient(true);
          setsetClient(true);
          navigate("/");
        } else {
          seta(false);
          setAerror(true);
          seterror("Invalid Password");
          const offset = 100;
          window.scrollTo({
            top: formRef?.current?.offsetTop - offset,
            behavior: "smooth",
          });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    // ye bhi maine kiya hai
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
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
      <div className="h-screen w-full container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-gray-950 bg-opacity-70 outline-double outline-orange-700 rounded-xl p-6 shadow-2xl shadow-slate-700">
          <div className="flex justify-center m-4">
            {display ? (
              <BsFillPatchCheckFill
                className="text-center text-green-500"
                size={100}
              />
            ) : null}
          </div>
          <h2 className="text-2xl text-center text-orange-300 font-bold mb-6">
            Login to Your Account
          </h2>
          {Aerror && (
            <div ref={formRef} className="flex justify-center pb-4">
              <span
                className={`${
                  !a ? "text-red-400" : "text-green-600"
                } text-base font-medium`}
              >
                {error}
              </span>
            </div>
          )}
          <div>
            <div className="mb-4">
              <label htmlFor="email" className="text-orange-300">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 mt-2 rounded border text-orange-100 placeholder:text-orange-200 bg-transparent border-orange-500 ${
                  emailError
                    ? "focus:border-red-500 outline-none"
                    : "focus:border-indigo-500 outline-none"
                }`}
              />
              {emailError ? (
                <div>
                  <span className="text-red-400 text-sm font-medium">
                    {mailError}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="text-orange-300">
                Password:
              </label>
              <div className="relative">
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"} // ye mera hai
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full px-4 py-2 mt-2 rounded border bg-transparent text-orange-100 placeholder:text-orange-200  border-orange-500 ${
                    passwordError
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
              {passwordError ? (
                <div>
                  <span className="text-red-400 text-sm font-medium">
                    {passError}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="swipe-background z-20">
              <button
                className="btn-three w-full outline outline-1 outline-offset-1 outline-orange-500 bg-orange-500 hover:bg-transparent text-white py-2 px-4 z-50 rounded"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div
              className="flex justify-center mt-5 hover:underline-offset-1 text-orange-200 hover:text-orange-500 hover:underline"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create new Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
