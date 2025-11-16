import { BookOpen, Clock, Users } from "lucide-react";

const StatisticsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Students Helped",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: BookOpen,
      value: "100+",
      label: "Free Resources",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Platform Access",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  return (
    <section className="py-16 md:py-20 z-10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl border ${stat.borderColor} ${stat.bgColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-1">
                <div
                  className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-base font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>

              {/* Hover effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
