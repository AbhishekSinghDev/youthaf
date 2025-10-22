import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClassBySlug } from "@/lib/constant";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ClassPageProps {
  params: Promise<{ classSlug: string }>;
}

const ClassPage = async ({ params }: ClassPageProps) => {
  const { classSlug } = await params;

  // Find the class data using helper function
  const classData = getClassBySlug(classSlug);

  if (!classData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE]">
            <GraduationCap className="size-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold">{classData.title} Subjects</h1>
        </div>
        {/* <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Choose your subject to access comprehensive study materials, practice
          tests, and resources tailored to your {classData.title} curriculum
        </p> */}
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {classData.subjects.map((subject, index) => (
          <Link href={`/class/${classSlug}/${subject.slug}`} key={subject.slug}>
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-primary/15 group-hover:from-primary group-hover:to-primary transition-all">
                    <BookOpen className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {classData.resources.length} Resources
                  </div>
                </div>

                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                  {subject.name}
                </CardTitle>

                <CardDescription className="text-sm">
                  {subject.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Explore subject</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
