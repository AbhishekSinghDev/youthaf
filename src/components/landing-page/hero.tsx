"use client";

import { IconBrandYoutube } from "@tabler/icons-react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 z-10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              Your Ultimate Study Companion
            </span>
          </div>

          {/* Main Heading with YouTube Icon */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <IconBrandYoutube className="relative w-10 h-10 md:w-16 md:h-16 text-red-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Youth AF
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Master Computer Science with{" "}
              <span className="text-foreground font-semibold">
                clear explanations
              </span>
              ,{" "}
              <span className="text-foreground font-semibold">
                practical examples
              </span>
              , and{" "}
              <span className="text-foreground font-semibold">
                zero confusion
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="#start" className="w-full sm:w-auto">
              <button className="group relative w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            <Link
              href="https://www.youtube.com/@YouthAF"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <button className="group w-full sm:w-auto px-8 py-4 bg-background border-2 border-border rounded-xl font-semibold text-lg transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 hover:-translate-y-0.5">
                <span className="flex items-center justify-center gap-2">
                  <IconBrandYoutube className="w-5 h-5 text-red-500" />
                  Watch on YouTube
                </span>
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>50,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
