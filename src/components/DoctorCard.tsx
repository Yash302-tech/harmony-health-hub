import { Award, GraduationCap, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/RatingStars";
import { useNavigate } from "react-router-dom";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  fee: number;
  available: boolean;
  avatar: string;
  skills: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
          {doctor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-foreground">{doctor.name}</h3>
          <p className="text-primary font-body text-sm font-medium">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <RatingStars rating={doctor.rating} size="sm" />
            <span className="text-xs text-muted-foreground font-body">({doctor.reviews})</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <GraduationCap className="w-4 h-4 text-primary" />
          <span>{doctor.qualification}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Award className="w-4 h-4 text-accent" />
          <span>{doctor.experience} years experience</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Clock className="w-4 h-4 text-primary" />
          <span>{doctor.available ? "Available Today" : "Next available tomorrow"}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {doctor.skills.map((skill) => (
          <span key={skill} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-body font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div>
          <span className="text-lg font-display font-bold text-foreground">₹{doctor.fee}</span>
          <span className="text-xs text-muted-foreground font-body"> / consultation</span>
        </div>
        <Button size="sm" className="font-body" onClick={() => navigate("/dashboard/appointments")}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
