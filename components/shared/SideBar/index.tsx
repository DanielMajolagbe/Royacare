"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import sideBarItems from "@/constants/sideBarItems";

const SideBar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
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
      {/* Mobile overlay */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]
          bg-[#0F1531] text-white
          smooth-transition
          z-50
          ${isExpanded ? 'w-64' : 'w-20'}
          ${isMobile ? (isExpanded ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        {/* Toggle button */}
        {!isMobile && (
          <button
            className="absolute -right-3 top-4 bg-[#0F1531] p-1 rounded-full shadow-lg"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <MdChevronLeft size={20} />
            ) : (
              <MdChevronRight size={20} />
            )}
          </button>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            className="absolute right-4 top-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <MdChevronLeft size={24} />
            ) : (
              <MdChevronRight size={24} />
            )}
          </button>
        )}

        {/* Navigation items */}
        <nav className="flex flex-col gap-2 p-4 mt-4">
          {sideBarItems.map((item, index) => {
            const isActive = pathname === item.route;

            return item.isExternal ? (
              <a
                key={index}
                href={item.route}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleNavigation(item.route, true)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg
                  smooth-transition
                  ${isActive ? 'sidebar-item-active' : 'hover:bg-white/10'}
                  ${!isExpanded && !isMobile ? 'justify-center' : ''}
                `}
              >
                <item.Icon size={24} className="min-w-[24px]" />
                {(isExpanded || isMobile) && (
                  <span className="truncate">{item.title}</span>
                )}
              </a>
            ) : (
              <Link
                key={index}
                href={item.route}
                onClick={() => handleNavigation(item.route, false)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg
                  smooth-transition
                  ${isActive ? 'sidebar-item-active' : 'hover:bg-white/10'}
                  ${!isExpanded && !isMobile ? 'justify-center' : ''}
                `}
              >
                <item.Icon size={24} className="min-w-[24px]" />
                {(isExpanded || isMobile) && (
                  <span className="truncate">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content margin spacer */}
      <div 
        className={`
          hidden md:block
          smooth-transition
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      />
    </>
  );
};

export default SideBar; 