import React, { useState, useEffect } from "react";
import WinterCircle from "./WinterCircle";
import SunSvg from "../../../assets/svg/sun.svg";
import ArrowSvg from "../../../assets/svg/arrow.svg";
import Carousel from "./Carousel";
import DotIndicator from "./DotIndicator";
import img from "../../../assets/jacket.png";
import img2 from "../../../assets/iphone-17.png";
import img4 from "../../../assets/iphone-17-hero.png";
import img5 from "../../../assets/optimized.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const items = [img, img2, img4, img5];
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);
  return (
    <section className="relative w-full h-screen flex overflow-hidden ">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#F59A3D] relative px-16 py-20 flex flex-col justify-between  ">
        {/* Top Content */}
        <div className="pl-15">
          <h1
            className="text-black font-extrabold uppercase leading-[1.05]
                         text-[64px] lg:text-[72px] tracking-tight "
          >
            NOT JUST FOR <br />
            THE STREETS <br />
            STREET <br />
            FASHION
          </h1>
          <img
            src={ArrowSvg}
            alt="Arrow Icon"
            className="w-29 h-26 inline mr-2 transform rotate-40"
          />
          <button
            onClick={() => navigate("/signup")}
            className="mt-10 bg-[#B9D35B] px-10 py-3 
                             font-BRODISH-demo leading-[1.2] tracking-[1.5px] cursor-pointer border-2 border-black
                             shadow-[6px_6px_0px_black]
                             hover:shadow-none hover:translate-x-1 hover:translate-y-1
                             transition-all duration-200 "
          >
            Get Started
          </button>
        </div>

        {/* Bottom Testimonial */}
        <div className="max-w-sm text-black text-sm pl-15 ">
          <p className="mb-6">
            <img
              src={SunSvg}
              alt="Sun Icon"
              className="w-6 h-6 inline mr-2 animate-spin [animation-duration:4s]  "
            />
            Very good product as expected the fabric is very soft and item is
            value for money loved it. For it and the colour is so awesome
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-sm"></div>
            <div>
              <h4 className="font-bold text-lg ">MAX</h4>
              <p className="text-xs">Dog Trainer</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#C4D96F] relative flex items-center justify-center">
        {/* Arch Background */}

        <div
          className="absolute -left-[10%] w-[430px] h-[550px] 
                bg-gradient-to-br 
                from-neutral-300 via-neutral-600 to-neutral-900
                shadow-2xl
                rounded-t-full overflow-hidden z-10 
                flex items-center justify-center"
        >
          <Carousel className="z-10 absolute -left-[10%]" />
        </div>

        <div className="relative z-10 mr-20 flex items-center justify-center">
          {/* Badge */}
          <WinterCircle />

          {/* Dot Indicator – right side */}
          <div className="absolute right-[-100px] top-1/2 -translate-y-1/2">
            <DotIndicator
              total={items.length}
              current={current}
              onSelect={setCurrent}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
