import React, { useState } from "react";
import ImagePreviewUploader from "./ImagePriviewUploader";
import { Input } from "@/components/retroui/Input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/retroui/Button";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { API_URL_PRODUCT } from "@/api/api";
function AddProduct() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const products = useSelector(state => state.products?.products ?? []);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!productData.productName.trim()) {
      toast.error("Please enter product name");
      return;
    }
    if (!productData.productPrice || productData.productPrice <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!productData.productImg || productData.productImg.length === 0) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDesc", productData.productDesc);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);
    productData.productImg.forEach(img => {
      formData.append("file", img);
    });

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL_PRODUCT}/add`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
        setProductData({
          productName: "",
          productPrice: 0,
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" ">
      <div className="w-full flex items-center justify-center p-2 uppercase ">
        <div className="w-full max-w-6xl  border-4 border-black p-6 md:p-10 ">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Add New Product
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label className="text-sm font-medium mb-2">Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 outline-none uppercase"
                  placeholder="Product name"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium mb-2">Brand</Label>
                <Input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 outline-none uppercase"
                  placeholder="Product brand"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium mb-2">Category</Label>
                <Input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 outline-none uppercase"
                  placeholder="Product category"
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-sm font-medium mb-2">Price</Label>
                <Input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 outline-none uppercase"
                  placeholder="Product price"
                  min={0}
                />
              </div>

              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-bold mb-2 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  name="productDesc"
                  rows="4"
                  value={productData.productDesc}
                  onChange={handleChange}
                  placeholder="Product description"
                  className="uppercase border-4 border-black px-4 py-3 font-semibold text-black placeholder-black resize-none outline-none shadow-[6px_6px_0px_black] focus:shadow-[2px_2px_0px_black] focus:translate-x-1 focus:translate-y-1 transition-all duration-150"
                />
              </div>

              <div className="md:col-span-2 flex justify-center mt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`bg-orange-400 text-black py-3 rounded-xl transition duration-300 uppercase 
                w-full max-w-md flex justify-center items-center`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center border-2 border-dashed border-amber-300 rounded-2xl p-6">
              <ImagePreviewUploader
                productData={productData}
                setProductData={setProductData}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
