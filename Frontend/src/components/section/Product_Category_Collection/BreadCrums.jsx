import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function BreadCrums() {
  return (
    <div className="absolute top-20 left-4">
      <div className="flex items-center gap-2 px-4 py-2">
        
        <Link
          to="/"
          className="text-sm font-bold uppercase tracking-wide hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
        >
          Home
        </Link>

        <ChevronRight size={16} className="stroke-[3]" />

        <Link
          to="/collection"
          className="text-sm font-bold uppercase tracking-wide hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150"
        >
          Product
        </Link>

        <ChevronRight size={16} className="stroke-[3]" />

        <span className="text-sm font-black bg-yellow-300 px-2 py-0.5 border border-black">
          Current
        </span>

      </div>
    </div>
  );
}

export default BreadCrums;