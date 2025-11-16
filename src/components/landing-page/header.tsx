import { auth } from "@/server/auth";
import { headers } from "next/headers";
import Logo from "../shared/logo";
import ThemeToggle from "../shared/toggle-theme";
import UserDropdown from "../shared/user-dropdown";
import MobileMenu from "./mobile-menu";
import NavigationLinks from "./navigation-links";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="flex h-16 items-center justify-between">
          <Logo showBrandName />

          <div className="flex items-center gap-3">
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <NavigationLinks isAuthenticated={isAuthenticated} />
              <div className="ml-2">
                <ThemeToggle />
              </div>
              {isAuthenticated && <UserDropdown />}
            </div>

            {/* Mobile Menu Button */}
            <MobileMenu isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </header>
  );
}
