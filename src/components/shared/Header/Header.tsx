"use client";
import { LinkButtonWithIcon } from "@/components/common";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const navMenu = [
  { title: "Home", path: "/" },
  { title: "About", path: "about" },
  { title: "Services", path: "service" },
  { title: "Career", path: "career" },
  { title: "Contact", path: "contact" },
];

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const pathName = usePathname();

  return (
    <div
      className={cn({
        "absolute min-w-full": pathName === "/",
      })}
    >
      <header className="container mx-auto px-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="md:order-2 lg:order-1 relative w-[120px] h-[80px]"
          >
            <Image
              src="https://i.ibb.co.com/0pt9skqy/logo.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </Link>
          {/* Nav Menu */}
          <div className="order-2 hidden lg:flex gap-5 items-center bg-white rounded-[20px] px-5 py-3 shadow">
            {navMenu.map(({ title, path }, idx) => (
              <Link
                key={idx}
                href={path}
                className="flex items-center gap-2 hover:text-primary font-semibold transition-colors"
              >
                {title}
                {/* Square Box */}
                {idx !== navMenu.length - 1 ? (
                  <span className="ml-2 w-1.5 h-1.5 bg-primary" />
                ) : (
                  ""
                )}
              </Link>
            ))}
          </div>
          {/* Mobile menu sidebar */}
          <div
            className={`min-h-screen bg-white w-[300px] absolute top-0 transition-all duration-300 ease-in-out ${
              isOpenMenu ? "left-0 z-50" : "left-[-300px]"
            }`}
          >
            <div className="absolute right-4 top-4">
              <button
                className="cursor-pointer"
                onClick={() => setIsOpenMenu(false)}
              >
                <RxCross1 size={20} />
              </button>
            </div>
            {/* Logo */}
            <div className="relative w-[120px] h-[80px] mx-auto mb-[30px]">
              <Image
                src="https://i.ibb.co.com/0pt9skqy/logo.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="flex flex-col gap-y-5">
              {navMenu.map(({ title, path }, idx) => (
                <Link
                  key={idx}
                  href={path}
                  className="flex flex-col items-center gap-2 hover:text-primary font-semibold transition-colors"
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          {/* Nav Icon */}
          <div className="lg:hidden flex order-1">
            <button
              onClick={() => setIsOpenMenu((pre) => !pre)}
              className="bg-primary p-3 rounded-[10px] cursor-pointer"
            >
              <FaBars color={"white"} />
            </button>
          </div>
          {/* Button */}
          <div className="order-3 hidden md:flex">
            <LinkButtonWithIcon
              invertedBorder={false}
              link="/"
              text="Get In Touch"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
