import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "dr.nandita@karmakar.com", href: "mailto:dr.nandita@karmakar.com" },
  { icon: MapPin, label: "Clinic", value: "Bhopal, Madhya Pradesh, India" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 10 AM - 7 PM, Sun: Closed" },
];

const Contact = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      user_id: user.id,
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    if (error) {
      toast.error("Failed to send message");
    } else {
      toast.success("Message sent! Dr. Nandita will get back to you soon 📬");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
    setSending(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Contact Dr. Nandita</h1>
          <p className="text-muted-foreground font-body mt-1">Reach out for queries or appointment requests</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-4 flex items-start gap-4 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground text-sm">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-primary hover:underline font-body">{item.value}</a>
                  ) : (
                    <p className="text-sm text-muted-foreground font-body">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp button */}
            <a
              href="https://wa.me/919876543210?text=Hello%20Dr.%20Nandita%2C%20I%20need%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[hsl(142,70%,45%)] text-white rounded-xl p-4 hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-6 h-6" />
              <div>
                <p className="font-body font-semibold text-sm">Chat on WhatsApp</p>
                <p className="text-xs opacity-80 font-body">Quick consultation queries</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-body">Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1 font-body bg-secondary/50" placeholder="Your name" />
                </div>
                <div>
                  <Label className="font-body">Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1 font-body bg-secondary/50" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <Label className="font-body">Subject</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="mt-1 font-body bg-secondary/50" placeholder="How can Dr. Nandita help?" />
              </div>
              <div>
                <Label className="font-body">Message</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="mt-1 font-body bg-secondary/50" rows={5} placeholder="Describe your health concern or query..." />
              </div>
              <Button type="submit" className="font-body" disabled={sending}>
                <Send className="w-4 h-4 mr-2" /> {sending ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
