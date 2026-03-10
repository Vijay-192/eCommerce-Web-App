// import React, { useState } from "react";
// import { Search, Pencil, Trash2, Eye } from "lucide-react";
// import { useSelector } from "react-redux";
// import ProductViewModal from "./ProductViewModal";

// function AdminProduct() {
//   const { products } = useSelector(store => store.product);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   return (
//     <div className="h-[85vh] bg-[#f4f4f4] flex justify-center overflow-hidden">
//       <div className="w-full max-w-[1300px] flex flex-col p-10">
//         {/* Top Controls */}
//         <div className="flex justify-between items-center mb-8">
//           {/* Search */}
//           <div className="relative w-[340px]">
//             <Search size={18} className="absolute left-3 top-3 text-gray-600" />

//             <input
//               type="text"
//               placeholder="Search Product..."
//               className="w-full border-4 border-black bg-white px-4 py-2 pl-10 shadow-[4px_4px_0px_black] focus:outline-none"
//             />
//           </div>

//           {/* Sort */}
//           <select className="border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_black] font-semibold">
//             <option>Sort by Price</option>
//             <option>Low → High</option>
//             <option>High → Low</option>
//           </select>
//         </div>

//         {/* Header */}
//         <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] bg-yellow-300 border-4 border-black font-bold p-4 text-center text-sm">
//           <div className="text-left">Product</div>
//           <div>Description</div>
//           <div>Category</div>
//           <div>Brand</div>
//           <div>Price</div>
//           <div>Actions</div>
//         </div>

//         {/* Product List */}
//         <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-2">
//           {products?.map((product, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] items-center bg-white border-4 border-black p-4 hover:bg-gray-50"
//             >
//               {/* Product */}
//               <div className="flex items-center gap-3">
//                 <img
//                   src={product?.productImg?.[0]?.url}
//                   alt=""
//                   className="w-14 h-14 object-contain border-2 border-black p-1 bg-white"
//                 />

//                 <h1 className="font-semibold text-sm">
//                   {product?.productName}
//                 </h1>
//               </div>

//               {/* Description */}
//               <p className="text-xs text-gray-700 text-center truncate px-2">
//                 {product?.productDesc}
//               </p>

//               {/* Category */}
//               <div className="flex justify-center">
//                 <span className="border-2 border-black px-3 py-1 bg-blue-200 text-xs font-semibold">
//                   {product?.category}
//                 </span>
//               </div>

//               {/* Brand */}
//               <div className="flex justify-center">
//                 <span className="border-2 border-black px-3 py-1 bg-purple-200 text-xs font-semibold">
//                   {product?.brand}
//                 </span>
//               </div>

//               {/* Price */}
//               <h1 className="text-center font-bold text-lg">
//                 ₹{product?.productPrice}
//               </h1>

//               {/* Actions */}
//               <div className="flex justify-center gap-3">
//                 {/* View */}
//                 <button
//                   onClick={() => setSelectedProduct(product)}
//                   className="border-2 border-black p-2 bg-blue-300 hover:bg-blue-400 shadow-[3px_3px_0px_black]"
//                 >
//                   <Eye size={18} />
//                 </button>

//                 {/* Edit */}
//                 <button className="border-2 border-black p-2 bg-green-300 hover:bg-green-400 shadow-[3px_3px_0px_black]">
//                   <Pencil size={18} />
//                 </button>

//                 {/* Delete */}
//                 <button className="border-2 border-black p-2 bg-red-300 hover:bg-red-400 shadow-[3px_3px_0px_black]">
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       <ProductViewModal
//         product={selectedProduct}
//         onClose={() => setSelectedProduct(null)}
//       />
//     </div>
//   );
// }

// export default AdminProduct;

// import React, { useState } from "react";
// import { Search, Pencil, Trash2, Eye } from "lucide-react";
// import { useSelector } from "react-redux";
// import ProductViewModal from "./ProductViewModal";

// function AdminProduct() {
//   const { products } = useSelector(store => store.product);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // limit words helper
//   const limitWords = (text, limit) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > limit
//       ? words.slice(0, limit).join(" ") + "..."
//       : text;
//   };

//   return (
//     <div className="h-[85vh] bg-[#f4f4f4] flex justify-center overflow-hidden">
//       <div className="w-full max-w-[1300px] flex flex-col p-10">
        
//         {/* Top Controls */}
//         <div className="flex justify-between items-center mb-8">
          
//           {/* Search */}
//           <div className="relative w-[340px]">
//             <Search size={18} className="absolute left-3 top-3 text-gray-600" />

//             <input
//               type="text"
//               placeholder="Search Product..."
//               className="w-full border-4 border-black bg-white px-4 py-2 pl-10 shadow-[4px_4px_0px_black] focus:outline-none"
//             />
//           </div>

//           {/* Sort */}
//           <select className="border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_black] font-semibold">
//             <option>Sort by Price</option>
//             <option>Low → High</option>
//             <option>High → Low</option>
//           </select>
//         </div>

//         {/* Header */}
//         <div className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] bg-yellow-300 border-4 border-black font-bold p-4 text-sm items-center">
//           <div className="text-left pl-4">Product</div>
//           <div className="text-center">Description</div>
//           <div className="text-center">Category</div>
//           <div className="text-center">Brand</div>
//           <div className="text-center">Price</div>
//           <div className="text-center">Actions</div>
//         </div>

//         {/* Product List */}
//         <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-2">

//           {products?.map((product, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] items-center bg-white border-4 border-black p-4 hover:bg-gray-50"
//             >
              
//               {/* Product */}
//               <div className="flex items-center gap-3 pl-2">
//                 <img
//                   src={product?.productImg?.[0]?.url}
//                   alt=""
//                   className="w-14 h-14 object-contain border-2 border-black p-1 bg-white"
//                 />

//                 <h1 className="font-semibold text-sm">
//                   {limitWords(product?.productName, 2)}
//                 </h1>
//               </div>

//               {/* Description */}
//               <p className="text-xs text-gray-700 text-center px-2">
//                 {limitWords(product?.productDesc, 4)}
//               </p>

//               {/* Category */}
//               <div className="flex justify-center">
//                 <span className="border-2 border-black px-3 py-1 bg-blue-200 text-xs font-semibold">
//                   {product?.category}
//                 </span>
//               </div>

//               {/* Brand */}
//               <div className="flex justify-center">
//                 <span className="border-2 border-black px-3 py-1 bg-purple-200 text-xs font-semibold">
//                   {product?.brand}
//                 </span>
//               </div>

//               {/* Price */}
//               <h1 className="text-center font-bold text-lg">
//                 ₹{product?.productPrice}
//               </h1>

//               {/* Actions */}
//               <div className="flex justify-center gap-3">

//                 {/* View */}
//                 <button
//                   onClick={() => setSelectedProduct(product)}
//                   className="border-2 border-black p-2 bg-blue-300 hover:bg-blue-400 shadow-[3px_3px_0px_black]"
//                 >
//                   <Eye size={18} />
//                 </button>

//                 {/* Edit */}
//                 <button className="border-2 border-black p-2 bg-green-300 hover:bg-green-400 shadow-[3px_3px_0px_black]">
//                   <Pencil size={18} />
//                 </button>

//                 {/* Delete */}
//                 <button className="border-2 border-black p-2 bg-red-300 hover:bg-red-400 shadow-[3px_3px_0px_black]">
//                   <Trash2 size={18} />
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>
//       </div>

//       {/* Modal */}
//       <ProductViewModal
//         product={selectedProduct}
//         onClose={() => setSelectedProduct(null)}
//       />
//     </div>
//   );
// }

// export default AdminProduct;




import React, { useState } from "react";
import { Search, Pencil, Trash2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import ProductViewModal from "./ProductViewModal";

function AdminProduct() {
  const { products } = useSelector(store => store.product);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  // limit words helper
  const limitWords = (text, limit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  // SEARCH FILTER
let filteredProducts = products?.filter(product =>
  product.productName?.toLowerCase().includes(search.toLowerCase()) ||
  product.category?.toLowerCase().includes(search.toLowerCase()) ||
  product.brand?.toLowerCase().includes(search.toLowerCase())
);

  // PRICE SORT
  if (sortPrice === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  }

  if (sortPrice === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  }

  return (
    <div className="h-[85vh] bg-[#f4f4f4] flex justify-center overflow-hidden ml-20">
      <div className="w-full max-w-[1300px] flex flex-col p-10">
        
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">

          {/* Search */}
          <div className="relative w-[540px]">
            <Search size={18} className="absolute left-3 top-3 text-gray-600" />

            <input
              type="text"
              placeholder="Search product / category / brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-4 border-black bg-white px-4 py-2 pl-10 shadow-[4px_4px_0px_black] focus:outline-none"
            />
          </div>

          {/* Sort */}
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_black] font-semibold"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] bg-[#ceef4a] border-4   border-black font-bold p-4 text-sm items-center">
          <div className="text-left pl-4">Product</div>
          <div className="text-center">Description</div>
          <div className="text-center">Category</div>
          <div className="text-center">Brand</div>
          <div className="text-center">Price</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-2">

          {filteredProducts?.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] items-center bg-white border-4 border-black p-4 hover:bg-gray-50"
            >

              {/* Product */}
              <div className="flex items-center gap-3 pl-2">
                <img
                  src={product?.productImg?.[0]?.url}
                  alt=""
                  className="w-14 h-14 object-contain border-2 border-black p-1 bg-white"
                />

                <h1 className="font-semibold text-sm">
                  {limitWords(product?.productName, 2)}
                </h1>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-700 text-center px-2">
                {limitWords(product?.productDesc, 4)}
              </p>

              {/* Category */}
              <div className="flex justify-center">
                <span className="border-2 border-black px-3 py-1 bg-blue-200 text-xs font-semibold">
                  {product?.category}
                </span>
              </div>

              {/* Brand */}
              <div className="flex justify-center">
                <span className="border-2 border-black px-3 py-1 bg-purple-200 text-xs font-semibold">
                  {product?.brand}
                </span>
              </div>

              {/* Price */}
              <h1 className="text-center font-bold text-lg">
                ₹{product?.productPrice}
              </h1>

              {/* Actions */}
              <div className="flex justify-center gap-3">

                {/* View */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="border-2 border-black p-2 bg-blue-300 hover:bg-blue-400 shadow-[3px_3px_0px_black]"
                >
                  <Eye size={18} />
                </button>

                {/* Edit */}
                <button className="border-2 border-black p-2 bg-green-300 hover:bg-green-400 shadow-[3px_3px_0px_black]">
                  <Pencil size={18} />
                </button>

                {/* Delete */}
                <button className="border-2 border-black p-2 bg-red-300 hover:bg-red-400 shadow-[3px_3px_0px_black]">
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Modal */}
      <ProductViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default AdminProduct;