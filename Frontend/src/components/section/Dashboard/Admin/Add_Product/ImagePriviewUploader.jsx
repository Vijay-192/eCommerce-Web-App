
import { Label } from "@radix-ui/react-label";
import { UploadCloud } from "lucide-react";
import React from "react";
import { X } from "lucide-react"; // import the icon at the top

function ImagePriviewUploader({ productData, setProductData }) {
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setProductData((prev) => ({
                ...prev,
                productImg: [...(prev.productImg || []), ...files],
            }));
        }
    };

    const removeImage = (index) => {
        setProductData((prev) => {
            const updatedImg = prev.productImg.filter((_, i) => i !== index);
            return { ...prev, productImg: updatedImg };
        });
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Product Image Uploader
            </h2>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-amber-400 rounded-xl p-6 flex flex-col items-center justify-center bg-amber-50 hover:bg-amber-100 transition relative">
                {/* Hidden File Input */}
                <input
                    type="file"
                    id="image"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* Custom Upload Icon + Text */}
                <div className="flex flex-col items-center justify-center pointer-events-none">
                    <UploadCloud className="w-12 h-12 text-amber-500 mb-3 pointer-events-auto" />
                    <Label className="text-lg font-semibold mb-2 text-center pointer-events-auto cursor-pointer">
                        Click to Upload Images
                    </Label>
                    <p className="text-sm text-gray-500 text-center">
                        You can upload multiple images
                    </p>
                    {productData.productImg?.length > 0 && (
                        <p className="mt-2 text-sm font-medium text-amber-600">
                            {productData.productImg.length} Images Selected
                        </p>
                    )}
                </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Image Preview
                </h3>

                {productData.productImg && productData.productImg.length > 0 ? (
                    <div className="h-64 overflow-y-auto pr-2 border rounded-xl p-4 bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {productData.productImg.map((file, idx) => {
                                let preview = "";

                                if (file instanceof File) {
                                    preview = URL.createObjectURL(file);
                                } else if (typeof file === "string") {
                                    preview = file;
                                } else if (file?.url) {
                                    preview = file.url;
                                } else {
                                    return null;
                                }

                                return (
                                    <div
                                        key={idx}
                                        className="relative border rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={preview}
                                            alt={`preview-${idx}`}
                                            className="h-32 w-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 cursor-pointer right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400 border rounded-xl bg-gray-50">
                        No images selected
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImagePriviewUploader;