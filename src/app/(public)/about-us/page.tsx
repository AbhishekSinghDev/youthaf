import { abhishekSocials, ayushSocials, subjects } from "@/lib/constant";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
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
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
            Passionate educators and content creators dedicated to make Computer
            Science education accessible and engaging for students across
            Classes 9-12.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-12">
            Our Team
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {/* Founder - Ayush Poddar */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="relative mb-3">
                <div className="size-60 rounded-2xl overflow-hidden mx-auto shadow-lg">
                  <Image
                    src="/ayush.jpeg"
                    alt="Ayush Poddar"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">Ayush Poddar</h3>
              <p className="text-primary font-semibold mb-4">Founder</p>
              <p className="text-muted-foreground mb-6 text-sm">
                Software Engineer & Passionate Educator helping students master
                Computer Science fundamentals through engaging YouTube
                tutorials.
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href={ayushSocials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href={ayushSocials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </Link>
                <Link
                  href={ayushSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link
                  href={ayushSocials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Co-Founder */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="relative mb-3">
                <div className="size-60 rounded-2xl overflow-hidden mx-auto shadow-lg">
                  <Image
                    src="/abhishek.jpeg"
                    alt="Abhishek Singh"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">Abhishek Singh</h3>
              <p className="text-blue-600 font-semibold mb-4">Co-Founder</p>
              <p className="text-muted-foreground mb-6 text-sm">
                Based in Delhi, I'm a Fullstack developer passionate about
                building a modern web application that users love.
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href={abhishekSocials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <IconWorld className="w-4 h-4" />
                </Link>
                <Link
                  href={abhishekSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black text-white rounded-lg transition-colors"
                >
                  <IconBrandGithub className="w-4 h-4" />
                </Link>
                <Link
                  href={abhishekSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link
                  href={abhishekSocials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Editor */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="relative mb-3">
                <div className="size-60 rounded-2xl overflow-hidden mx-auto shadow-lg">
                  <Image
                    src="/vinan.jpeg"
                    alt="Vinan Yadav"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">Viman Yadav</h3>
              <p className="text-green-600 font-semibold mb-4">
                Content Editor
              </p>
              <p className="text-muted-foreground mb-6 text-sm">
                Video editor passionate about creating engaging educational
                content. Brings fresh perspective and creative storytelling to
                make learning more visual and accessible.
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href="https://www.instagram.com/vimanshu__yadav?igsh=MXNxbHN4NGNjZTdsbw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-12">
            About Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Team</h3>
              </div>
              <p className="text-muted-foreground">
                Our diverse team combines years of software development
                experience with educational expertise. We bring real-world
                programming knowledge to make learning engaging and practical.
              </p>
            </div>

            <div className="card p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Educational Focus</h3>
              </div>
              <p className="text-muted-foreground">
                We believe in making complex Computer Science concepts simple
                and accessible. Our goal is to inspire the next generation of
                programmers and problem solvers through quality content.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Our journey combines technical rigor with educational passion.
              We're dedicated to creating content that not only teaches but
              inspires students to explore the fascinating world of computer
              science. Every resource we create is driven by our collective
              passion for technology and learning.
            </p>
          </div>
        </div>
      </section>

      {/* What We Teach Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl font-bold text-center mb-4">
            What We Teach
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
          <h2 className="section-title text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            To democratize quality Computer Science education and make it
            accessible to every student. We believe that with the right guidance
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
            Have questions or want to collaborate? We'd love to hear from you!
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
