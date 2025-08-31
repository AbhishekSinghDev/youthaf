import Logo from "../shared/logo";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-4">
      <div className="container py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center text-center">
          <Logo showBrandName />
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            No fluff. No overcomplications. Just solid CS learning.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} YouthAF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
