import Hero from "@/components/landing-page/hero";
import SelectClassSection from "@/components/landing-page/select-class-section";
import StatisticsSection from "@/components/landing-page/statistics-section";
import SupportUsSection from "@/components/landing-page/support-us-section";
import TelegramChannelCTA from "@/components/landing-page/telegram-channel-cta";

export const revalidate = 60 * 60 * 24 * 30; // Revalidate every 1 month

export default function LandingPage() {
  return (
    <>
      <Hero />
      <StatisticsSection />
      <SelectClassSection />
      <TelegramChannelCTA />
      <SupportUsSection />
    </>
  );
}
