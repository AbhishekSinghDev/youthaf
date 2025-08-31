import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import { Metadata } from "next";

interface PublicRoutesLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Youth AF - Master Computer Science Skills",
    template: "%s | Youth AF",
  },
  description:
    "No fluff. No overcomplications. Just solid CS learning. Master programming, algorithms, data structures, and computer science fundamentals with practical, hands-on tutorials and notes.",
  keywords: [
    "computer science",
    "programming",
    "algorithms",
    "data structures",
    "coding tutorials",
    "software engineering",
    "CS learning",
    "programming education",
  ],
  authors: [{ name: "Youth AF" }],
  creator: "Youth AF",
  publisher: "Youth AF",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youthaaf.com",
    siteName: "Youth AF",
    title: "Youth AF - Master Computer Science Skills",
    description:
      "No fluff. No overcomplications. Just solid CS learning. Master programming, algorithms, data structures, and computer science fundamentals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Youth AF - Computer Science Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youth AF - Master Computer Science Skills",
    description:
      "No fluff. No overcomplications. Just solid CS learning. Master programming, algorithms, data structures, and computer science fundamentals.",
    images: ["/twitter-image.png"],
    creator: "@youthaaf",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://youthaaf.com",
  },
  category: "education",
};

const PublicRoutesLayout = ({ children }: PublicRoutesLayoutProps) => {
  return (
    <main className="min-h-screen dark:bg-[#111111]">
      <Header />
      <div className="pt-4 max-w-2xl mx-auto px-4">{children}</div>
      <Footer />
    </main>
  );
};

export default PublicRoutesLayout;
