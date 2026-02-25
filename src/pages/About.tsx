import { Leaf, Heart, Shield, Users, Award, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const values = [
  { icon: Heart, title: "Holistic Healing", desc: "We treat the whole person, not just the symptoms. Our approach considers mental, emotional, and physical well-being." },
  { icon: Shield, title: "Safe & Natural", desc: "All our remedies are 100% natural with no side effects. Homeopathy works with your body's natural healing power." },
  { icon: Users, title: "Patient-Centered", desc: "Every treatment plan is personalized. We listen carefully to understand your unique health needs." },
  { icon: Award, title: "Expert Practitioners", desc: "Our doctors hold advanced degrees (BHMS, MD, Ph.D) with years of clinical experience in homeopathy." },
  { icon: Target, title: "Proven Results", desc: "Thousands of patients have found relief through our treatments, with a 95% patient satisfaction rate." },
  { icon: Leaf, title: "Home Practice", desc: "We bring quality homeopathic care to the comfort of your home, making healthcare accessible and convenient." },
];

const About = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-10 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" /> About HealNatura
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Healing Naturally, One Patient at a Time
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            HealNatura is a trusted homeopathic healthcare platform connecting patients with experienced 
            practitioners who believe in the power of natural healing. Founded with the mission to make 
            quality homeopathic care accessible to everyone.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">Our Mission</h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-xl mx-auto">
            To provide safe, effective, and personalized homeopathic treatments that empower individuals 
            to achieve optimal health and well-being through nature's own medicine.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground text-center mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { label: "Happy Patients", value: "10,000+" },
              { label: "Expert Doctors", value: "50+" },
              { label: "Years Experience", value: "15+" },
              { label: "Patient Satisfaction", value: "95%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-display font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/70 font-body text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
