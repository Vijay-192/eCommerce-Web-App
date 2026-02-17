import React from "react";
import { Truck, ShieldCheck, Headphones } from "lucide-react";
import Slider from "../home/Slider";

function Feature() {
  const features = [
    {
      icon: <Truck size={28} />,
      title: "Free Shipping",
      desc: "On orders over $50",
      bg: "bg-blue-200",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bg: "bg-green-200",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "Always here to help",
      bg: "bg-purple-200",
    },
  ];

  return (
    <section className="w-full bg-yellow-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className={`p-6 ${item.bg} border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all duration-200`}
          >
            <div className="mb-4 inline-block p-3 bg-white border-4 border-black">
              {item.icon}
            </div>
            <h3 className="text-xl font-black mb-2">{item.title}</h3>
            <p className="font-medium">{item.desc}</p>
          </div>
        ))}
      </div>



    </section>
  );
}

export default Feature;
