import React from "react";
import BreadCrums from "./BreadCrums";
import ProductImg from "./ProductImg";
import ProductDesc from "./ProductDesc";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function SingleProduct() {
  const params = useParams();
  const productId = params.id;
  const { products } = useSelector(store => store.product);
  const product = products.find(item => item._id === productId);

  return (
    <>
      {/* <h1>SingleProduct</h1> */}
      <div className="split-bg ">
        <div className="py-10 max-w-8xl mx-9 ">
          <BreadCrums product={product} />
          <div className="mt-10 grid grid-cols-2 items-start">
            <ProductImg images={product.productImg} />
            <ProductDesc product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
