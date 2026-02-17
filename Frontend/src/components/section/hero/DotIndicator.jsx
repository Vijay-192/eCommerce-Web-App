import React from "react";

function DotIndicator({ total, current, onSelect }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-50">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`rounded-full transition-all duration-300 border
            ${
              current === index
                ? "w-4 h-4 bg-black border-black scale-110"
                : "w-3 h-3 bg-yellow-200 border-gray-500 opacity-80"
            }`}
        />
      ))}
    </div>
  );
}

export default DotIndicator;
