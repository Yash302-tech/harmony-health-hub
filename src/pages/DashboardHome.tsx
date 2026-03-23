import { CalendarCheck, Star, Clock, Heart, Award, GraduationCap, MapPin, Stethoscope, AlertTriangle, RotateCcw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { doctorInfo } from "@/data/mockData";
import heroImg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { consultationSteps } from "@/data/mockData";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pausedSession, setPausedSession] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [c, a, r] = await Promise.all([
        supabase.from("consultations").select("*").eq("status", "paused").order("updated_at", { ascending: false }).limit(1),
        supabase.from("appointments").select("*").eq("status", "upcoming").order("date", { ascending: true }).limit(3),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(3),
      ]);
      if (c.data?.[0]) setPausedSession(c.data[0]);
      if (a.data) setAppointments(a.data);
      if (r.data) setReviews(r.data);
    };
    fetch();
  }, []);

  const displayName = user?.user_metadata?.full_name || "there";

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img src={heroImg} alt="Homeopathic clinic" className="absolute inset-0 w-full h-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
          <div className="relative z-10 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
              Welcome, {displayName}! 🌿
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg max-w-lg">
              Your journey to natural healing with Dr. Nandita Karmakar starts here.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button onClick={() => navigate("/dashboard/consultation")} className="font-body">
                <Stethoscope className="w-4 h-4 mr-2" /> Start Consultation
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard/appointments")} className="font-body bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <CalendarCheck className="w-4 h-4 mr-2" /> Book Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Resume consultation banner */}
        {pausedSession && (
          <div className="bg-card rounded-xl border-2 border-warning/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground">You have a paused consultation</p>
                <p className="text-sm text-muted-foreground font-body">
                  Step {pausedSession.current_step}/{pausedSession.total_steps} — {consultationSteps[pausedSession.current_step - 1]?.title}
                </p>
                <Progress value={(pausedSession.current_step - 1) / pausedSession.total_steps * 100} className="h-1.5 w-48 mt-2" />
              </div>
            </div>
            <Button onClick={() => navigate("/dashboard/consultation")} className="font-body self-start sm:self-center">
              <RotateCcw className="w-4 h-4 mr-2" /> Resume
            </Button>
          </div>
        )}

        {/* Doctor Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0 mx-auto sm:mx-0">
              {doctorInfo.avatar}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-display font-bold text-foreground">{doctorInfo.name}</h2>
              <p className="text-primary font-body font-medium">{doctorInfo.specialty}</p>
              <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                <RatingStars rating={doctorInfo.rating} size="sm" />
                <span className="text-sm text-muted-foreground font-body">({doctorInfo.reviews} reviews)</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-4 text-sm text-muted-foreground font-body">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>{doctorInfo.qualification}</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Award className="w-4 h-4 text-accent" />
                  <span>{doctorInfo.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{doctorInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Heart className="w-4 h-4 text-accent" />
                  <span>₹{doctorInfo.fee} / consultation</span>
                </div>
              </div>
              <p className="text-foreground/80 font-body text-sm mt-4 leading-relaxed max-w-2xl">{doctorInfo.about}</p>
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center sm:justify-start">
                {doctorInfo.skills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-body font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming appointments */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Your Appointments
            </h2>
            <div className="space-y-3">
              {appointments.length > 0 ? appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-body font-semibold text-foreground">{apt.type}</p>
                    <p className="text-sm text-muted-foreground font-body">{apt.date} at {apt.time}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-body font-medium">Upcoming</span>
                </div>
              )) : (
                <p className="text-muted-foreground font-body text-sm">No upcoming appointments — <button onClick={() => navigate("/dashboard/appointments")} className="text-primary hover:underline">book one now</button></p>
              )}
            </div>
          </div>

          {/* Recent reviews */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" /> Patient Reviews
            </h2>
            <div className="space-y-3">
              {reviews.length > 0 ? reviews.map((review) => (
                <div key={review.id} className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-body font-semibold text-foreground text-sm">{review.patient_name}</p>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-foreground/80 font-body mt-1 line-clamp-2">{review.comment}</p>
                </div>
              )) : (
                <p className="text-muted-foreground font-body text-sm">No reviews yet — <button onClick={() => navigate("/dashboard/reviews")} className="text-primary hover:underline">write one</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
