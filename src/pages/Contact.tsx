import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "care@healnatura.com", href: "mailto:care@healnatura.com" },
  { icon: MapPin, label: "Location", value: "Home Practice, Mumbai, Maharashtra 400001" },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 9 AM - 7 PM, Sun: Closed" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon 📬");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Contact & Help</h1>
          <p className="text-muted-foreground font-body mt-1">We're here to help you with any questions</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-4 flex items-start gap-4">
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
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Send Us a Message</h2>
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
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="mt-1 font-body bg-secondary/50" placeholder="How can we help?" />
              </div>
              <div>
                <Label className="font-body">Message</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="mt-1 font-body bg-secondary/50" rows={5} placeholder="Describe your query in detail..." />
              </div>
              <Button type="submit" className="font-body">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
