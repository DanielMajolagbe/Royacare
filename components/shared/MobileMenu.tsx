"use client";

import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import Link from 'next/link';
import sideBarItems from '@/constants/sideBarItems';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden bg-[#0F1531] text-white p-3 rounded-full shadow-lg hover:bg-[#1a2547] transition-colors"
        aria-label="Open menu"
      >
        <MdMenu size={24} />
      </button>

      {/* Full Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0F1531] z-50 md:hidden overflow-y-auto">
          <div className="flex flex-col min-h-screen">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close menu"
              >
                <MdClose size={28} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
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
        </div>
      )}
    </>
  );
};

export default MobileMenu; 