import React from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
function DeleteProductModal({
  deleteTarget,
  setDeleteTarget,
  handleDelete,
  isDeleting,
}) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black shadow-[10px_10px_0px_black] w-full max-w-md p-8 relative">
        {/* Hazard stripe top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-3"
          style={{
            background:
              "repeating-linear-gradient(45deg,#ef4444,#ef4444 10px,#000 10px,#000 20px)",
          }}
        />

        {/* Overlay spinner while deleting */}
        {isDeleting && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10 gap-3">
            <Loader2 size={36} className="animate-spin text-red-500" />
            <p className="font-black text-sm uppercase tracking-widest text-red-500">
              Deleting...
            </p>
          </div>
        )}

        {/* Close Button */}

        <button
          onClick={() => setDeleteTarget(null)}
          disabled={isDeleting}
          className="cursor-pointer absolute top-4 right-4 border-2 border-black p-1 bg-red-300 hover:bg-red-400 shadow-[2px_2px_0px_black] disabled:opacity-40"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mt-4 mb-5">
          <div className="border-4 border-black bg-red-400 p-3 shadow-[4px_4px_0px_black]">
            <Trash2 size={24} className="text-black" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">
              Delete Product
            </h2>
            <p className="text-xs text-gray-500 font-semibold">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="flex items-center gap-4 border-4 border-black p-3 bg-red-50 shadow-[4px_4px_0px_black] mb-6">
          <img
            src={deleteTarget?.productImg?.[0]?.url}
            alt=""
            className="w-14 h-14 object-contain border-2 border-black bg-white p-1 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight truncate">
              {deleteTarget?.productName}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ₹{deleteTarget?.productPrice}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {deleteTarget?.brand} · {deleteTarget?.category}
            </p>
          </div>
          <div className="flex items-center gap-1 border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_black] shrink-0">
            <HiOutlineExclamationTriangle size={14} />
            <span>Warning</span>
          </div>
        </div>

        {/* Warning Message */}
        <p className="text-sm text-gray-700 font-medium mb-6 border-l-4 border-red-500 pl-3 bg-red-50 py-2 pr-2">
          Are you sure you want to permanently delete{" "}
          <span className="font-black text-black">
            "{deleteTarget?.productName}"
          </span>
          ? All product images will also be removed from storage.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
            disabled={isDeleting}
            className=" cursor-pointer flex-1 border-4 border-black py-2.5 font-bold bg-gray-200 hover:bg-gray-300 shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className=" cursor-pointer flex-1 border-4 border-black py-2.5 font-black bg-red-400 hover:bg-red-500 shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} /> Yes, Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
