export const EMAIL_LOGIN_OTP_LENGTH = 6;

import { SubNavItem } from "@/components/landing-page/nav-dropdown";
import { ImageIcon, LayoutGrid, MessageSquare } from "lucide-react";

// Brand color palette
export const brandColors = {
  primary: "#7A7FEE", // Main purple/blue
  secondary: "#FF6B8B", // Pink/red accent
  tertiary: "#50C4ED", // Light blue accent
  quaternary: "#FFB347", // Orange accent
  success: "#4CAF50", // Green
  warning: "#FFC107", // Yellow/amber
  info: "#2196F3", // Blue
  dark: "#272829", // Dark background
};

// Icon background colors for different categories
export const iconColors = {
  projects: {
    clientPortals: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
    marketplaces: "bg-gradient-to-br from-[#FF6B8B] to-[#FF8E8B]",
    saas: "bg-gradient-to-br from-[#50C4ED] to-[#7A7FEE]",
    ai: "bg-gradient-to-br from-[#9D7FEE] to-[#C77FEE]",
    mobile: "bg-gradient-to-br from-[#FF8E8B] to-[#FFB347]",
    web: "bg-gradient-to-br from-[#7A7FEE] to-[#50C4ED]",
  },
  resources: {
    blog: "bg-gradient-to-br from-[#50C4ED] to-[#7A7FEE]",
    caseStudies: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
    documentation: "bg-gradient-to-br from-[#FFB347] to-[#FF8E8B]",
    api: "bg-gradient-to-br from-[#9D7FEE] to-[#C77FEE]",
    tutorials: "bg-gradient-to-br from-[#FF6B8B] to-[#FF8E8B]",
    community: "bg-gradient-to-br from-[#7A7FEE] to-[#50C4ED]",
  },
  services: {
    development: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
    ai: "bg-gradient-to-br from-[#9D7FEE] to-[#C77FEE]",
    design: "bg-gradient-to-br from-[#FF6B8B] to-[#FF8E8B]",
    devops: "bg-gradient-to-br from-[#50C4ED] to-[#7A7FEE]",
    performance: "bg-gradient-to-br from-[#FFB347] to-[#FF8E8B]",
    analytics: "bg-gradient-to-br from-[#7A7FEE] to-[#50C4ED]",
  },
};

// Resources dropdown data
export const resourcesDropdownData: SubNavItem[][] = [
  [
    {
      title: "Foundation Bubble Template",
      description: "Start your Bubble project with our foundation template",
      href: "https://bubble.io/template/foundation-by-automatic-1673596403969x408542417388568600",
      icon: LayoutGrid,
      color: iconColors.resources.blog,
      external: true,
    },
    {
      title: "Favicon Generator",
      description: "Convert your images to favicons",
      href: "https://favicon.automatic.so/",
      icon: ImageIcon,
      color: iconColors.resources.tutorials,
      external: true,
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team",
      href: "https://x.com/David__Flynn",
      icon: MessageSquare,
      color: iconColors.resources.community,
      external: true,
    },
  ],
];

export const subjects = [
  {
    name: "Computer Science",
    slug: "computer-science",
    description:
      "Core programming concepts and computational thinking fundamentals",
  },
  {
    name: "Information Practices",
    slug: "information-practices",
    description:
      "Data management principles and digital literacy skills development",
  },
  {
    name: "Information Technology",
    slug: "information-technology",
    description: "IT fundamentals covering hardware and software applications",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description:
      "AI concepts exploration and machine learning basics introduction",
  },
  {
    name: "Computer Applications",
    slug: "computer-applications",
    description:
      "Practical software applications and office productivity tools",
  },
] as const;

export const resourceTypes = [
  {
    name: "Notes",
    slug: "notes",
    description: "Comprehensive study notes and summaries in PDF format",
    icon: "BookOpen",
    color: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
  },
  {
    name: "NCERT Books",
    slug: "ncert-books",
    description: "Official NCERT textbooks and reference materials",
    icon: "Book",
    color: "bg-gradient-to-br from-[#FF6B8B] to-[#FF8E8B]",
  },
  {
    name: "Syllabus",
    slug: "syllabus",
    description: "Complete curriculum and course outline",
    icon: "FileText",
    color: "bg-gradient-to-br from-[#50C4ED] to-[#7A7FEE]",
  },
  {
    name: "Previous Year Papers",
    slug: "previous-year-papers",
    description: "Past exam papers and question banks",
    icon: "FileQuestion",
    color: "bg-gradient-to-br from-[#FFB347] to-[#FF8E8B]",
  },
  {
    name: "Recommended books",
    slug: "recommended-books",
    description: "A curated list of recommended books for further reading.",
    icon: "BookOpen",
    color: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
  },
] as const;

export const classesData = {
  "class-9": {
    title: "Class 9",
    slug: "class-9",
    subjects: subjects,
    resources: resourceTypes,
  },
  "class-10": {
    title: "Class 10",
    slug: "class-10",
    subjects: subjects,
    resources: resourceTypes,
  },
  "class-11": {
    title: "Class 11",
    slug: "class-11",
    subjects: subjects,
    resources: resourceTypes,
  },
  "class-12": {
    title: "Class 12",
    slug: "class-12",
    subjects: subjects,
    resources: resourceTypes,
  },
} as const;

// Navigation menu data
export const navigationMenuData = {
  classes: {
    title: "Classes",
    description: "Choose your class to access study materials",
    items: [
      {
        title: "Class 9",
        href: "/class-9",
        description: "Foundation level computer science concepts",
      },
      {
        title: "Class 10",
        href: "/class-10",
        description: "Core programming and IT fundamentals",
      },
      {
        title: "Class 11",
        href: "/class-11",
        description: "Advanced concepts and practical applications",
      },
      {
        title: "Class 12",
        href: "/class-12",
        description: "Comprehensive preparation for board exams",
      },
    ],
  },
  quickLinks: [
    {
      title: "Discover Notes",
      href: "/notes",
      description: "Explore all available notes",
      icon: "Search",
      color: iconColors.resources.blog,
    },
    {
      title: "All Subjects",
      href: "/subjects",
      description: "Browse subjects across all classes",
      icon: "BookOpen",
      color: iconColors.resources.caseStudies,
    },
    {
      title: "Practice Tests",
      href: "/coming-soon",
      description: "Test your knowledge with quizzes",
      icon: "FileQuestion",
      color: iconColors.resources.tutorials,
    },
    {
      title: "Study Plans",
      href: "/coming-soon",
      description: "Structured learning paths",
      icon: "Calendar",
      color: iconColors.resources.documentation,
    },
  ],
  resources: [
    {
      title: "Recommended Books",
      description: "A curated list of recommended books for further reading.",
      href: "https://www.amazon.com/",
      icon: LayoutGrid,
      color: iconColors.resources.blog,
      external: false,
    },
  ],
};

// Helper functions for easy data access
export const getClassBySlug = (slug: string) => {
  return Object.values(classesData).find(
    (classInfo) => classInfo.slug === slug
  );
};

export const getSubjectBySlug = (subjectSlug: string) => {
  return subjects.find((subject) => subject.slug === subjectSlug);
};

export const getResourceBySlug = (resourceSlug: string) => {
  return resourceTypes.find((resource) => resource.slug === resourceSlug);
};

export const getAllClassSlugs = () => {
  return Object.values(classesData).map((classInfo) => classInfo.slug);
};

export const getAllSubjectSlugs = () => {
  return subjects.map((subject) => subject.slug);
};

export const getAllResourceSlugs = () => {
  return resourceTypes.map((resource) => resource.slug);
};
