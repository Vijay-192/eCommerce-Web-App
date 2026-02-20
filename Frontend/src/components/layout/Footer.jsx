import React from "react";
import start from "../../assets/svg/sun.svg";
import arrow from "../../assets/svg/arrow.svg";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
function FooterSection() {
  return (
    <footer className="w-full">
      {/* ===== Newsletter Section ===== */}
      <div className="bg-orange-400 border-t-4 border-black border-b-4 border-black px-6 md:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative">
            <p className="mb-6 text-[15px] font-BRODISH-demo leading-[1.2] tracking-[1.5px] ">newsletter</p>

            <h2 className="text-[3em] font-BRODISH-demo leading-[1.2] tracking-[1.5px] ">
              BE THE FIRST TO HEAR ABOUT EXCLUSIVE OFFERS AND NEW PRODUCT
              <span className="inline-flex items-center">
                RELEASES
                <img
                  src={start}
                  alt="Sun Icon"
                  className="w-15 h-15 animate-spin [animation-duration:4s]"
                />
              </span>
            </h2>
          </div>

          {/* Right Form */}
          <div className="flex flex-col gap-6 max-w-sm w-full mx-auto">
            <Label
              htmlFor="email"
              className="text-3xl font-BRODISH-demo leading-[1.2] tracking-[1.5px] "
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="Enter your email..."
              className="px-6 py-4 text-[20px] font-BRODISH-demo leading-[1.2] tracking-[1.5px]  border-4 border-black bg-white neo-shadow focus:outline-none"
            />

            <Button className="bg-[#B9D35B] px-10 py-3 text-3xl flex items-center justify-center font-BRODISH-demo leading-[1.2] tracking-[1.5px] cursor-pointer border-2 border-black shadow-[6px_6px_0px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
              Send Request
            </Button>
            <div>
              <img
                src={arrow}
                alt="Arrow Icon"
                className="w-15 h-15 animate-bounce"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom Footer ===== */}
      <div className="bg-zinc-900 text-white px-6 md:px-20 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <p>© 2026</p>
          </div>

          <div>
            <p className="font-semibold">Fasnocode</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Office</p>
            <p>3517 W. Gray St. Utica</p>
            <p>Pennsylvania 57857</p>
          </div>

          <div>
            <p className="font-semibold mb-2">Contact Us</p>
            <p>(480) 555-0103</p>
            <p>example@mail.com</p>
            <p>11:00–18:00 local time</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
