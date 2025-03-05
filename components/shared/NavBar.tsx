"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import sideBarItems from "@/constants/sideBarItems";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="navbar h-16 md:h-20 px-4 md:px-6 flex items-center justify-between">
            {/* Logo & Text - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <Image
                src="/roya.png"
                alt=""
                width={35}
                height={35}
                className="mr-2"
              />
              <a href="/" className="text-lg md:text-xl font-bold text-[#0F1531]">
                RoyaCare Agency
              </a>
            </div>

            {/* Mobile Logo - Centered */}
            <div className="flex md:hidden items-center justify-center flex-1">
              <Image
                src="/roya.png"
                alt="RoyaCare Logo"
                width={30}
                height={30}
              />
            </div>

            {/* Mobile Menu Button - Always visible on mobile */}
            <button
              className="block md:hidden text-[#0F1531] bg-black p-2 hover:bg-gray-100 rounded-lg focus:outline-none absolute right-4"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <MdMenu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel - Full screen overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0F1531] z-50 md:hidden">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-lg"
            >
              <MdClose size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-6 gap-4">
            {sideBarItems.map((item, index) => (
              item.isExternal ? (
                <a
                  key={index}
                  href={item.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-lg text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <item.Icon size={24} />
                  <span className="text-lg">{item.title}</span>
                </a>
              ) : (
                <Link
                  key={index}
                  href={item.route}
                  className="flex items-center gap-3 p-4 hover:bg-white/10 rounded-lg text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <item.Icon size={24} />
                  <span className="text-lg">{item.title}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
