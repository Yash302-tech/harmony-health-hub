import { useState } from "react";
import { CalendarCheck, Clock, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockAppointments, mockDoctors } from "@/data/mockData";
import { toast } from "sonner";

const Appointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment booked successfully! 🎉");
    setShowBooking(false);
    setSelectedDoctor("");
    setDate("");
    setTime("");
    setNotes("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">My Appointments</h1>
            <p className="text-muted-foreground font-body mt-1">Manage your consultations</p>
          </div>
          <Button className="font-body" onClick={() => setShowBooking(!showBooking)}>
            <Plus className="w-4 h-4 mr-2" /> Book Appointment
          </Button>
        </div>

        {/* Booking form */}
        {showBooking && (
          <div className="bg-card rounded-xl border border-border p-6 animate-scale-in">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Book New Appointment</h2>
            <form onSubmit={handleBook} className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body">Select Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="mt-1 font-body bg-secondary/50">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map((d) => (
                      <SelectItem key={d.id} value={d.name}>{d.name} — {d.specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body">Preferred Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 font-body bg-secondary/50" />
              </div>
              <div>
                <Label className="font-body">Preferred Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="mt-1 font-body bg-secondary/50">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body">Notes (Optional)</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Describe your symptoms..." className="mt-1 font-body bg-secondary/50 resize-none" rows={1} />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button type="submit" className="font-body">Confirm Booking</Button>
                <Button type="button" variant="outline" onClick={() => setShowBooking(false)} className="font-body">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {/* Appointments list */}
        <div className="space-y-4">
          {mockAppointments.map((apt) => (
            <div key={apt.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  apt.status === "upcoming" ? "bg-primary/10" : "bg-muted"
                }`}>
                  {apt.status === "upcoming" ? (
                    <CalendarCheck className="w-6 h-6 text-primary" />
                  ) : (
                    <Clock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">{apt.doctorName}</p>
                  <p className="text-sm text-muted-foreground font-body">{apt.date} at {apt.time}</p>
                  <p className="text-xs text-primary font-body font-medium">{apt.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-body font-medium self-start sm:self-center ${
                apt.status === "upcoming"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}>
                {apt.status === "upcoming" ? "Upcoming" : "Completed"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
