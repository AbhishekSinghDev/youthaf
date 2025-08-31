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
    <header className="sticky top-0 z-40 w-full transition-all duration-200 backdrop-blur-xs">
      <div className="py-4 max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo showBrandName />

          <div className="flex items-center gap-2">
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <NavigationLinks isAuthenticated={isAuthenticated} />
              <ThemeToggle />
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
