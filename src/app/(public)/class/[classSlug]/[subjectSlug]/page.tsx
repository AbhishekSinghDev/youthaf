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
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          href={`/class/${classSlug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {classData.title} Subjects</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]">
            <GraduationCap className="size-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold">{subjectData.name}</h1>
        </div>
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
            {classData.title}
          </span>
        </div>
        {/* <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {subjectData.description}. Access comprehensive study materials and
          resources to excel in your {classData.title} {subjectData.name}{" "}
          curriculum.
        </p> */}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg transition-all ${resource.color}`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {resource.name}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>View resources</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectPage;
