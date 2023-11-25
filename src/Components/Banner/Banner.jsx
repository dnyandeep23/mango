import React, { useEffect } from "react";
import mango from "../../assets/mongo.png";
import bg from "../../assets/back.png";
import Typewriter from "typewriter-effect/dist/core";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import mangoBanner from "../../assets/mangobanner.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = ({ handleBuyNowClick }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const str = ["ALPHONSO", "KESAR", "PAYARI"];

    const typewriter = new Typewriter(".typewriter-container", {
      loop: true,
    });

    typewriter
      .pauseFor(1000)
      .typeString(str[0])
      .pauseFor(2000)
      .deleteAll()
      .pauseFor(500)
      .typeString(str[1])
      .pauseFor(2000)
      .deleteAll()
      .pauseFor(500)
      .typeString(str[2])
      .pauseFor(2000)
      .deleteAll()
      .start();

    return () => {
      typewriter.stop();
    };
  }, []);

  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <>
      {/* <Carousel showIndicators={true} autoPlay={true} interval={5000}  showThumbs={false} showStatus={false}> */}
      <div className="relative">
        <img src={bg} className="h-[100vh]" alt="" />

        <div className="absolute  top-0 left-0 right-0 ">
          <marquee
            behavior=""
            direction="left"
            className="bg-black h- text-white"
          >
            our product will be in a stock very soon !
          </marquee>

          <Header className="z-50 absolute" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  md:-translate-y-[90%] w-full flex justify-center">
          <div className="m-24 flex flex-col px-4 md:flex-row bg-cover">
            <div className="left order-2 md:order-1">
              <p className="max-w-sm text-center md:text-start mt-12 md:max-w-lg mb-4 font-serif">
                Welcome to our mango website, where you'll find fresh and juicy
                mangoes, delicious desserts, refreshing beverages, and more.
              </p>
              <div className="btn flex justify-center md:justify-start md:pl-4 gap-3">
                <button
                  className="p-2 border-2 border-orange-600 w-32 text-black hover:text-white hover:bg-orange-700 font-bold rounded-lg"
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  Read more
                </button>
                <button
                  className="p-2 px-2 bg-orange-600 text-white w-32 hover:border-2 hover:border-orange-400 hover:bg-orange-700 font-bold rounded-lg"
                  onClick={handleBuyNowClick}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="right md:order-2">
              <div className="typewriter-container text-5xl font-extrabold font-serif"></div>
              <img className="pl-14 md:pl-6" src={mango} alt="" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* <div>
      <img src={mangoBanner} className="h-[100vh]" alt="" />
      <div className="absolute  top-0 left-0 right-0 ">
      <Header className="z-50 absolute" />
      </div>
    </div> */}
      {/* </Carousel> */}

      <div style={containerStyle}></div>
    </>
  );
};
export default Banner;
