import React, { useState } from "react";
import { Search, Pencil, Trash2, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ViewProductModal from "./ViewProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";

const API_BASE_URL = import.meta.env.VITE_API_URL_PRODUCT;

function AdminProduct() {
  const { products } = useSelector(store => store.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const handleSave = async e => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    formData.append("ProductName", editProduct.productName);
    formData.append("ProductDesc", editProduct.productDesc);
    formData.append("Category", editProduct.category);
    formData.append("Brand", editProduct.brand);
    formData.append("ProductPrice", editProduct.productPrice);

    const existingImages = editProduct.productImg
      .filter(img => !(img instanceof File) && img.public_id)
      .map(img => img.public_id);
    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      .filter(img => img instanceof File)
      .forEach(file => formData.append("file", file));

    try {
      const res = await axios.put(
        `${API_BASE_URL}/update/${editProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success("Product Updated Successfully");
        const updatedProducts = products.map(p =>
          p._id === editProduct._id ? res.data.product : p
        );
        dispatch(setProducts(updatedProducts));
        setEditProduct(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/product/delete/${deleteTarget._id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success("Product Deleted Successfully");
        dispatch(setProducts(products.filter(p => p._id !== deleteTarget._id)));
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  let filteredProducts = products?.filter(
    product =>
      product.productName?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase()) ||
      product.brand?.toLowerCase().includes(search.toLowerCase())
  );

  if (sortPrice === "low")
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  if (sortPrice === "high")
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );

  return (
    <div className="h-[85vh] flex justify-center overflow-hidden ml-20 ">
      <div className="w-full max-w-[1300px] flex flex-col p-15">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-[540px] ml-55">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 z-10 pointer-events-none"
            />

            <input
              type="text"
              placeholder="Search product / category / brand..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border-4 border-black bg-white py-2 pl-11 pr-4 
    shadow-[4px_4px_0px_black] focus:outline-none"
            />
          </div>

          <select
            value={sortPrice}
            onChange={e => setSortPrice(e.target.value)}
            className="border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_black] font-semibold mr-60"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] bg-[#ceef4a] border-4 border-black font-bold p-4 text-sm items-center">
          <div className="text-left pl-4">Product</div>
          <div className="text-center">Description</div>
          <div className="pl-5">Category</div>
          <div className="pl-7">Brand</div>
          <div className="pl-5">Price</div>
          <div className="pl-10">Actions</div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-2">
          {filteredProducts?.map((product, index) => (
            <div
              key={product._id || index}
              className="grid grid-cols-[2.5fr_3fr_1.2fr_1.2fr_1fr_1.5fr] items-center bg-white border-4 border-black p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 pl-2">
                <img
                  src={product?.productImg?.[0]?.url}
                  alt=""
                  className="w-14 h-14 object-contain border-2 border-black p-1 bg-white"
                />
                {/* <h1 className="font-semibold text-sm line-clamp-1">
                  {product?.productName}
                </h1> */}
                <h1 className="font-semibold text-sm truncate max-w-[120px]">
                  {product?.productName}
                </h1>
              </div>

              <p className="text-xs text-gray-700 text-center px-2 line-clamp-2">
                {product?.productDesc}
              </p>
              <div className="flex justify-center">
                <span className="border-2 border-black px-3 py-1 bg-blue-200 text-xs font-semibold">
                  {product?.category}
                </span>
              </div>
              <div className="flex justify-center">
                <span className="border-2 border-black px-3 py-1 bg-purple-200 text-xs font-semibold">
                  {product?.brand}
                </span>
              </div>
              <h1 className="text-center font-bold text-lg">
                ₹{product?.productPrice}
              </h1>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer border-2 border-black p-2 bg-blue-300 hover:bg-blue-400 shadow-[3px_3px_0px_black]"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => setEditProduct({ ...product })}
                  className=" cursor-pointer border-2 border-black p-2 bg-green-300 hover:bg-green-400 shadow-[3px_3px_0px_black]"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => setDeleteTarget(product)}
                  className="cursor-pointer border-2 border-black p-2 bg-red-300 hover:bg-red-400 shadow-[3px_3px_0px_black]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modals ── */}
      <ViewProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <EditProductModal
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        handleSave={handleSave}
        isSaving={isSaving}
      />

      <DeleteProductModal
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default AdminProduct;
