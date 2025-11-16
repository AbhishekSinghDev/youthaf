import { abhishekSocials, ayushSocials } from "@/lib/constant";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "../shared/logo";

export default function Footer() {
  const footerLinks = {
    product: [
      { name: "About Us", href: "/about-us" },
      { name: "Classes", href: "/#start" },
      { name: "Notes", href: "/notes" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Community", href: "https://t.me/YouthAf" },
      { name: "Support", href: "#support" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-4">
              <Logo showBrandName />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                No fluff. No overcomplications. Just solid CS learning for
                students from Class 9 to 12.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={ayushSocials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link
                  href={ayushSocials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href={abhishekSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                </Link>
                <Link
                  href={abhishekSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Product</h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                        {...(link.href.startsWith("http") && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} YouthAF. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span>Made with ❤️ by</span>
              <Link
                href={abhishekSocials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Abhishek Singh
              </Link>
              <span>and</span>
              <Link
                href={ayushSocials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Ayush Poddar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
