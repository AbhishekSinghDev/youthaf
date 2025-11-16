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
    <div className="py-20 md:py-24">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Select Subject
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            {classData.title}{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Subjects
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your subject to access comprehensive study materials,
            practice tests, and resources tailored to your curriculum
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {classData.subjects.map((subject, index) => {
            const colors = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-orange-500 to-red-500",
              "from-green-500 to-emerald-500",
              "from-indigo-500 to-purple-500",
              "from-pink-500 to-rose-500",
            ];
            const bgColors = [
              "bg-blue-500/5",
              "bg-purple-500/5",
              "bg-orange-500/5",
              "bg-green-500/5",
              "bg-indigo-500/5",
              "bg-pink-500/5",
            ];
            const borderColors = [
              "border-blue-500/20",
              "border-purple-500/20",
              "border-orange-500/20",
              "border-green-500/20",
              "border-indigo-500/20",
              "border-pink-500/20",
            ];

            return (
              <Link
                href={`/class/${classSlug}/${subject.slug}`}
                key={subject.slug}
              >
                <Card
                  className={`group cursor-pointer border ${
                    borderColors[index % 6]
                  } ${
                    bgColors[index % 6]
                  } transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                >
                  <CardHeader className="pb-4">
                    <div className="mb-4">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${
                          colors[index % 6]
                        } shadow-lg transition-transform duration-300 group-hover:scale-110`}
                      >
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {subject.name}
                    </CardTitle>

                    <CardDescription className="text-sm leading-relaxed">
                      {subject.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {classData.resources.length} Resources
                      </span>
                      <div className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                        <span className="font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
