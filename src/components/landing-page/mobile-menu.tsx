"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconX } from "@tabler/icons-react";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "../shared/logo";
import ThemeToggle from "../shared/toggle-theme";
import UserDropdown from "../shared/user-dropdown";
import { Button } from "../ui/button";
import NavigationLinks from "./navigation-links";

interface MobileMenuProps {
  isAuthenticated?: boolean;
}

export default function MobileMenu({
  isAuthenticated = false,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated && (
        <Button size="icon" variant="ghost" className="md:hidden" asChild>
          <div className="md:hidden">
            <UserDropdown />
          </div>
        </Button>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="md:hidden rounded-full"
          >
            <Menu className="h-4 w-4 text-black dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-[85%] max-w-sm p-0 flex flex-col"
        >
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
            <Logo showBrandName />
            <div className="flex items-center">
              <ThemeToggle />
              <SheetClose asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <IconX className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 flex flex-col">
            <nav className="flex-1 p-4">
              <NavigationLinks
                isMobile={true}
                isAuthenticated={isAuthenticated}
                onLinkClick={handleLinkClick}
              />
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
