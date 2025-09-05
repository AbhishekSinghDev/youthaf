import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import Logo from "../shared/logo";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-4">
      <div className="container py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center text-center">
          <Logo showBrandName />
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
            No fluff. No overcomplications. Just solid CS learning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>Made with</span>
            <span className="text-red-500 inline-flex items-center align-middle">
              <IconHeartFilled color="red" size={14} className="inline-block" />
            </span>
            <span>by</span>
            <Link
              href="https://abhisheksingh.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-2 decoration-1 hover:decoration-2"
            >
              Abhishek Singh
            </Link>
            <span>and</span>
            <Link
              href="https://www.linkedin.com/in/ayush-poddar-8bb739245/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-2 decoration-1 hover:decoration-2"
            >
              Ayush Poddar
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} YouthAF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
