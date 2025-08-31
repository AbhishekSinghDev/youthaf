"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  showBrandName?: boolean;
  href?: string;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  brandName?: string;
  iconSize?: number;
}

const Logo = ({
  showBrandName = false,
  href = "/",
  className,
  iconClassName,
  textClassName,
  brandName = "YouthAF",
  iconSize = 24,
}: LogoProps) => {
  const { theme } = useTheme();

  return (
    <Link href={href} className={cn("flex items-center gap-2", className)}>
      <div className="relative aspect-square size-8 overflow-hidden rounded-full">
        <Image
          src={theme === "dark" ? "/youthaf-2.png" : "/youthaf-1.png"}
          alt={brandName}
          fill
          className={cn("flex-shrink-0", iconClassName)}
        />
      </div>
      {showBrandName && (
        <span className={cn("font-semibold text-xl truncate", textClassName)}>
          {brandName}
        </span>
      )}
    </Link>
  );
};

export default Logo;
