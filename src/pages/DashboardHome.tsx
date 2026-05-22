import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Star,
  Clock,
  Heart,
  Award,
  GraduationCap,
  MapPin,
  Stethoscope,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { mockAppointments, mockReviews, doctorInfo } from "@/data/mockData";
import heroImg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

// ✅ Firebase
import { auth, db } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [ongoingConsultation, setOngoingConsultation] = useState(null);

  // ✅ FETCH ONGOING CONSULTATION (FIXED)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "consultations"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ✅ FILTER CORRECTLY
      const ongoingList = data.filter(
        (item) =>
          item.userId === user.uid &&
          item.doctorCompleted !== true
      );

      if (ongoingList.length > 0) {
        const latest = ongoingList[ongoingList.length - 1];
        setOngoingConsultation(latest);
      } else {
        setOngoingConsultation(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        
        {/* Welcome banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={heroImg}
            alt="Homeopathic clinic"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="hero-gradient absolute inset-0" />
          <div className="relative z-10 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
              Welcome! 🌿
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg max-w-lg">
              Your journey to natural healing with Dr. Nandita Karmakar starts here.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button
                onClick={() => navigate("/dashboard/consult")}
                className="font-body"
              >
                <Stethoscope className="w-4 h-4 mr-2" /> Start Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* ✅ ONGOING CONSULTATION BANNER (FIXED) */}
        {ongoingConsultation && (
          <div className="bg-card rounded-xl border-2 border-warning/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>

              <div>
                <p className="font-body font-semibold text-foreground">
                  You have an ongoing consultation
                </p>

                <p className="text-sm text-muted-foreground font-body">
                  Consultation #{ongoingConsultation.id.slice(0, 5)}
                </p>

                <p className="text-sm text-muted-foreground font-body">
                  Problem: {ongoingConsultation.problem || "N/A"}
                </p>

                <p className="text-sm text-muted-foreground font-body">
                  Started:{" "}
                  {ongoingConsultation.startedAt
                    ? new Date(
                        ongoingConsultation.startedAt.seconds * 1000
                      ).toLocaleString()
                    : "N/A"}
                </p>

                <p className="text-sm text-green-600 font-body">
                  Review by doctor pending
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/dashboard/consult")}
              className="font-body self-start sm:self-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> View
            </Button>
          </div>
        )}

        {/* Doctor Profile Card (UNCHANGED) */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0 mx-auto sm:mx-0">
              {doctorInfo.avatar}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {doctorInfo.name}
              </h2>

              <p className="text-primary font-body font-medium">
                {doctorInfo.specialty}
              </p>

              <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                <RatingStars rating={doctorInfo.rating} size="sm" />
                <span className="text-sm text-muted-foreground font-body">
                  ({doctorInfo.reviews} reviews)
                </span>
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

              <p className="text-foreground/80 font-body text-sm mt-4 leading-relaxed max-w-2xl">
                {doctorInfo.about}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4 justify-center sm:justify-start">
                {doctorInfo.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-body font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;