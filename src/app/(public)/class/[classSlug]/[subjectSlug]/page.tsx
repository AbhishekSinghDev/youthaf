import { getClassBySlug, getSubjectBySlug } from "@/lib/constant";
import {
  ArrowLeft,
  ArrowRight,
  Book,
  BookOpen,
  FileQuestion,
  FileText,
  GraduationCap,
  Sparkles,
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
    <div className="min-h-screen">
      {/* Hero Section with Background Pattern */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] py-12 md:py-20">
          {/* Back Navigation */}
          <Link
            href={`/class/${classSlug}`}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10 group-hover:-translate-x-1">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to {classData.title} Subjects</span>
          </Link>

          {/* Header Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{classData.title}</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {subjectData.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {subjectData.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-muted-foreground">
                  {classData.resources.length} Resources Available
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Free Access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-muted-foreground">Updated Regularly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Study Materials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Available Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated collection of study materials
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {classData.resources.map((resource, index) => {
              const IconComponent =
                iconMap[resource.icon as keyof typeof iconMap];
              // @ts-ignore - Dynamic key access
              const subjectResourceLink =
                classData.subjectResourceLinks[subjectSlug]?.[resource.slug];

              const gradientConfigs = [
                {
                  bg: "from-blue-500/10 to-cyan-500/10",
                  border: "border-blue-500/20",
                  iconBg: "from-blue-500 to-cyan-500",
                  textHover: "group-hover:text-blue-600",
                },
                {
                  bg: "from-purple-500/10 to-pink-500/10",
                  border: "border-purple-500/20",
                  iconBg: "from-purple-500 to-pink-500",
                  textHover: "group-hover:text-purple-600",
                },
                {
                  bg: "from-orange-500/10 to-red-500/10",
                  border: "border-orange-500/20",
                  iconBg: "from-orange-500 to-red-500",
                  textHover: "group-hover:text-orange-600",
                },
                {
                  bg: "from-green-500/10 to-emerald-500/10",
                  border: "border-green-500/20",
                  iconBg: "from-green-500 to-emerald-500",
                  textHover: "group-hover:text-green-600",
                },
              ];

              const config = gradientConfigs[index % 4];

              return (
                <Link
                  href={`${subjectResourceLink}`}
                  key={resource.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border ${config.border} bg-gradient-to-br ${config.bg} p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                  >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />

                    <div className="relative space-y-4">
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${config.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3
                          className={`text-2xl font-bold transition-colors duration-300 ${config.textHover}`}
                        >
                          {resource.name}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-semibold pt-2">
                        <span className="transition-colors duration-300 group-hover:text-primary">
                          Access Now
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-10 md:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-white">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Need More Help?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Join our Telegram community to get instant updates, discuss with
                fellow students, and never miss important study materials.
              </p>
              <div className="pt-4">
                <Link
                  href="https://t.me/YouthAf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-white/25 hover:-translate-y-0.5"
                >
                  Join Our Community
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectPage;
