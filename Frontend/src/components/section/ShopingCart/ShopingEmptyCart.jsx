import React from "react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../../../assets/emptycart.webp";

function StartShoppingButton() {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate("/collection");
  };

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-[80vw] h-[80vh] bg-white border-4 border-black shadow-[10px_10px_0px_0px_black] p-10 text-center flex flex-col items-center justify-center">
        <div className="w-72 h-72 mb-6 flex items-center justify-center">
          <img
            src={emptyCart}
            alt="emptyCart"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-3xl font-black uppercase mb-4">Cart is Empty!</h1>

        <p className="text-lg font-semibold mb-6">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={handleStartShopping}
          className="bg-blue-400 border-4 border-black px-6 py-3 font-bold text-lg 
                     shadow-[6px_6px_0px_0px_black] 
                     hover:translate-x-1 hover:translate-y-1 
                     hover:shadow-[3px_3px_0px_0px_black] 
                     transition-all duration-150"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default StartShoppingButton;
