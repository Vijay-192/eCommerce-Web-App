// import React from "react";

// function Slider() {
//   const items = [
//     {
//       name: "Woolen Jacket",
//       svg: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//           <path d="M6 2l6 4 6-4v20H6V2z" />
//         </svg>
//       ),
//     },
//     {
//       name: "Digital Devices",
//       svg: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//           <rect x="4" y="4" width="16" height="12" />
//           <path d="M8 20h8" />
//         </svg>
//       ),
//     },
//     {
//       name: "Mobile Phones",
//       svg: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//           <rect x="7" y="2" width="10" height="20" rx="2" />
//         </svg>
//       ),
//     },
//     {
//       name: "Headphones",
//       svg: (
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//           <path d="M4 12a8 8 0 0116 0v6" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <div className="w-full overflow-hidden py-6">
//       <div className="flex whitespace-nowrap animate-marquee">
//         {[...items, ...items].map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center  mx-6 px-6 py- "
//           >
//             {item.svg}
//             <span className="font-black text-lg">{item.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Slider;

import React from "react";
import start from "../../../assets/svg/sun.svg";
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
