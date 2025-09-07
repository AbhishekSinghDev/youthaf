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
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE] shadow-lg">
            <GraduationCap className="size-5 md:size-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {classData.title} Subjects
          </h1>
        </div>
        <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
          Choose your subject to access comprehensive study materials, practice
          tests, and resources tailored to your {classData.title} curriculum
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classData.subjects.map((subject, index) => (
          <Link href={`/class/${classSlug}/${subject.slug}`}>
            <Card
              key={subject.slug}
              className="group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-[#7A7FEE]/50 overflow-hidden relative backdrop-blur-sm"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-4 rounded-xl transition-all duration-500 bg-gradient-to-br from-primary/15 to-primary/15 group-hover:from-primary group-hover:to-primary group-hover:scale-105 group-hover:shadow-lg">
                    <BookOpen className="w-7 h-7 transition-all duration-500 text-primary group-hover:text-white group-hover:scale-110" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-muted-foreground">
                      {classData.resources.length} Resources
                    </div>
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-500 mb-2">
                  {subject.name}
                </CardTitle>

                <CardDescription className="text-base leading-relaxed">
                  {subject.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                {/* Resources Preview */}
                {/* <div className="mb-6">
                <div className="text-sm font-semibold text-muted-foreground mb-3">
                  Available Resources:
                </div>
                <div className="flex flex-wrap gap-2">
                  {classData.resources.slice(0, 2).map((resource, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted/80 text-muted-foreground font-medium border"
                    >
                      {resource.name}
                    </span>
                  ))}
                  {classData.resources.length > 2 && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] font-medium border border-[#7A7FEE]/20">
                      +{classData.resources.length - 2} more
                    </span>
                  )}
                </div>
              </div> */}

                {/* Select Button */}
                <div className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-500 ease-out flex items-center justify-center gap-3 bg-muted/60 hover:bg-muted text-foreground border-2 border-transparent hover:border-primary/20 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 group-hover:shadow-lg transform-gpu">
                  <span>Explore Subject</span>
                  <ArrowRight className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each subject includes comprehensive notes, NCERT books, syllabus,
            and previous year question papers to help you excel in your{" "}
            {classData.title} studies. Select a subject to access all available
            resources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
