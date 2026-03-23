import { useState, useEffect } from "react";
import { CalendarCheck, Clock, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { doctorInfo } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Appointments = () => {
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      date,
      time,
      notes,
      type: "Consultation",
      status: "upcoming",
    });
    if (error) {
      toast.error("Failed to book appointment");
      return;
    }
    toast.success("Appointment booked with Dr. Nandita! 🎉");
    setShowBooking(false);
    setDate("");
    setTime("");
    setNotes("");
    fetchAppointments();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">My Appointments</h1>
            <p className="text-muted-foreground font-body mt-1">Book & manage consultations with {doctorInfo.name}</p>
          </div>
          <Button className="font-body" onClick={() => setShowBooking(!showBooking)}>
            <Plus className="w-4 h-4 mr-2" /> Book Appointment
          </Button>
        </div>

        {showBooking && (
          <div className="bg-card rounded-xl border border-border p-6 animate-scale-in">
            <h2 className="text-xl font-display font-semibold text-foreground mb-1">Book with {doctorInfo.name}</h2>
            <p className="text-sm text-muted-foreground font-body mb-4">{doctorInfo.specialty} · ₹{doctorInfo.fee} / consultation</p>
            <form onSubmit={handleBook} className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body">Preferred Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 font-body bg-secondary/50" />
              </div>
              <div>
                <Label className="font-body">Preferred Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="mt-1 font-body bg-secondary/50"><SelectValue placeholder="Select time" /></SelectTrigger>
                  <SelectContent>
                    {["10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label className="font-body">Describe Your Health Concern</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell Dr. Nandita about your symptoms..." className="mt-1 font-body bg-secondary/50 resize-none" rows={3} />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button type="submit" className="font-body">Confirm Booking</Button>
                <Button type="button" variant="outline" onClick={() => setShowBooking(false)} className="font-body">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground font-body">Loading appointments…</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CalendarCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1">No appointments yet</h3>
              <p className="text-muted-foreground font-body text-sm">Book your first consultation with Dr. Nandita</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${apt.status === "upcoming" ? "bg-primary/10" : "bg-muted"}`}>
                    {apt.status === "upcoming" ? <CalendarCheck className="w-6 h-6 text-primary" /> : <Clock className="w-6 h-6 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">{doctorInfo.name}</p>
                    <p className="text-sm text-muted-foreground font-body">{apt.date} at {apt.time}</p>
                    <p className="text-xs text-primary font-body font-medium">{apt.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-body font-medium self-start sm:self-center ${
                  apt.status === "upcoming" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {apt.status === "upcoming" ? "Upcoming" : "Completed"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
