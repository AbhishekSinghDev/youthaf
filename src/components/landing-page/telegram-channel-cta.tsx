import { Bell, MessageCircle, Send, Users } from "lucide-react";
import Link from "next/link";

const TelegramChannelCTA = () => {
  return (
    <section className="py-20 md:py-24 z-10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-10 md:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6 text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Join Community</span>
                </div>

                {/* Heading */}
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    Connect on Telegram
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Join 5,000+ students getting instant study updates, notes,
                    and exam tips right in their pocket
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                    <span className="text-white/90">
                      Daily study material updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-white/90">
                      Connect with fellow students
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-white/90">
                      Get exam tips & announcements
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="https://t.me/YouthAf" target="_blank">
                  <button className="group mt-4 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-white/25 hover:-translate-y-0.5 flex items-center gap-2">
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    Join Telegram Channel
                  </button>
                </Link>
              </div>

              {/* Right Visual */}
              <div className="relative">
                {/* Main card */}
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      {/* Icon */}
                      <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-xl">
                        <Send className="w-12 h-12 text-blue-600" />
                      </div>

                      {/* Text */}
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-white">
                          @YouthAF
                        </div>
                        <div className="text-white/70">Telegram Channel</div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-center gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">
                            5K+
                          </div>
                          <div className="text-xs text-white/70">Members</div>
                        </div>
                        <div className="w-px h-8 bg-white/20" />
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">
                            Daily
                          </div>
                          <div className="text-xs text-white/70">Updates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white font-bold">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramChannelCTA;
