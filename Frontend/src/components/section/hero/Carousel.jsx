import React, { useState, useEffect } from "react";
import { Card } from "../../retroui/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const items = (products?.slice(0, 4) ?? [])
    .map((product) => {
      const img =
        product.productImg?.[0]?.url  // primary image
        ?? product.productImg?.[1]?.url; // fallback to secondary

      if (!img) return null;

      return {
        url: img,
        name: product.productName,
        id: product._id,
      };
    })
    .filter(Boolean);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-xs mx-auto relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <Card className="w-full bg-transparent shadow-none border-none p-0">
                <Card.Content className="p-0 mt-10">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-[50vh] object-cover "
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