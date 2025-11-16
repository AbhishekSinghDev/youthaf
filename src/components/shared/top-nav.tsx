"use client";

import { ayushSocials } from "@/lib/constant";
import { IconBrandTelegram } from "@tabler/icons-react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const TopNav = () => {
  return (
    <div className="w-full border-b border-border/40 bg-black dark:bg-muted/30">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="flex justify-between items-center h-10 text-sm">
          <div className="flex items-center gap-6">
            <Link
              href="/about-us"
              className="text-muted dark:text-muted-foreground dark:hover:text-foreground transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-muted dark:text-muted-foreground dark:hover:text-foreground transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={ayushSocials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted dark:text-muted-foreground dark:hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href={ayushSocials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted dark:text-muted-foreground dark:hover:text-red-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Youtube className="w-4 h-4" />
            </Link>
            <Link
              href={ayushSocials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted dark:text-muted-foreground dark:hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <IconBrandTelegram className="w-4 h-4" />
            </Link>
            <Link
              href={ayushSocials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted dark:text-muted-foreground dark:hover:text-pink-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
