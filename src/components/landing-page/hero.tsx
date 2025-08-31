"use client";

import { IconBrandYoutube } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <section className="relative overflow-hidden min-h-[50vh] flex flex-col">
        <div className="container mx-auto px-4 py-12 relative z-10 flex-1 flex flex-col">
          <div className="text-center flex-1 flex flex-col items-center justify-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex items-center gap-3"
            >
              <IconBrandYoutube className="size-11 lg:size-18 text-red-500" />
              <h1
                id="main-title"
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              >
                Youth AF
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
            >
              No fluff. No overcomplications. Just solid CS learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Get started button */}
              <div className="flex items-center justify-center">
                <Link href="#start">
                  <div className="group cursor-pointer border border-border bg-card gap-2 h-[60px] flex items-center p-[10px] rounded-full">
                    <div className="border border-border bg-primary h-[40px] rounded-full flex items-center justify-center text-primary-foreground">
                      <p className="font-medium tracking-tight mr-3 ml-3 flex items-center gap-2 justify-center text-base">
                        <BookOpen className="w-[18px] h-[18px]" />
                        Start Learning
                      </p>
                    </div>
                    <div className="text-muted-foreground group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right group-hover:rotate-180 ease-in-out transition-all"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
