import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiSearch,
  FiGrid,
  FiTag,
  FiFilter,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const FlyoutPortal = ({
  anchorRef,
  open,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.top + window.scrollY,
      left: rect.right + window.scrollX + 8,
    });
  }, [open, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
        minWidth: 200,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};


const FilterSidebar = ({
  allProducts,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
}) => {
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [hoveredSection, setHoveredSection] = useState(null);

  const categoryRef = useRef(null);
  const brandRef = useRef(null);
  const catTimer = useRef(null);
  const brandTimer = useRef(null);

  const UniqueCategory = [
    "All",
    ...new Set(allProducts?.map(p => p.category) || []),
  ];
  const UniqueBrand = ["All", ...new Set(allProducts?.map(p => p.brand) || [])];
  const absoluteMaxPrice = 100000;

  const formatIndianPrice = n => n.toLocaleString("en-IN");

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const openFlyout = section => {
    clearTimeout(
      section === "category" ? catTimer.current : brandTimer.current
    );
    setHoveredSection(section);
  };

  const closeFlyout = section => {
    const t = section === "category" ? catTimer : brandTimer;
    t.current = setTimeout(() => {
      setHoveredSection(prev => (prev === section ? null : prev));
    }, 130);
  };

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setSearch("");
      setCategory("All");
      setBrand("All");
      setMinPrice(0);
      setMaxPrice(100000);
      setPriceRange([0, 100000]);
      setHoveredSection(null);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-64  font-sans">
      <div className="bg-white border-2 border-black rounded-[18px] shadow-[5px_5px_0px_0px_black] p-5 flex flex-col gap-5 ">
        {/* Title */}
        <h2 className="flex items-center gap-2 text-xl font-black tracking-tight border-b-2 border-black pb-3">
          <FiFilter className="text-black text-xl" />
          Filters
        </h2>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border-2 border-black rounded-[16px] shadow-[3px_3px_0px_0px_black] px-3 py-2.5">
          <FiSearch className="text-gray-500 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full font-medium"
          />
        </div>

        {/* ── Category Trigger ── */}
        <div
          ref={categoryRef}
          onMouseEnter={() => openFlyout("category")}
          onMouseLeave={() => closeFlyout("category")}
        >
          <div
            className={`flex items-center justify-between border-2 border-black rounded-[16px] px-4 py-3 cursor-pointer shadow-[3px_3px_0px_0px_black] transition-all select-none ${hoveredSection === "category" ? "translate-x-[2px] translate-y-[2px] shadow-[1px_1px_0px_0px_black] bg-yellow-100" : "bg-white"}`}
          >
            <span className="flex items-center gap-2 font-bold text-sm">
              <FiGrid className="text-black text-lg" />
              Category
            </span>
            <div className="flex items-center gap-1.5">
              {category !== "All" && (
                <span className="text-[11px] bg-black text-white rounded-full px-2 py-0.5 font-semibold max-w-[80px] truncate">
                  {category}
                </span>
              )}
              <FiChevronRight
                size={14}
                className={`transition-transform duration-200 ${hoveredSection === "category" ? "rotate-90" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Category Flyout (portal) */}
        <FlyoutPortal
          anchorRef={categoryRef}
          open={hoveredSection === "category"}
          onMouseEnter={() => openFlyout("category")}
          onMouseLeave={() => closeFlyout("category")}
        >
          <div className="w-64 bg-white border-2 border-black rounded-[18px] shadow-[5px_5px_0px_0px_black] overflow-hidden flex flex-col">

            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white px-4 pt-3 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">
              Categories
            </div>

            {/* Scrollable List */}
            <div className="max-h-60 overflow-y-auto scroll-smooth custom-scrollbar">
              {UniqueCategory.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCategory(cat);
                    setHoveredSection(null);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold cursor-pointer border-b border-gray-100 last:border-none transition-colors duration-150 hover:bg-yellow-100 ${category === cat
                    ? "bg-pink-100 text-pink-700"
                    : "text-gray-700"
                    }`}
                >
                  <span className="truncate">{cat}</span>

                  {category === cat && (
                    <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FlyoutPortal>

        {/* ── Brand Trigger ── */}
        <div
          ref={brandRef}
          onMouseEnter={() => openFlyout("brand")}
          onMouseLeave={() => closeFlyout("brand")}
        >
          <div
            className={`flex items-center justify-between border-2 border-black rounded-[16px] px-4 py-3 cursor-pointer shadow-[3px_3px_0px_0px_black] transition-all select-none ${hoveredSection === "brand" ? "translate-x-[2px] translate-y-[2px] shadow-[1px_1px_0px_0px_black] bg-yellow-100" : "bg-white"}`}
          >
            <span className="flex items-center gap-2 font-bold text-sm">
              <FiTag className="text-black text-lg" />
              Brand
            </span>
            <div className="flex items-center gap-1.5">
              {brand !== "All" && (
                <span className="text-[11px] bg-black text-white rounded-full px-2 py-0.5 font-semibold max-w-[80px] truncate">
                  {brand}
                </span>
              )}
              <FiChevronRight
                size={14}
                className={`transition-transform duration-200 ${hoveredSection === "brand" ? "rotate-90" : ""}`}
              />
            </div>
          </div>
        </div>
        {/* Brand Flyout (portal) */}
        <FlyoutPortal
          anchorRef={brandRef}
          open={hoveredSection === "brand"}
          onMouseEnter={() => openFlyout("brand")}
          onMouseLeave={() => closeFlyout("brand")}
        >
          <div className="bg-white border-2 border-black rounded-[18px] shadow-[5px_5px_0px_0px_black] overflow-hidden w-64 flex flex-col">

            {/* Header - fixed */}
            <div className="px-4 pt-3 pb-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">
              Brands
            </div>

            {/* Scroll only this section */}
            <div className="max-h-72 overflow-y-auto">
              {UniqueBrand.map((b, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setBrand(b);
                    setHoveredSection(null);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold cursor-pointer border-b border-gray-100 last:border-none transition-colors hover:bg-yellow-100 ${brand === b ? "bg-pink-100 text-pink-700" : ""
                    }`}
                >
                  <span>{b.toUpperCase()}</span>
                  {brand === b && (
                    <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FlyoutPortal>
        {/* Price Range */}
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2 font-bold text-sm">
            <FaRupeeSign className="text-black text-lg" />
            Price Range
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(Number(e.target.value))}
              className="w-full bg-white border-2 border-black rounded-[16px] px-3 py-2 shadow-[2px_2px_0px_0px_black] text-sm font-semibold outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_black] transition-all"
              placeholder="Min"
            />
            <span className="font-bold text-gray-400 shrink-0">–</span>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full bg-white border-2 border-black rounded-[16px] px-3 py-2 shadow-[2px_2px_0px_0px_black] text-sm font-semibold outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_black] transition-all"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min={0}
            max={absoluteMaxPrice}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="w-full accent-black cursor-pointer h-2"
          />
          <div className="flex justify-between text-xs font-semibold text-gray-500">
            <span>₹{formatIndianPrice(minPrice)}</span>
            <span>₹{formatIndianPrice(maxPrice)}</span>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black text-white font-bold text-sm rounded-[16px] px-4 py-3 shadow-[3px_3px_0px_0px_#555] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#555] transition-all disabled:opacity-60"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          {loading ? "Refreshing..." : "Reset Filters"}
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
