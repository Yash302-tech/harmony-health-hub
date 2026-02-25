import { useState } from "react";
import { UserCircle, Mail, Phone, MapPin, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "User",
    email: "user@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
    bio: "Health-conscious individual interested in natural healing and homeopathic remedies.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground font-body mt-1">Manage your personal information</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          {/* Avatar section */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground font-body text-sm">Patient</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-body">Full Name</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1 font-body bg-secondary/50" />
              </div>
              <div>
                <Label className="font-body">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground mt-0.5" />
                  <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="mt-1 pl-10 font-body bg-secondary/50" />
                </div>
              </div>
              <div>
                <Label className="font-body">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground mt-0.5" />
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1 pl-10 font-body bg-secondary/50" />
                </div>
              </div>
              <div>
                <Label className="font-body">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground mt-0.5" />
                  <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="mt-1 pl-10 font-body bg-secondary/50" />
                </div>
              </div>
            </div>
            <div>
              <Label className="font-body">About</Label>
              <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="mt-1 font-body bg-secondary/50" rows={3} />
            </div>
            <Button type="submit" className="font-body">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
