"use client";

import {
  IconBook2,
  IconBrandTelegram,
  IconBrandYoutube,
  IconGlobe,
  IconLogin,
  IconPlayerPlay,
} from "@tabler/icons-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import NavDropdown from "./nav-dropdown";

interface NavigationLinksProps {
  isMobile?: boolean;
  isAuthenticated?: boolean;
  onLinkClick?: () => void;
}

export default function NavigationLinks({
  isMobile = false,
  isAuthenticated = false,
  onLinkClick,
}: NavigationLinksProps) {
  const linkClass = isMobile ? "w-full justify-start text-left" : "";

  return (
    <div className={isMobile ? "flex flex-col space-y-1 w-full" : "contents"}>
      {/* About US */}
      <Link
        href="/about-us"
        className={`${buttonVariants({ variant: "ghost" })} ${linkClass}`}
        onClick={onLinkClick}
      >
        <IconBook2 className="mr-2 h-4 w-4" />
        About Me
      </Link>

      {/* YouTube Link */}
      <Link
        href="https://www.youtube.com/@YouthAf"
        target="_blank"
        rel="noopener"
        className={`${buttonVariants({ variant: "ghost" })} ${linkClass}`}
        onClick={onLinkClick}
      >
        <IconBrandYoutube className="mr-2 h-4 w-4" />
        Youtube
      </Link>

      {/* Telegram Link */}
      <Link
        href="https://t.me/YouthAf"
        target="_blank"
        rel="noopener"
        className={`${buttonVariants({ variant: "ghost" })} ${linkClass}`}
        onClick={onLinkClick}
      >
        <IconBrandTelegram className="mr-2 h-4 w-4" />
        Telegram
      </Link>

      {/* Browse Dropdown */}
      <div className={isMobile ? "w-full" : ""}>
        <NavDropdown
          trigger={
            <Button variant="ghost" className={linkClass}>
              <IconGlobe className="mr-2 h-4 w-4" />
              Browse
            </Button>
          }
        />
      </div>

      {/* Authentication Links */}
      {!isAuthenticated && (
        <div
          className={
            isMobile
              ? "flex flex-col gap-2 mt-4 pt-4 border-t"
              : "flex items-center gap-3"
          }
        >
          <Button
            variant="outline"
            asChild
            className={isMobile ? "w-full" : ""}
          >
            <Link href="/login" onClick={onLinkClick}>
              <IconLogin className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild className={isMobile ? "w-full" : ""}>
            <Link href="/signup" onClick={onLinkClick}>
              <IconPlayerPlay className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
