import { Check, Heart, QrCode, Share2 } from "lucide-react";
import Image from "next/image";

const SupportUsSection = () => {
  return (
    <section className="py-20 md:py-24 z-10">
      <div className="mx-auto px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1400px]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-500">
                Support Us
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">
              Help Keep Education Free
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your support helps us create quality content accessible to every
              student
            </p>
          </div>

          {/* Main Content */}
          <div className="rounded-3xl border border-border bg-gradient-to-br from-background to-muted/20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 p-10 md:p-16">
              {/* Left Side - Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    Every Contribution Matters
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether it's ₹10 or ₹1000, your support directly helps us
                    reach more students and create better learning resources.
                  </p>
                </div>

                {/* Impact Points */}
                <div className="space-y-3">
                  {[
                    "Create comprehensive study materials",
                    "Maintain free platform access for all",
                    "Support students without paid courses",
                    "Develop new interactive features",
                  ].map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="text-foreground">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative pl-6 py-4 border-l-4 border-primary">
                  <p className="text-muted-foreground italic">
                    "If our content has helped you succeed, help us support the
                    next generation of learners! 🚀"
                  </p>
                </div>
              </div>

              {/* Right Side - Payment Info */}
              <div className="space-y-6">
                {/* QR Code */}
                <div className="relative">
                  <div className="aspect-square w-full max-w-xs mx-auto bg-white rounded-2xl p-4 shadow-lg border border-border">
                    <div className="relative w-full h-full">
                      <Image
                        src="/ayush-payment-qr.jpeg"
                        alt="UPI Payment QR Code"
                        fill
                        className="object-contain rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg flex items-center gap-1">
                    <QrCode className="w-4 h-4" />
                    Scan to Pay
                  </div>
                </div>

                {/* UPI ID */}
                <div className="bg-muted rounded-xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">UPI ID</p>
                  <p className="font-mono font-semibold text-foreground break-all">
                    ayushpoddar1603@okhdfcbank
                  </p>
                </div>

                {/* Payment Apps */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="border-t border-border bg-muted/30 px-8 py-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Join hundreds of students supporting quality education
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="group px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    Support Now
                  </button>
                  <button className="px-6 py-3 border border-border rounded-xl font-semibold transition-all duration-300 hover:bg-muted hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share with Friends
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportUsSection;
