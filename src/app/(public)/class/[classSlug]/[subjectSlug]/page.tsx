import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClassBySlug, getSubjectBySlug } from "@/lib/constant";
import {
  ArrowLeft,
  ArrowRight,
  Book,
  BookOpen,
  FileQuestion,
  FileText,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SubjectPageProps {
  params: Promise<{ classSlug: string; subjectSlug: string }>;
}

const iconMap = {
  BookOpen,
  Book,
  FileText,
  FileQuestion,
};

const SubjectPage = async ({ params }: SubjectPageProps) => {
  const { classSlug, subjectSlug } = await params;

  // Find the class and subject data using helper functions
  const classData = getClassBySlug(classSlug);
  const subjectData = getSubjectBySlug(subjectSlug);

  if (!classData || !subjectData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href={`/class/${classSlug}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {classData.title} Subjects</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE] shadow-lg">
            <GraduationCap className="size-5 md:size-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {subjectData.name}
          </h1>
        </div>
        <div className="mb-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            {classData.title}
          </span>
        </div>
        <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
          {subjectData.description}. Access comprehensive study materials and
          resources to excel in your {classData.title} {subjectData.name}{" "}
          curriculum.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classData.resources.map((resource) => {
          const IconComponent = iconMap[resource.icon as keyof typeof iconMap];
          const subjectResourceLink =
            classData.subjectResourceLinks[subjectSlug][resource.slug];

          return (
            <Link
              href={`${subjectResourceLink}`}
              key={resource.slug}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card
                key={resource.slug}
                className="group cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-[#7A7FEE]/50 overflow-hidden relative backdrop-blur-sm"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                <CardHeader className="pb-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-4 rounded-xl transition-all duration-500 ${resource.color} group-hover:scale-105 group-hover:shadow-lg`}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-500 mb-2">
                    {resource.name}
                  </CardTitle>

                  <CardDescription className="text-base leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  {/* Access Button */}
                  <div className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-500 ease-out flex items-center justify-center gap-3 bg-muted/60 hover:bg-muted text-foreground border-2 border-transparent hover:border-primary/20 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 group-hover:shadow-lg transform-gpu">
                    <span>Explore {resource.name}</span>
                    <ArrowRight className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
          <h3 className="text-xl font-semibold mb-4">
            Complete Learning Resources
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Access all the study materials you need for {classData.title}{" "}
            {subjectData.name}. From comprehensive notes to practice papers,
            we&apos;ve got everything covered for your academic success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
