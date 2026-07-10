import { useState, useEffect } from "react";
import { UserCircle, Mail, Phone, MapPin, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Firebase
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [userId, setUserId] = useState("");

  // ✅ Load instantly from localStorage
  useEffect(() => {
    const cached = localStorage.getItem("profileData");
    if (cached) {
      setProfile(JSON.parse(cached));
    }
  }, []);

  // 🔥 Sync with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let updatedProfile;

        if (docSnap.exists()) {
          const data = docSnap.data();

          updatedProfile = {
            name: user.displayName || data.name || "",
            email: user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            bio: data.bio || "",
          };
        } else {
          updatedProfile = {
            name: user.displayName || "",
            email: user.email || "",
            phone: "",
            address: "",
            bio: "",
          };
        }

        // ✅ Update UI
        setProfile(updatedProfile);

        // ✅ Save to localStorage
        localStorage.setItem("profileData", JSON.stringify(updatedProfile));
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Save
  const handleSave = async (e) => {
    e.preventDefault();

    if (!profile.phone && !profile.address && !profile.bio) {
      toast.error("Please fill at least one field!");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", userId),
        profile,
        { merge: true }
      );

      // ✅ Update localStorage instantly
      localStorage.setItem("profileData", JSON.stringify(profile));

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl text-foreground">
                {profile.name}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <Label>Full Name</Label>
                <Input value={profile.name} readOnly />
              </div>

              <div>
                <Label>Email</Label>
                <Input value={profile.email} readOnly />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>About</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
            </div>

            <Button type="submit">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;