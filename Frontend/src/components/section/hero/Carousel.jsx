// import React, { useState, useEffect } from "react";
// import { Card } from "../retroui/Card";
// import img from "../../assets/jacket.png";
// import img2 from "../../assets/iphone-17.png";
// import img4 from "../../assets/iphone-17-hero.png";
// import img5 from "../../assets/optimized.png";
// function Carousel() {
//   const items = [img, img2, img4, img5];

//   const [current, setCurrent] = useState(0);

//   // Auto-slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % items.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [items.length]);

//   return (
//     <div className="w-full max-w-xs mx-auto overflow-hidden relative">
//       <div
//         className="flex transition-transform duration-500"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {items.map((img, index) => (
//           <div className="flex-shrink-0 w-full" key={index}>
//             <Card className="w-full  bg-transparent shadow-none border-none p-0">
//               <Card.Content className="p-0">
//                 <img
//                   src={img}
//                   alt={`Slide ${index + 1}`}
//                   className=" border-none shadow-none w-full h-[50vh] object-cover"
//                 />
//               </Card.Content>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carousel;

// import React, { useState, useEffect } from "react";
// import { Card } from "../retroui/Card";
// import img from "../../assets/jacket.png";
// import img2 from "../../assets/iphone-17.png";
// import img4 from "../../assets/iphone-17-hero.png";
// import img5 from "../../assets/optimized.png";

// function Carousel() {
//   const items = [img, img2, img4, img5];
//   const [current, setCurrent] = useState(0);

//   // Auto-slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % items.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full max-w-xs mx-auto relative">
      
//       {/* Slides Container */}
//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {items.map((img, index) => (
//             <div className="flex-shrink-0 w-full" key={index}>
//               <Card className="w-full bg-transparent shadow-none border-none p-0">
//                 <Card.Content className="p-0">
//                   <img
//                     src={img}
//                     alt={`Slide ${index + 1}`}
//                     className="w-full h-[50vh] object-cover"
//                   />
//                 </Card.Content>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-50">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`rounded-full transition-all duration-300 border 
//               ${current === index
//                 ? "w-4 h-4 bg-yellow-400 border-black scale-110"
//                 : "w-3 h-3 bg-yellow-200 border-gray-500 opacity-80 hover:opacity-100"
//               }`}
//           />
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Carousel;



import React, { useState, useEffect } from "react";
import { Card } from "../../retroui/Card";
import img from "../../../assets/jacket.png";
import img2 from "../../../assets/iphone-17.png";
import img4 from "../../../assets/iphone-17-hero.png";
import img5 from "../../../assets/optimized.png";

function Carousel() {
  const items = [img, img2, img4, img5];
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="w-full max-w-xs mx-auto relative">
      
      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((img, index) => (
            <div className="flex-shrink-0 w-full" key={index}>
              <Card className="w-full bg-transparent shadow-none border-none p-0">
                <Card.Content className="p-0">
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[50vh] object-cover"
                  />
                </Card.Content>
              </Card>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
}

export default Carousel;
