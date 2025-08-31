"use client";

import { brandColors } from "@/lib/constant";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Content */}
        <div className="mb-12">
          <div
            className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center text-4xl"
            style={{
              background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.tertiary})`,
            }}
          >
            🚀
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Coming Soon
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            We're building something amazing for you. A new learning experience
            that will help you master concepts with ease.
          </p>

          <div className="text-muted-foreground mb-8">
            <p className="mb-2">✨ Interactive learning materials</p>
            <p className="mb-2">📚 Comprehensive study resources</p>
            <p>🎯 Exam-focused preparation</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity mr-4"
          >
            Explore Current Resources
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            <IconArrowLeft /> Back to Home
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-sm text-muted-foreground">
          <p>Stay tuned for updates!</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
