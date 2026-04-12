import React, { useState, useEffect } from "react";
import WinterCircle from "./WinterCircle";
import SunSvg from "../../../assets/svg/sun.svg";
import ArrowSvg from "../../../assets/svg/arrow.svg";
import Carousel from "./Carousel";
import DotIndicator from "./DotIndicator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.user);
  const itemCount = Math.min(products?.length ?? 0, 4);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (itemCount === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % itemCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [itemCount]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          MOBILE + TABLET  
      ═══════════════════════════════════════════ */}
      <section className="lg:hidden w-full  flex flex-col bg-[#F59A3D]">


        {/* ── HERO CONTENT ── */}
        <div className="flex-1 flex flex-col px-5 pt-4 pb-6 gap-5">

          {/* Headline */}
          <div>
            <h1
              className="
                text-black font-extrabold uppercase
                leading-[0.98] tracking-tighter
                text-[55px] sm:text-[52px]
              "
            >
              NOT JUST FOR
              THE  STREETS
              STREET <br />
              FASHION
              DIGITAL LIFE

            </h1>
            <p className="text-black/70 font-semibold text-xs sm:text-sm  tracking-[2px] mt-2">
              Redefining Streetwear for the Digital Generation
            </p>
          </div>

          {/* ── PRODUCT SHOWCASE CARD ── */}
          <div className="relative w-full  rounded-2xl overflow-hidden border-2 border-black shadow-[5px_5px_0px_black]">

            <div className="flex items-end justify-center pt-8  relative">
              {/* Carousel pill */}
              <div
                className="
                  w-[230px] sm:w-[190px]
                  h-[300px] sm:h-[250px]
                  bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-900
                  rounded-t-full overflow-hidden
                  border-2 border-black/20
                  flex items-center justify-center
                "
              >
                <Carousel current={current} setCurrent={setCurrent} />
              </div>

              {/* WinterCircle badge — top right corner */}
              <div className="absolute top-22 right-4 scale-[0.97] sm:scale-[0.65] origin-top-right">
                <WinterCircle />
              </div>
            </div>

            {/* Dot indicator */}
            <div className="flex justify-center py-3 mt-5">
              <DotIndicator
                total={itemCount}
                current={current}
                onSelect={setCurrent}
              />
            </div>
          </div>

          {/* ── REVIEW + USER + BUTTON ── */}
          <div className="px-4 py-3">
            <p className="text-black text-xs sm:text-sm leading-relaxed mb-3">
              <img
                src={SunSvg}
                alt=""
                className="w-4 h-4 inline mr-1.5 animate-spin [animation-duration:4s]"
              />
              Very good product — fabric is very soft, value for money. The colour is so awesome.
            </p>

            <div className="flex items-center justify-between gap-3">

              {/* USER */}
              {user ? (
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border-2 border-black">
                      <img
                        src={user.profilePic}
                        alt={user.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#B9D35B] border-2 border-[#F59A3D] rounded-full" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs uppercase truncate text-black">
                        {user.firstName} {user.lastName}
                      </h4>
                      <span className="text-[9px] bg-[#B9D35B] text-black font-semibold px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-[10px] text-black/60 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-black rounded-sm flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-black">MAX</h4>
                    <p className="text-[10px] text-black/60">Dog Trainer</p>
                  </div>
                </div>
              )}

              {/* BUTTON */}
              <button
                onClick={() => navigate("/signup")}
                className="
        bg-[#B9D35B] text-black text-xs font-bold
        px-4 py-2 border-2 border-black
        shadow-[3px_3px_0px_black]
        active:shadow-none active:translate-x-0.5 active:translate-y-0.5
        transition-all duration-150 uppercase tracking-wider
        whitespace-nowrap
      "
              >
                Get Started
              </button>

            </div>
          </div>


        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DESKTOP  (hidden below lg) — original untouched
      ═══════════════════════════════════════════ */}
      <section className="hidden lg:flex relative w-full h-screen overflow-hidden flex-row">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-[#F59A3D] relative px-16 py-20 flex flex-col justify-between">
          <div className="pl-15">
            <h1 className="text-black font-extrabold uppercase leading-[1.05] tracking-tight text-[72px]">
              NOT JUST FOR <br />
              THE STREETS <br />
              STREET <br />
              FASHION &amp; <br />
              DIGITAL LIFE
            </h1>

            <img
              src={ArrowSvg}
              alt="Arrow Icon"
              className="w-29 h-auto inline mr-2 rotate-45"
            />

            <button
              onClick={() => navigate("/signup")}
              className="
                mt-10 bg-[#B9D35B] px-10 py-3
                font-BRODISH-demo tracking-[1.5px] cursor-pointer border-2 border-black
                shadow-[6px_6px_0px_black]
                hover:shadow-none hover:translate-x-1 hover:translate-y-1
                transition-all duration-200
              "
            >
              Get Started
            </button>
          </div>

          <div className="max-w-sm text-black text-sm pl-15">
            <p className="mb-6">
              <img
                src={SunSvg}
                alt="Sun Icon"
                className="w-5 h-5 inline mr-2 animate-spin [animation-duration:4s]"
              />
              Very good product as expected the fabric is very soft and item is
              value for money loved it. For it and the colour is so awesome
            </p>

            {user ? (
              <div className="flex items-center gap-3 rounded-xl px-3 py-2">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-black">
                    <img src={user.profilePic} alt={user.firstName} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#B9D35B] border-2 border-[#F59A3D] rounded-full" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm uppercase truncate">{user.firstName} {user.lastName}</h4>
                    <span className="text-[10px] bg-[#B9D35B] text-black font-semibold px-1.5 py-0.5 rounded uppercase">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-black/70 truncate mt-0.5">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-sm" />
                <div>
                  <h4 className="font-bold text-sm">MAX</h4>
                  <p className="text-[10px]">Dog Trainer</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-[#C4D96F] relative flex items-center justify-center">
          <div
            className="
              absolute -left-[10%]
              w-[430px] h-[550px]
              bg-gradient-to-br from-neutral-300 via-neutral-600 to-neutral-900
              shadow-2xl rounded-t-full overflow-hidden z-10
              flex items-center justify-center
            "
          >
            <Carousel current={current} setCurrent={setCurrent} />
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <WinterCircle />
            <div className="absolute right-[-100px] top-1/2 -translate-y-1/2">
              <DotIndicator total={itemCount} current={current} onSelect={setCurrent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;