"use client";
import { LinkButtonWithIcon } from "@/components/common";
import cn from "classnames";
import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const AuthButton = dynamic(() => import("./AuthButton"), {
  ssr: false,
});

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathName = usePathname();
  const isHome = pathName === "/";

  const navMenu = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/service" },
    { title: "Our Team", path: "/our-team" },
    { title: "Career", path: "/career" },
  ];

  return (
    <div
      className={cn({
        "absolute min-w-full z-20": isHome,
      })}
    >
      <header className="container mx-auto px-5 mt-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="md:order-2 lg:order-1 relative w-[120px] h-[80px]"
          >
            <Image
              src={cn({
                "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/logo_white.svg":
                  isHome,
                "https://i.ibb.co.com/0pt9skqy/logo.png": !isHome,
              })}
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </Link>
          {/* Nav Menu */}
          <div
            className={cn(
              {
                "bg-white/10 text-white": isHome,
                "bg-white text-black": !isHome,
              },
              "order-2 hidden lg:flex gap-5 items-center  rounded-[20px] px-6 py-4 "
            )}
          >
            {navMenu.map(({ title, path }, idx) => (
              <Link
                key={idx}
                href={path}
                className="flex items-center text-lg gap-2 hover:text-primary font-medium transition-colors"
              >
                {title}
                {/* Square Box */}
                {idx !== navMenu.length - 1 ? (
                  <span className="ml-2 w-1.5 h-1.5 bg-primary " />
                ) : (
                  ""
                )}
              </Link>
            ))}

            <AuthButton />
          </div>
          {/* Mobile menu sidebar */}
          <div
            className={`min-h-screen bg-white w-[300px] absolute top-0 transition-all duration-300 ease-in-out ${
              isOpenMenu ? "right-0" : "-right-[300px]"
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

          {/* Contact Button */}
          <div className="order-3 hidden md:flex">
            <LinkButtonWithIcon
              text="Contact"
              textColor={isHome ? "text-white" : "text-black"}
              invertedBorder={false}
              link="/contact"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
