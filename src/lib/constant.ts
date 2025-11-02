export const EMAIL_LOGIN_OTP_LENGTH = 6;

import { LayoutGrid } from "lucide-react";

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
  {
    name: "Information Technology",
    slug: "information-technology",
    description: "IT fundamentals covering hardware and software applications",
  },
  {
    name: "Web Applications",
    slug: "web-applications",
    description:
      "Development of web-based applications using modern frameworks and technologies.",
  },
  {
    name: "Data Science",
    slug: "data-science",
    description:
      "Introduction to data analysis, visualization, and machine learning concepts.",
  },
  {
    name: "Employability Skills",
    slug: "employability-skills",
    description:
      "Essential skills for career readiness and workplace effectiveness.",
  },
] as const;

export const resourceTypes = [
  {
    name: "Syllabus",
    slug: "syllabus",
    description: "Complete curriculum and course outline",
    icon: "FileText",
    color: "bg-gradient-to-br from-[#50C4ED] to-[#7A7FEE]",
  },
  {
    name: "NCERT Books",
    slug: "ncert-books",
    description: "Official NCERT textbooks and reference materials",
    icon: "Book",
    color: "bg-gradient-to-br from-[#FF6B8B] to-[#FF8E8B]",
  },
  {
    name: "Notes",
    slug: "notes",
    description: "Comprehensive study notes and summaries in PDF format",
    icon: "BookOpen",
    color: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
  },
  {
    name: "Recommended books",
    slug: "recommended-books",
    description: "A curated list of recommended books for further reading.",
    icon: "BookOpen",
    color: "bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]",
  },
  {
    name: "Previous Year Papers",
    slug: "previous-year-papers",
    description: "Past exam papers and question banks",
    icon: "FileQuestion",
    color: "bg-gradient-to-br from-[#FFB347] to-[#FF8E8B]",
  },
] as const;

export const classesData = {
  "class-9": {
    title: "Class 9",
    slug: "class-9",
    subjects: subjects,
    resources: resourceTypes,
    subjectResourceLinks: {
      "computer-science": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_9&subject=computer_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-practices": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_9&subject=information_practices",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "artificial-intelligence": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/sec/417-AI-IX.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/secondary/AI_Facilitators_Handbook_IX.pdf",
        notes: "/notes?class=class_9&subject=artificial_intelligence",
        "recommended-books":
          "https://www.amazon.in/hz/wishlist/ls/1GST48GTJV42Z?ref_=wl_share",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-technology": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/sec/402-IT-IX.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum25/publication/secondary/402_IT_IX.pdf",
        notes: "/notes?class=class_9&subject=information_technology",
        "recommended-books":
          "https://www.amazon.in/hz/wishlist/ls/1ATCVFW6XO0LT?ref_=wl_share",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "computer-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Computer_Applications_Sec_2025-26.pdf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_9&subject=computer_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "web-applications": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_9&subject=web_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "data-science": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/codeingDS/classIX_DS_Student_Handbook.pdf",
        notes: "/notes?class=class_9&subject=data_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "employability-skills": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/Sec/EmployabilitySkills_IX.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/secondary/Employability_Skills_IX.pdf",
        notes: "/notes?class=class_9&subject=employability_skills",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
    },
  },
  "class-10": {
    title: "Class 10",
    slug: "class-10",
    subjects: subjects,
    resources: resourceTypes,
    subjectResourceLinks: {
      "computer-science": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_10&subject=computer_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-practices": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_10&subject=information_practices",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "artificial-intelligence": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/sec/417-AI-X.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/secondary/AI_Facilitators_Handbook_X.pdf",
        notes: "/notes?class=class_10&subject=artificial_intelligence",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-technology": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/sec/402-IT-X.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum25/publication/secondary/402_IT_X.pdf",
        notes: "/notes?class=class_10&subject=information_technology",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "computer-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Computer_Applications_Sec_2025-26.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/doc/2014/12_ICT-X.pdf",
        notes: "/notes?class=class_10&subject=computer_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "web-applications": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books": "https://t.me/YouthAf",
        notes: "/notes?class=class_10&subject=web_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "data-science": {
        syllabus: "https://t.me/YouthAf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/codeingDS/classX_DS_Student_Handbook.pdf",
        notes: "/notes?class=class_10&subject=data_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "employability-skills": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/sec/EmployabilitySkills_X.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/secondary/Employability_Skills10.pdf",
        notes: "/notes?class=class_10&subject=employability_skills",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
    },
  },
  "class-11": {
    title: "Class 11",
    slug: "class-11",
    subjects: subjects,
    resources: resourceTypes,
    subjectResourceLinks: {
      "computer-science": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Computer_Science_SrSec_2025-26.pdf",
        "ncert-books": "https://ncert.nic.in/textbook.php?lecs1=0-13",
        notes: "/notes?class=class_11&subject=computer_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-practices": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Informatics_Practices_SrSec_2025-26.pdf",
        "ncert-books": "https://ncert.nic.in/textbook.php?keip1=0-8",
        notes: "/notes?class=class_11&subject=information_practices",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "artificial-intelligence": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/843-AI-XI.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum25/publication/srsec/843_AI_Student_HandbookXI.pdf",
        notes: "/notes?class=class_11&subject=artificial_intelligence",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-technology": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/802-IT.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/srsec/802-IT-Class-XI.pdf",
        notes: "/notes?class=class_11&subject=information_technology",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "computer-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/817-TYPOGRAPHY-COMPUTER-APPLICATIONS_XI.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/srsec/817_Typo_&_Com_Appl_XI.pdf",
        notes: "/notes?class=class_11&subject=computer_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "web-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/803-WebApplication_XI.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/srsec/803-WebApplication-XI.pdf",
        notes: "/notes?class=class_11&subject=web_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "data-science": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum25/SrSec/844-DATASCIENCE.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/codeingDS/classXI_DS_Student_Handbook.pdf",
        notes: "/notes?class=class_11&subject=data_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "employability-skills": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/EmployabilitySkills_XI.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/srsec/Employability_Skills_XI.pdf",
        notes: "/notes?class=class_11&subject=employability_skills",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
    },
  },
  "class-12": {
    title: "Class 12",
    slug: "class-12",
    subjects: subjects,
    resources: resourceTypes,
    subjectResourceLinks: {
      "computer-science": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Computer_Science_SrSec_2025-26.pdf",
        "ncert-books": "https://ncert.nic.in/textbook.php?lecs1=0-13",
        notes: "/notes?class=class_12&subject=computer_science",
        "recommended-books":
          "https://www.amazon.in/hz/wishlist/ls/1E2EJ7FM3EMNS?ref_=wl_share",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-practices": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Informatics_Practices_SrSec_2025-26.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/srsec/803-WebApplication-XI.pdf",
        notes: "/notes?class=class_12&subject=information_practices",
        "recommended-books":
          "https://www.amazon.in/hz/wishlist/ls/2V7X9WORA3AC6?ref_=wl_share",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "artificial-intelligence": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/843-AI-XII.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/srsec/AI_Student_HandbookXII.pdf",
        notes: "/notes?class=class_12&subject=artificial_intelligence",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "information-technology": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/802-IT.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/srsec/802-Information Technology Class- XII.pdf",
        notes: "/notes?class=class_12&subject=information_technology",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "computer-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/817-TYPOGRAPHY-COMPUTER-APPLICATIONS_XII.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/srsec/817-Typograhpy&Comp. class- XII.PDF",
        notes: "/notes?class=class_12&subject=computer_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "web-applications": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/803-WebApplication_XII.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum26/publication/srsec/803-WebApplication-XII.pdf",
        notes: "/notes?class=class_12&subject=web_applications",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "data-science": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum25/SrSec/844-DATASCIENCE.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/codeingDS/classXII_DS_Student_Handbook.pdf",
        notes: "/notes?class=class_12&subject=data_science",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
      "employability-skills": {
        syllabus:
          "https://cbseacademic.nic.in/web_material/Curriculum26/SrSec/EmployabilitySkills_XII.pdf",
        "ncert-books":
          "https://cbseacademic.nic.in/web_material/Curriculum21/publication/srsec/Employability_Skills_XII.pdf",
        notes: "/notes?class=class_12&subject=employability_skills",
        "recommended-books": "https://t.me/YouthAf",
        "previous-year-papers": "https://t.me/YouthAf",
      },
    },
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

export const ayushSocials = {
  instagram: "https://www.instagram.com/ayush.poddar/",
  linkedin: "https://www.linkedin.com/in/ayush-poddar-8bb739245/",
  youtube: "https://www.youtube.com/@YouthAf",
  twitter: "https://x.com/AyushPoddar2003",
  telegram: "https://t.me/YouthAf",
};

export const abhishekSocials = {
  website: "https://abhisheksingh.me",
  instagram: "https://www.instagram.com/abhishek.singhu?igsh=N2hrNW1hNjk4c3Rq",
  linkedin: "https://www.linkedin.com/in/abhishek-singh-dev/",
  github: "https://github.com/AbhishekSinghDev",
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

// New helper function to get resources with subject-specific links
export const getSubjectResourcesWithLinks = (
  classSlug: string,
  subjectSlug: string
) => {
  const classData = getClassBySlug(classSlug);
  if (
    !classData ||
    !classData.subjectResourceLinks ||
    !classData.subjectResourceLinks[
      subjectSlug as keyof typeof classData.subjectResourceLinks
    ]
  ) {
    return [];
  }

  const subjectLinks =
    classData.subjectResourceLinks[
      subjectSlug as keyof typeof classData.subjectResourceLinks
    ];

  return resourceTypes.map((resource) => ({
    ...resource,
    href: subjectLinks[resource.slug as keyof typeof subjectLinks],
  }));
};

// New helper function to get specific resource link for a class and subject
export const getSubjectResourceLink = (
  classSlug: string,
  subjectSlug: string,
  resourceSlug: string
) => {
  const classData = getClassBySlug(classSlug);
  if (
    !classData ||
    !classData.subjectResourceLinks ||
    !classData.subjectResourceLinks[
      subjectSlug as keyof typeof classData.subjectResourceLinks
    ]
  ) {
    return null;
  }

  const subjectLinks =
    classData.subjectResourceLinks[
      subjectSlug as keyof typeof classData.subjectResourceLinks
    ];
  return subjectLinks[resourceSlug as keyof typeof subjectLinks];
};
