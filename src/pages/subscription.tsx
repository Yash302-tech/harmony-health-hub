import React from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// ✅ IMPORTANT
import DashboardLayout from "@/components/DashboardLayout";

const Subscription = () => {
  const handleSubscribe = () => {
    toast.success("Subscription process initiated", {
      description: "Moving to payment gateway...",
    });
  };

  const features = [
    "Comprehensive Consultation",
    "Personalized Doctor Prescription",
    "Direct Contact (Phone & Address)",
    "Unlimited Monthly Consultations",
  ];

  return (
    <DashboardLayout>
      {/* ✅ FIXED: height & scroll control */}
      <div className="h-[calc(100vh-130px)] overflow-hidden relative">

        <div className="min-h-full bg-white relative overflow-hidden">
          
          {/* Background */}
          <div
            className="absolute inset-0 opacity-5 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1660835884780-58ef3baab256?crop=entropy&cs=srgb&fm=jpg&q=85')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 h-full flex items-center justify-center p-6 md:p-12">
            
            {/* ✅ FIXED WIDTH */}
            <div className="w-full max-w-6xl grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              
              {/* LEFT */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.2em] font-medium text-emerald-800">
                    Premium Healthcare
                  </p>

                  <h1 className="text-5xl sm:text-6xl tracking-tight font-light text-slate-900">
                    Dr. Nandita Karmakar
                    <span className="block mt-2 text-emerald-900 font-medium">
                      Care at Your Fingertips
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
                    Experience personalized homeopathic treatment with unlimited consultations.
                    Get direct access to experienced practitioners dedicated to your wellness journey.
                  </p>
                </div>

                {/* Doctor Image */}
                <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src=""
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-slate-500">
                  Trusted by hundreds of patients seeking natural healing solutions
                </p>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-green-900 rounded-2xl shadow-2xl p-8 border border-white/10">
                <div className="space-y-8">

                  <div className="space-y-4">
                    <h3 className="text-2xl text-white">Monthly Subscription</h3>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl text-white">₹399</span>
                        <span className="text-lg text-emerald-200">/ month</span>
                      </div>

                      <p className="text-sm text-emerald-200">
                        Complete homeopathy care package
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-white text-emerald-900 hover:bg-emerald-50 hover:scale-[1.02] transition-all duration-300 h-12 text-base font-medium rounded-md"
                  >
                    Subscribe Now
                  </button>

                  <p className="text-xs text-center text-emerald-200/80">
                    Cancel anytime • Secure payment • Instant access
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;