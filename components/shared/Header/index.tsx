"use client";

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdMenu } from 'react-icons/md';

const Header = () => {
  const pathname = usePathname();
  const pageName = pathname ? pathname.split('/').pop() || 'Dashboard' : 'Dashboard';


  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-20">
      <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-8">
            <Image
              src="/roya.png"
              alt="Royacare Agency"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden md:block text-lg font-semibold text-gray-800 capitalize">
            {pageName}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden text-lg font-semibold text-gray-800 capitalize">
            {pageName}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 