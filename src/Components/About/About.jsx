import React, { useContext } from "react";
import "./About.css";
import mango from "../../assets/mango.svg";
import { Context } from "../../utils/context";

const About = () => {
  const { dark } = useContext(Context);
  return (
    <>
      <div className={`${dark && "dark"} w-full z-0 h-[160vh] md:h-screen overflow-hidden bg-no-repeat flex justify-center items-center`}>
        <div className="absolute top-auto w-10/12 opacity-80 p-4 md:p-16 rounded-3xl  dark:bg-[rgba(0,0,0,1)] bg-[#ffffffb6] text-black dark:text-white">
          <h2 className=" text-2xl font-bold mb-4 border-b-2 border-black dark:border-white pb-4">About Us</h2>
          <p className="mb-4 text-sm md:text-base pt-4">
            Welcome to Mango E-commerce, your one-stop destination for all
            things mango! We are passionate about delivering the finest quality
            mangoes to mango lovers around the world.
          </p>
          <p className="mb-4  text-sm md:text-base">
            At Mango E-commerce, we source our mangoes directly from trusted
            farmers who specialize in growing the juiciest and most flavorful
            mangoes. Our team ensures that only the best mangoes make it to your
            doorstep.
          </p>
          <p className="mb-4  text-sm md:text-base">
            Whether you are craving the sweetness of Alphonso, the tropical
            flavor of Kent, or the vibrant color of Tommy Atkins, we have a wide
            variety of mangoes to suit your taste buds. We believe in offering a
            diverse selection to cater to mango enthusiasts of all kinds.
          </p>
          <p className="mb-4  text-sm md:text-base">
            Our mission is to provide you with a seamless online shopping
            experience. With our user-friendly website and secure payment
            options, you can easily browse through our mango collection, place
            your order, and have it delivered to your home.
          </p>
          <p className="mb-4  text-sm md:text-base">
            We are committed to customer satisfaction, and our dedicated support
            team is always here to assist you with any queries or concerns. Your
            happiness is our top priority.
          </p>
          <p className="mb-4  text-sm md:text-base">
            Thank you for choosing Mango E-commerce. We hope you enjoy the
            delightful taste and aroma of our mangoes. Happy shopping!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
