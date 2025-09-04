import Image from "next/image";

const SupportUsSection = () => {
  return (
    <section className="py-16 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Support Our Mission!
          </h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            Help us continue providing quality educational content for students
            worldwide
          </p>
        </div>

        {/* Main Content Card */}
        <div className="card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div>
                <h3 className="section-subtitle text-2xl mb-4">
                  Empower Learning Together
                </h3>
                <div className="space-y-4 text-foreground">
                  <p className="text-lg leading-relaxed">
                    <strong>
                      Help us create more quality educational content
                    </strong>{" "}
                    for students who need accessible learning resources.
                  </p>
                  <p className="leading-relaxed">
                    Your contribution, whether ₹10 or ₹1000, makes a real
                    difference! Every donation helps us:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>Develop comprehensive course materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>Maintain our free learning platform</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span>
                        Support students who can't afford paid courses
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground italic border-l-4 border-accent pl-4 mt-6">
                    "If our content has helped you learn and grow, consider
                    supporting us to help other students on their journey! 🚀"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - QR Code and Payment Info */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/30">
                  {/* QR Code Placeholder */}
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center shadow-lg relative">
                    <Image
                      src="/ayush-payment-qr.jpeg"
                      alt="QR Code for UPI Payment"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* Corner decoration */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
              </div>

              <div className="text-center space-y-3">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    UPI ID
                  </p>
                  <p className="font-mono text-lg font-semibold break-all">
                    ayushpoddar1603@okhdfcbank
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan to pay with any UPI app
                </p>
              </div>

              {/* Support badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  GPay
                </span>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                  PhonePe
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                  Paytm
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  BHIM
                </span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              Join hundreds of students who are already supporting our mission
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium">
                Support Now ❤️
              </button>
              <button className="px-6 py-3 border border-border rounded-xl hover:bg-muted/50 transition-colors">
                Share with Friends 📢
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportUsSection;
