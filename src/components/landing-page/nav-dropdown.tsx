"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationMenuData } from "@/lib/constant";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileQuestion,
  ImageIcon,
  LayoutGrid,
  MessageSquare,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const iconMap = {
  Search,
  BookOpen,
  FileQuestion,
  Calendar,
  LayoutGrid,
  ImageIcon,
  MessageSquare,
};

interface NavDropdownProps {
  trigger: React.ReactNode;
}

export default function NavDropdown({ trigger }: NavDropdownProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className={`p-0 w-96 rounded-xl shadow-lg border-0 ${
            isDarkMode ? "bg-[#272829]" : "bg-white"
          }`}
          sideOffset={8}
        >
          <div className="p-6 space-y-6">
            {/* Classes Accordion */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {navigationMenuData.classes.title}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="classes"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] py-2">
                    Select Your Class
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    {navigationMenuData.classes.items.map((classItem) => (
                      <Link
                        key={classItem.href}
                        href={`/class/${classItem.href}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE]">
                          {classItem.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {classItem.description}
                        </div>
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Quick Access
              </h3>
              <div className="space-y-3">
                {navigationMenuData.quickLinks.map((item) => {
                  const IconComponent =
                    iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${item.color} shadow-sm group-hover:shadow-md transition-all duration-200`}
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Resources
              </h3>
              <div className="space-y-3">
                {navigationMenuData.resources.map((item, index) => {
                  const IconComponent =
                    typeof item.icon === "string"
                      ? iconMap[item.icon as keyof typeof iconMap]
                      : item.icon;

                  return item.external ? (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-start gap-3 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                          item.color || "bg-gray-100 dark:bg-gray-800"
                        } shadow-sm group-hover:shadow-md transition-all duration-200`}
                      >
                        {typeof item.icon === "string" &&
                        item.icon.startsWith("http") ? (
                          <Image
                            src={item.icon || "/placeholder.svg"}
                            alt=""
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                          />
                        ) : IconComponent ? (
                          <IconComponent className="w-4 h-4 text-white" />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-200">
                            {item.title}
                          </h4>
                          <ExternalLink className="w-3 h-3 ml-1.5 text-gray-400 group-hover:text-[#7A7FEE]" />
                        </div>
                        {item.description && (
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                          item.color || "bg-gray-100 dark:bg-gray-800"
                        } shadow-sm group-hover:shadow-md transition-all duration-200`}
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-200">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
