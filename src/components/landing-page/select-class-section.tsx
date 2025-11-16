import { classesData } from "@/lib/constant";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

const SelectClassSection = () => {
  return (
    <section id="start" className="py-20 md:py-24 z-10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Choose Your Path
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold">Select Your Class</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access tailored study materials, practice tests, and resources
            designed for your grade level
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {Object.entries(classesData).map(([key, classInfo], index) => {
            const colors = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-orange-500 to-red-500",
              "from-green-500 to-emerald-500",
            ];
            const bgColors = [
              "bg-blue-500/5",
              "bg-purple-500/5",
              "bg-orange-500/5",
              "bg-green-500/5",
            ];
            const borderColors = [
              "border-blue-500/20",
              "border-purple-500/20",
              "border-orange-500/20",
              "border-green-500/20",
            ];

            return (
              <Link key={key} href={`/class/${classInfo.slug}`}>
                <div
                  className={`group relative p-6 rounded-2xl border ${borderColors[index]} ${bgColors[index]} transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colors[index]} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        {classInfo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {classInfo.subjects.length} subjects available
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted/50 to-muted/30 p-10 md:p-12">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="text-center space-y-4">
              <div className="text-4xl">🎯</div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Everything You Need to Excel
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive notes, practice questions, and exam papers crafted
                by students who've been exactly where you are
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium pt-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Made by students, for students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectClassSection;
