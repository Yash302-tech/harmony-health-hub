import { Leaf, Heart, Shield, Users, Award, Target } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { doctorInfo } from "@/data/mockData";

const values = [
  { icon: Heart, title: "Holistic Healing", desc: "Treating the whole person — mind, body, and spirit — not just the symptoms." },
  { icon: Shield, title: "Safe & Natural", desc: "100% natural remedies with no side effects. Homeopathy works with your body's healing power." },
  { icon: Users, title: "Patient-Centered", desc: "Every treatment plan is personalized after detailed case-taking and understanding your unique health needs." },
  { icon: Award, title: "15+ Years Experience", desc: `${doctorInfo.qualification} with extensive clinical experience in classical homeopathy.` },
  { icon: Target, title: "Proven Results", desc: "320+ happy patients with a focus on chronic diseases, women's health, and pediatric care." },
  { icon: Leaf, title: "Online & Offline", desc: "Consultations available both in-clinic (Kolkata) and online, making healthcare accessible to everyone." },
];

const About = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-10 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-body text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" /> About Dr. Nandita Karmakar
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Healing Naturally, One Patient at a Time
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            {doctorInfo.about}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-display font-semibold text-foreground mb-3">My Mission</h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-xl mx-auto">
            To provide safe, effective, and personalized homeopathic treatments that empower individuals 
            to achieve optimal health through nature's own medicine — accessible to everyone, everywhere.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground text-center mb-6">Why Consult With Me</h2>
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
              { label: "Happy Patients", value: "320+" },
              { label: "Years Experience", value: "15+" },
              { label: "Specialties", value: "6+" },
              { label: "Patient Satisfaction", value: "98%" },
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
