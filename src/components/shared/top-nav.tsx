"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ayushSocials } from "@/lib/constant";
import { IconBrandTelegram } from "@tabler/icons-react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <header className="w-full">
      {/* Top bar with links and social icons */}
      <div className="bg-accent-foreground text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-x-4">
            <Link href="/about-us" className="hover:text-gray-300">
              About Us
            </Link>
            <span>-</span>
            <Link href="#" className="hover:text-gray-300">
              Contact Us
            </Link>
            <span>-</span>
            <Link href="#" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </div>
          <div className="flex space-x-3">
            <Link href={ayushSocials.twitter} className="hover:text-gray-300">
              <Twitter size={16} />
            </Link>
            <Link href={ayushSocials.youtube} className="hover:text-gray-300">
              <Youtube size={16} />
            </Link>
            <Link href={ayushSocials.telegram} className="hover:text-gray-300">
              <IconBrandTelegram size={16} />
            </Link>
            <Link href={ayushSocials.instagram} className="hover:text-gray-300">
              <Instagram size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
