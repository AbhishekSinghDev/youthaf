import { abhishekSocials, ayushSocials, subjects } from "@/lib/constant";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import {
  BookOpen,
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
      <section className="py-20 md:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Meet the{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Team
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Passionate educators and content creators dedicated to making
              Computer Science education accessible and engaging for students
              across Classes 9-12.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the people behind YouthAF
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Founder - Ayush Poddar */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-8">
                {/* Image with decorative elements */}
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-background shadow-xl transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/ayush.jpeg"
                        alt="Ayush Poddar"
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Status badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-full border-4 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">Ayush Poddar</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Founder
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  Software Engineer & Passionate Educator helping students
                  master Computer Science fundamentals through engaging YouTube
                  tutorials.
                </p>

                {/* Social Links */}
                <div className="flex gap-2 justify-center pt-4 border-t border-border">
                  <Link
                    href={ayushSocials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={ayushSocials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Youtube className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={ayushSocials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={ayushSocials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-black flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Co-Founder */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-8">
                {/* Image with decorative elements */}
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-background shadow-xl transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/abhishek.jpeg"
                        alt="Abhishek Singh"
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Status badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-4 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">Abhishek Singh</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Co-Founder
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  Based in Delhi, I'm a Fullstack developer passionate about
                  building modern web applications that users love.
                </p>

                {/* Social Links */}
                <div className="flex gap-2 justify-center pt-4 border-t border-border">
                  <Link
                    href={abhishekSocials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <IconWorld className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={abhishekSocials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-black flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <IconBrandGithub className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={abhishekSocials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                  <Link
                    href={abhishekSocials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-8">
                {/* Image with decorative elements */}
                <div className="relative mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-background shadow-xl transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/vinan.jpeg"
                        alt="Vinan Yadav"
                        width={1000}
                        height={1000}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Status badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-4 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">Viman Yadav</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    Content Editor
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  Video editor passionate about creating engaging educational
                  content. Brings fresh perspective and creative storytelling to
                  make learning more visual.
                </p>

                {/* Social Links */}
                <div className="flex gap-2 justify-center pt-4 border-t border-border">
                  <Link
                    href="https://www.instagram.com/vimanshu__yadav?igsh=MXNxbHN4NGNjZTdsbw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-9 h-9 rounded-lg bg-muted hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Instagram className="w-4 h-4 text-muted-foreground group-hover/social:text-white transition-colors" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Why Choose Us</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Combining expertise with passion for education
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="group relative rounded-3xl border border-border bg-gradient-to-br from-blue-500/5 to-cyan-500/5 p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Team</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our diverse team combines years of software development
                  experience with educational expertise. We bring real-world
                  programming knowledge to make learning engaging and practical.
                </p>
              </div>

              <div className="group relative rounded-3xl border border-border bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Educational Focus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in making complex Computer Science concepts simple
                  and accessible. Our goal is to inspire the next generation of
                  programmers and problem solvers through quality content.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted/50 to-muted/30 p-10 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Our journey combines technical rigor with educational passion.
                  We're dedicated to creating content that not only teaches but
                  inspires students to explore the fascinating world of computer
                  science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Teach Section */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Curriculum
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">What We Teach</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive Computer Science Education for Classes 9-12
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subjects.slice(0, 6).map((subject, index) => {
              const icons = ["💻", "🐍", "🤖", "📱", "🌐", "📊"];
              return (
                <div
                  key={subject.slug}
                  className="group relative rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">{icons[index]}</div>
                  <h3 className="text-xl font-bold mb-3">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {subject.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20">
                <Heart className="w-10 h-10 text-pink-500" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">Our Mission</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                To democratize quality Computer Science education and make it
                accessible to every student. We believe that with the right
                guidance and resources, anyone can master programming and
                technology concepts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    50,000+
                  </div>
                  <p className="text-muted-foreground mt-2">Students Taught</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 shadow-lg">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-br from-red-500 to-pink-500 bg-clip-text text-transparent">
                    60+
                  </div>
                  <p className="text-muted-foreground mt-2">Video Tutorials</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {subjects.length}
                  </div>
                  <p className="text-muted-foreground mt-2">Subjects Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-12 md:p-16 text-center">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-8 text-white">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Let's Connect
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                  Have questions or want to collaborate? We'd love to hear from
                  you!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href={ayushSocials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-white/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </Link>
                  <Link
                    href={ayushSocials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Telegram
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
