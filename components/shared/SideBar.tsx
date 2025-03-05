"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; // Chevron icons
import sideBarItems from "@/constants/sideBarItems";

const SideBar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (route: string, isExternal: boolean) => {
    if (isExternal) {
      window.location.href = route;
    }
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Hide sidebar completely on mobile since we're using NavBar menu */}
      <div className={`hidden lg:block fixed left-0 top-0 h-screen bg-[#0F1531] text-white transition-all duration-300 z-20
        ${isExpanded ? 'w-64' : 'w-20'} 
        mt-16 md:mt-20`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-4 top-5 bg-[#0F1531] p-1 rounded-full shadow-md"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <MdChevronLeft size={24} />
          ) : (
            <MdChevronRight size={24} />
          )}
        </button>

        <div className="flex flex-col items-start gap-4 px-4 mt-5">
          {sideBarItems.map((item, index) => {
            const isActive = pathname === item.route;

            return item.isExternal ? (
              <a
                key={index}
                href={item.route}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center w-full p-3 rounded-lg cursor-pointer transition-colors duration-200
                  ${isActive ? "bg-white text-[#0F1531]" : "hover:bg-white/10"}
                  ${!isExpanded ? 'justify-center' : ''}
                `}
              >
                <item.Icon size={24} className="min-w-[24px]" />
                {isExpanded && (
                  <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                )}
              </a>
            ) : (
              <Link
                key={index}
                href={item.route}
                className={`flex items-center w-full p-3 rounded-lg cursor-pointer transition-colors duration-200
                  ${isActive ? "bg-white text-[#0F1531]" : "hover:bg-white/10"}
                  ${!isExpanded ? 'justify-center' : ''}
                `}
              >
                <item.Icon size={24} className="min-w-[24px]" />
                {isExpanded && (
                  <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content margin adjustment - only on desktop */}
      <div className={`hidden lg:block transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`} />
    </>
  );
};

export default SideBar;
