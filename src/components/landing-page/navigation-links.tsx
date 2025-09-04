"use client";

import { navigationMenuData } from "@/lib/constant";
import {
  IconBook2,
  IconBrandTelegram,
  IconBrandYoutube,
  IconGlobe,
  IconLogin,
  IconPlayerPlay,
} from "@tabler/icons-react";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileQuestion,
  ImageIcon,
  LayoutGrid,
  MessageSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import NavDropdown from "./nav-dropdown";

const iconMap = {
  Search,
  BookOpen,
  FileQuestion,
  Calendar,
  LayoutGrid,
  ImageIcon,
  MessageSquare,
};

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
  const [browseExpanded, setBrowseExpanded] = useState(true);
  const [classesExpanded, setClassesExpanded] = useState(true);
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

      {/* Browse Section - Mobile vs Desktop */}
      {isMobile ? (
        <div className="w-full">
          <Button
            variant="ghost"
            className="w-full justify-between text-left"
            onClick={() => setBrowseExpanded(!browseExpanded)}
          >
            <div className="flex items-center">
              <IconGlobe className="mr-2 h-4 w-4" />
              Browse
            </div>
            {browseExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {browseExpanded && (
            <div className="ml-4 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              {/* Classes Section */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left text-sm text-gray-600 dark:text-gray-300"
                  onClick={() => setClassesExpanded(!classesExpanded)}
                >
                  <span>Classes</span>
                  {classesExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>

                {classesExpanded && (
                  <div className="ml-4 mt-2 space-y-1">
                    {navigationMenuData.classes.items.map((classItem) => (
                      <Link
                        key={classItem.href}
                        href={`/class/${classItem.href}`}
                        className="block p-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                        onClick={onLinkClick}
                      >
                        {classItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Quick Access
                </div>
                {navigationMenuData.quickLinks.map((item) => {
                  const IconComponent =
                    iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                      onClick={onLinkClick}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* Resources */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Resources
                </div>
                {navigationMenuData.resources.map((item, index) => {
                  const IconComponent =
                    typeof item.icon === "string"
                      ? iconMap[item.icon as keyof typeof iconMap]
                      : item.icon;

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2 p-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
                      onClick={onLinkClick}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <NavDropdown
            trigger={
              <Button variant="ghost" className={linkClass}>
                <IconGlobe className="mr-2 h-4 w-4" />
                Browse
              </Button>
            }
          />
        </div>
      )}

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
