import { Bell, MessageCircle, Users } from "lucide-react";
import Link from "next/link";
import Logo from "../shared/logo";

const TelegramChannelCTA = () => {
  return (
    <div className="bg-gradient-to-r z-10 from-primary via-[#7A7FEE] to-primary p-4 md:p-8 rounded-2xl shadow-xl my-8 dark:from-primary dark:via-[#7A7FEE] dark:to-primary">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Left Content */}
        <div className="flex-1 text-primary-foreground text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground/80" />
            <span className="text-primary-foreground/80 font-medium text-xs md:text-sm uppercase tracking-wide">
              Join Our Community
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
            YouthAF Telegram Channel
          </h2>

          <p className="text-primary-foreground/90 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
            Get instant access to study materials, notes, and updates for
            classes 9-12. Connect with fellow students, receive exam tips, and
            never miss important announcements from our YouTube channel YouthAF.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground/80 text-sm md:text-base">
                2700+ Students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground/80 text-sm md:text-base">
                Study Updates
              </span>
            </div>
          </div>

          <Link
            href="https://t.me/YouthAf"
            className="bg-background text-foreground font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-secondary transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-base md:text-lg border border-border w-fit mx-auto md:mx-0"
            target="_blank"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            Join Study Group
          </Link>
        </div>

        {/* Right Image/Icon */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-background/10 rounded-3xl backdrop-blur-sm border border-background/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <Logo />
                </div>
                <div className="text-primary-foreground">
                  <div className="text-xl md:text-2xl font-bold mb-1">
                    Telegram
                  </div>
                  <div className="text-primary-foreground/70 text-xs md:text-sm">
                    @YouthAF
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification badges */}
            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-xs font-bold">
                5
              </span>
            </div>

            <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-10 h-10 md:w-12 md:h-12 bg-[#7A7FEE] rounded-full flex items-center justify-center shadow-lg">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramChannelCTA;
