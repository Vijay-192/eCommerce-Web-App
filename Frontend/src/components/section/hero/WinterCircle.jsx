
import React from "react";

const WinterCircle = () => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      
      {/* Rotating Text Circle */}
      <div className="absolute w-full h-full rounded-full border-2 border-black spin-slow bg-[#F59A3D]">
        <svg viewBox="0 0 200 200" className="w-full h-full ">
          <defs>
            <path
              id="circlePath"
              d="
                M 100,100
                m -75,0
                a 75,75 0 1,1 150,0
                a 75,75 0 1,1 -150,0
              "
            />
          </defs>

          <text fontSize="22" fontWeight="bold" fill="black">
            <textPath href="#circlePath" >
              WINTER COLLECTION • DIGITAL  ACCESSORIES •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Circle */}
      <div className="absolute w-32 h-32  rounded-full flex flex-col items-center justify-center   ">
        <span className="text-3xl font-bold text-black ">20</span>
        <span className="text-3xl font-bold text-black ">27</span>
      </div>
    </div>
  );
};

export default WinterCircle;
