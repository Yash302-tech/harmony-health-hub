import { CalendarCheck, Users, Star, Clock, TrendingUp, Heart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { mockAppointments, mockDoctors, mockReviews } from "@/data/mockData";
import heroImg from "@/assets/hero-bg.jpg";

const stats = [
  { label: "Appointments", value: "3", icon: CalendarCheck, color: "text-primary" },
  { label: "Doctors Visited", value: "5", icon: Users, color: "text-accent" },
  { label: "Avg. Rating Given", value: "4.8", icon: Star, color: "text-accent" },
  { label: "Health Score", value: "92%", icon: Heart, color: "text-success" },
];

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={heroImg} alt="Homeopathic clinic" className="absolute inset-0 w-full h-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
          <div className="relative z-10 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
              Welcome back! 🌿
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg max-w-lg">
              Your journey to natural healing continues. Here's your health overview.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming appointments */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Upcoming Appointments
            </h2>
            <div className="space-y-3">
              {mockAppointments.filter(a => a.status === "upcoming").map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-body font-semibold text-foreground">{apt.doctorName}</p>
                    <p className="text-sm text-muted-foreground font-body">{apt.date} at {apt.time}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-body font-medium">
                    {apt.type}
                  </span>
                </div>
              ))}
              {mockAppointments.filter(a => a.status === "upcoming").length === 0 && (
                <p className="text-muted-foreground font-body text-sm">No upcoming appointments</p>
              )}
            </div>
          </div>

          {/* Recent reviews */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" /> Recent Reviews
            </h2>
            <div className="space-y-3">
              {mockReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-body font-semibold text-foreground text-sm">{review.patientName}</p>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground font-body">on {review.doctorName}</p>
                  <p className="text-sm text-foreground/80 font-body mt-1 line-clamp-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top doctors */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Top Rated Doctors
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDoctors.filter(d => d.rating === 5).slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                  {doc.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-foreground text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-primary font-body">{doc.specialty}</p>
                  <RatingStars rating={doc.rating} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
