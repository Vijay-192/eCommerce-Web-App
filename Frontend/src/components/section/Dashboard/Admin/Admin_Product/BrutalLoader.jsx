import React from "react";
import { Loader2 } from "lucide-react";

function BrutalLoader({ text = "Loading..." }) {
  return (
    <div className="flex items-center gap-2 font-bold">
      <Loader2
        size={16}
        className="animate-spin border-2 border-black rounded-full p-[2px]"
      />
      <span>{text}</span>
    </div>
  );
}

export default BrutalLoader;