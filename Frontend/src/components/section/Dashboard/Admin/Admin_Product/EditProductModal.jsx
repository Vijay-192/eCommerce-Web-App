import React from "react";
import { X, Loader2 } from "lucide-react";
import BrutalLoader from "./BrutalLoader";

function EditProductModal({
  editProduct,
  setEditProduct,
  handleSave,
  isSaving,
}) {
  if (!editProduct) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = indexToRemove => {
    setEditProduct(prev => ({
      ...prev,
      productImg: prev.productImg.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleAddImages = e => {
    const newFiles = Array.from(e.target.files);
    setEditProduct(prev => ({
      ...prev,
      productImg: [...(prev.productImg || []), ...newFiles],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Overlay spinner while saving */}
        {isSaving && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 gap-3">
            <Loader2 size={36} className="animate-spin text-black" />
            <p className="font-black text-sm uppercase tracking-widest">
              Updating Product...
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setEditProduct(null)}
          disabled={isSaving}
          className="cursor-pointer absolute top-4 right-4 border-2 border-black p-1 bg-red-300 hover:bg-red-400 shadow-[2px_2px_0px_black] disabled:opacity-40"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold mb-6 border-b-4 border-black pb-2">
          Edit Product
        </h2>

        <div className="flex flex-col gap-4">
          {/* Product Name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={editProduct?.productName}
              onChange={handleChange}
              className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Description</label>
            <textarea
              name="productDesc"
              value={editProduct?.productDesc}
              onChange={handleChange}
              rows={3}
              className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] focus:outline-none resize-none"
            />
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Category</label>
              <input
                type="text"
                name="category"
                value={editProduct?.category}
                onChange={handleChange}
                className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Brand</label>
              <input
                type="text"
                name="brand"
                value={editProduct?.brand}
                onChange={handleChange}
                className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] focus:outline-none"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Price (₹)</label>
            <input
              type="number"
              name="productPrice"
              value={editProduct?.productPrice}
              onChange={handleChange}
              className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] focus:outline-none"
            />
          </div>

          {/* Images */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Images</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editProduct.productImg?.map((img, i) => {
                const src =
                  img instanceof File ? URL.createObjectURL(img) : img.url;
                return (
                  <div
                    key={i}
                    className="relative w-16 h-16 border-2 border-black"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-black"
                    >
                      <X />
                    </button>
                  </div>
                );
              })}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddImages}
              className="border-4 border-black px-3 py-2 shadow-[3px_3px_0px_black] bg-white cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              disabled={isSaving}
              className="cursor-pointer  flex-1 border-4 border-black py-2 font-bold bg-gray-200 hover:bg-gray-300 shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className=" cursor-pointer flex-1 border-4 border-black py-2 font-bold bg-[#ceef4a] hover:bg-[#b8d93e] shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <BrutalLoader text="Updating Product..." />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
