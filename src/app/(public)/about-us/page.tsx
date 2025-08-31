import { ayushSocials, subjects } from "@/lib/constant";
import {
  Code,
  GraduationCap,
  Heart,
  Instagram,
  Linkedin,
  Send,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/ayush.jpeg"
                    alt="Ayush Poddar"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Code className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Hi, I'm <span className="text-primary">Ayush Poddar</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Software Engineer, Passionate Educator & Content Creator helping
                students master Computer Science fundamentals through engaging
                YouTube tutorials.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href={ayushSocials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </Link>
                <Link
                  href={ayushSocials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  YouTube
                </Link>
                <Link
                  href={ayushSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </Link>
                <Link
                  href={ayushSocials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Software Engineer</h3>
              </div>
              <p className="text-muted-foreground">
                With years of experience in software development, I bring
                real-world programming expertise to my teaching. I love creating
                solutions that solve complex problems and enjoy sharing this
                passion with my students.
              </p>
            </div>

            <div className="card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Passionate Educator</h3>
              </div>
              <p className="text-muted-foreground">
                Teaching is my calling. I believe in making complex Computer
                Science concepts simple and accessible. My goal is to inspire
                the next generation of programmers and problem solvers.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              My journey combines the technical rigor of software engineering
              with the joy of education. I'm dedicated to creating content that
              not only teaches but inspires students to explore the fascinating
              world of computer science. Every line of code I write and every
              lesson I teach is driven by my passion for technology and
              learning.
            </p>
          </div>
        </div>
      </section>

      {/* What I Teach Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-4">
            What I Teach
          </h2>
          <p className="section-subtitle text-center mb-12">
            Comprehensive Computer Science Education for Classes 9-12
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.slice(0, 6).map((subject, index) => (
              <div
                key={subject.slug}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">
                  {subject.name.includes("Computer Science")
                    ? "⚡"
                    : subject.name.includes("Information Practices")
                    ? "🐍"
                    : subject.name.includes("Artificial Intelligence")
                    ? "🤖"
                    : subject.name.includes("Information Technology")
                    ? "💻"
                    : subject.name.includes("Computer Applications")
                    ? "📱"
                    : subject.name.includes("Web Applications")
                    ? "🌐"
                    : subject.name.includes("Data Science")
                    ? "📊"
                    : "💻"}
                </div>
                <h3 className="text-lg font-semibold mb-3">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {subject.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="section-title text-4xl font-bold mb-6">My Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            To democratize quality Computer Science education and make it
            accessible to every student. I believe that with the right guidance
            and resources, anyone can master programming and technology
            concepts, regardless of their background.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">50,000+</h3>
              <p className="text-sm text-muted-foreground">Students Taught</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">60+</h3>
              <p className="text-sm text-muted-foreground">Video Tutorials</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">{subjects.length}</h3>
              <p className="text-sm text-muted-foreground">Subjects Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-4xl font-bold mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Have questions or want to collaborate? I'd love to hear from you!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={ayushSocials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </Link>
            <Link
              href={ayushSocials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
              Telegram
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
