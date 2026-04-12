import React, { useEffect, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { API_URL_PRODUCT } from "@/api/api";
function Product() {
  const { products } = useSelector(store => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 9999999]);
  const [loading, SetLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const getAllProduct = async () => {
    try {
      SetLoading(true);
      const res = await axios.get(
        `
        ${API_URL_PRODUCT}/getallproducts
        
        
        `
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    if (brand !== "All") {
      filtered = filtered.filter(p => p.brand === brand);
    }
    filtered = filtered.filter(
      p => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );
    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }
    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex gap-6 p-7 h-[70vh] split-bg">
        <div className="fixed top- right-6 z-50 w-[220px] group">
          <div
            className="bg-white border-2 border-black rounded-[18px] 
                shadow-[5px_5px_0px_0px_black] 
                px-4 py-2.5 font-semibold cursor-pointer 
                flex justify-between items-center"
          >
            <span className="truncate">Sort by Price</span>

            <span className="text-xs transition-transform duration-200 group-hover:rotate-180">
              <FiChevronDown className="w-4 h-4" />
            </span>
          </div>

          <div
            className="absolute right-0 mt-2 w-full 
                bg-white border-2 border-black 
                rounded-[18px] shadow-[5px_5px_0px_0px_black] 
                overflow-hidden flex flex-col
                opacity-0 invisible
                group-hover:opacity-100 
                group-hover:visible
                transition-all duration-200"
          >
            <div
              className="sticky top-0 z-10 bg-white px-4 pt-3 pb-2 
                  text-[10px] font-black text-gray-400 
                  uppercase tracking-widest 
                  border-b border-gray-200"
            >
              Sort Options
            </div>

            <div className="max-h-40 overflow-y-auto">
              <div
                onClick={() => setSortOrder("lowToHigh")}
                className="px-4 py-2.5 text-sm font-semibold 
                 cursor-pointer border-b border-gray-100 
                 hover:bg-yellow-100 text-gray-700"
              >
                Price: Low to High
              </div>

              <div
                onClick={() => setSortOrder("highToLow")}
                className="px-4 py-2.5 text-sm font-semibold 
                 cursor-pointer hover:bg-yellow-100 
                 text-gray-700"
              >
                Price: High to Low
              </div>
            </div>
          </div>
        </div>

        <aside className="w-64 flex-shrink-0 self-start sticky mt-14 fixed">
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            allProducts={allProducts}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        <main className="flex-1 min-w-0 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Product;
