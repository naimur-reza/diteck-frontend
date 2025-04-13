"use client";
import { LinkButtonWithIcon } from "@/components/common";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const AuthButton = dynamic(() => import("./AuthButton"), {
  ssr: false,
});

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathName = usePathname();
  const isHome = pathName === "/";

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpenMenu]);

  const navMenu = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/service" },
    { title: "Our Team", path: "/our-team" },
    { title: "Career", path: "/career" },
    { title: "Contact", path: "/contact", className: "block lg:hidden" },
  ];

  // Framer Motion variants
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

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
                "/placeholder.svg": false,
              })}
              alt="Logo"
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
              "order-2 hidden lg:flex gap-5 items-center rounded-[20px] px-6 py-4"
            )}
          >
            {navMenu.map(({ title, path, className }, idx) => (
              <Link
                key={idx}
                href={path}
                className={cn(
                  "flex items-center text-lg font-medium gap-2 transition-colors",
                  className
                )}
              >
                {title}
                {/* Square Box */}
                {idx !== navMenu.length - 1 ? (
                  <span className="ml-2 w-1.5 h-1.5 bg-primary hidden md:block" />
                ) : (
                  ""
                )}
              </Link>
            ))}

            <AuthButton />
          </div>

          {/* Mobile menu backdrop and sidebar */}
          <AnimatePresence>
            {isOpenMenu && (
              <>
                {/* Backdrop overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/50 z-40"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={backdropVariants}
                  onClick={() => setIsOpenMenu(false)}
                />

                {/* Sidebar */}
                <motion.div
                  className="fixed top-0 right-0 min-h-screen bg-white w-[300px] z-50 shadow-xl overflow-hidden"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sidebarVariants}
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Close button */}
                    <motion.button
                      className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => setIsOpenMenu(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RxCross1 size={20} />
                    </motion.button>

                    {/* Logo */}
                    <motion.div
                      className="relative w-[120px] h-[80px] mx-auto mb-8"
                      variants={itemVariants}
                    >
                      <Image
                        src="https://i.ibb.co.com/0pt9skqy/logo.png"
                        alt="Logo"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-2 mt-4">
                      {navMenu.map(({ title, path, className }, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={path}
                            className={cn(
                              "flex items-center text-lg font-medium py-2 px-4 rounded-lg transition-colors",
                              className,
                              pathName === path
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-gray-100"
                            )}
                            onClick={() => setIsOpenMenu(false)}
                          >
                            {title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Auth and Contact buttons */}
                    <div className="mt-auto space-y-4">
                      <motion.div className="mt-3" variants={itemVariants}>
                        <AuthButton />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <LinkButtonWithIcon
                          text="Contact"
                          textColor="text-black"
                          invertedBorder={false}
                          link="/contact"
                          className="w-full justify-center hidden md:block"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Nav Icon */}
          <div className="lg:hidden flex order-1">
            <motion.button
              onClick={() => setIsOpenMenu(true)}
              className="bg-primary p-3 rounded-[10px] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBars color={"white"} />
            </motion.button>
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
