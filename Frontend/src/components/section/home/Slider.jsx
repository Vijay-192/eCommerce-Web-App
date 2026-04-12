import React from "react";
function Slider() {
  const categories = [
    "Hoodies",
    "Sweatshirts",
    "Shirts",
    "Jackets",
    "T-Shirts",
  ];

  return (
    <div className="w-full overflow-hidden bg-[#C4D96F] border-y-4 border-black py-4">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...categories, ...categories].map((item, index) => (
          <div
            key={index}
            className="flex items-center text-2xl md:text-3xl font-black mx-8"
          >
            <span>{item}</span>
            <span className="mx-6 text-black text-2xl">✺</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
