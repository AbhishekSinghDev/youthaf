import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { classesData } from "@/lib/constant";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const SelectClassSection = () => {
  return (
    <section id="start" className="py-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Select Your Class
          </h2>
        </div>
        <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
          Choose your academic level to access personalized study materials,
          practice tests, and expert guidance tailored to your curriculum
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(classesData).map(([key, classInfo]) => (
          <Card
            key={key}
            className="group cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-[#7A7FEE]/50 overflow-hidden relative backdrop-blur-sm"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

            <CardHeader className="pb-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                {/* <div className="p-4 rounded-xl transition-all duration-500 bg-gradient-to-br from-primary/15 to-primary/15 group-hover:from-primary group-hover:to-primary group-hover:scale-105 group-hover:shadow-lg">
                  <BookOpen className="w-7 h-7 transition-all duration-500 text-primary group-hover:text-white group-hover:scale-110" />
                </div> */}
                {/* <div className="text-right">
                  <div className="text-sm font-medium text-muted-foreground">
                    {classInfo.subjects.length} Subjects
                  </div>
                </div> */}
              </div>

              <CardTitle className="text-2xl text-center font-bold group-hover:text-primary transition-colors duration-500">
                {classInfo.title}
              </CardTitle>

              {/* <CardDescription className="text-base leading-relaxed">
                Comprehensive study materials for{" "}
                {classInfo.title.toLowerCase()} students
              </CardDescription> */}
            </CardHeader>

            <CardContent className="pt-0 relative z-10">
              {/* Subjects Preview */}
              {/* <div className="mb-6">
                <div className="text-sm font-semibold text-muted-foreground mb-3">
                  Available Subjects:
                </div>
                <div className="flex flex-wrap gap-2">
                  {classInfo.subjects.slice(0, 2).map((subject, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted/80 text-muted-foreground font-medium border"
                    >
                      {subject.name}
                    </span>
                  ))}
                  {classInfo.subjects.length > 2 && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] font-medium border border-[#7A7FEE]/20">
                      +{classInfo.subjects.length - 2} more
                    </span>
                  )}
                </div>
              </div> */}

              {/* Select Button */}
              <Link
                href={`/class/${classInfo.slug}`}
                className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-500 ease-out flex items-center justify-center gap-3 bg-muted/60 hover:bg-muted text-foreground border-2 border-transparent hover:border-primary/20 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 group-hover:shadow-lg transform-gpu"
              >
                <span>Select Class</span>
                <ArrowRight className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each class includes comprehensive study materials, practice
            questions, sample papers, and expert guidance to help you excel in
            your academic journey. Select your class to get started with
            personalized learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelectClassSection;
