import { useState, useEffect } from "react";
import {
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Firebase
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

const stepFields = {
  1: [
    { name: "age", label: "Age", type: "input" },
    { name: "gender", label: "Gender", type: "input" },
    { name: "weight", label: "Weight", type: "input" },
    { name: "occupation", label: "Occupation", type: "input" },
  ],
  2: [
    { name: "complaint", label: "Chief Complaint", type: "textarea" },
    { name: "duration", label: "Since When?", type: "input" },
    { name: "severity", label: "Severity", type: "input" },
  ],
  3: [
    { name: "pastIllness", label: "Past Illnesses", type: "textarea" },
    { name: "medications", label: "Medications", type: "textarea" },
    { name: "familyHistory", label: "Family History", type: "textarea" },
  ],
  4: [
    { name: "sleep", label: "Sleep", type: "input" },
    { name: "diet", label: "Diet", type: "input" },
    { name: "stress", label: "Stress", type: "input" },
    { name: "emotional", label: "Emotional State", type: "textarea" },
  ],
};

const stepTitles = [
  "Personal Information",
  "Chief Complaint",
  "Medical History",
  "Lifestyle & Mental Health",
];

const stepDescriptions = [
  "Basic details like age, gender, weight",
  "Describe your health problem",
  "Past illness and medications",
  "Lifestyle and emotional condition",
];

const Consultation = () => {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [userId, setUserId] = useState("");

  const [ongoing, setOngoing] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);

  const totalSteps = 4;
  const progress = ((step - 1) / totalSteps) * 100;

  // 🔥 REALTIME FETCH
  useEffect(() => {
    let unsubscribeFirestore: any;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        const q = query(
          collection(db, "consultations"),
          where("userId", "==", user.uid)
        );

        unsubscribeFirestore = onSnapshot(q, (snap) => {
          const on: any[] = [];
          const comp: any[] = [];

          snap.forEach((doc) => {
            const data = doc.data();

            if (data.doctorCompleted === true) {
              comp.push({ id: doc.id, ...data });
            } else {
              on.push({ id: doc.id, ...data });
            }
          });

          setOngoing(on);
          setCompleted(comp);
        });
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const startNew = () => {
    setActive(true);
    setStep(1);
    setFormData({});
  };

  // ✅ FINAL FIXED FUNCTION (NO DUPLICATE)
  const nextStep = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      try {
        const time = Timestamp.now();

        await addDoc(collection(db, "consultations"), {
          userId,
          formData,
          problem: formData.complaint || "N/A",
          startedAt: time,
          doctorCompleted: false,
        });

        // ❌ NO manual state update (important fix)

        toast.success("Consultation submitted!");
        setActive(false);
      } catch (e) {
        toast.error("Error saving consultation");
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // ================= FORM =================
  if (active) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">

          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              New Consultation
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Step {step} of 4
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>

            <Progress value={progress} className="h-2.5" />

            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i < step
                      ? "bg-primary text-white"
                      : i === step
                      ? "bg-accent ring-2 ring-accent/30"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {stepTitles[step - 1]}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {stepDescriptions[step - 1]}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              {stepFields[step].map((field: any) => (
                <div key={field.name}>
                  <Label>{field.label}</Label>

                  {field.type === "textarea" ? (
                    <Textarea
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                    />
                  ) : (
                    <Input
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button onClick={prevStep} disabled={step === 1}>
                <ArrowLeft /> Previous
              </Button>

              <Button onClick={nextStep}>
                {step === totalSteps ? "Complete" : "Save & Next"}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ================= LIST =================
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              My Consultations
            </h1>
          </div>

          <Button onClick={startNew} className="font-body">
            <Play className="w-4 h-4 mr-2" /> Start New Consultation
          </Button>
        </div>

        {/* 🔵 ONGOING */}
        {ongoing.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold">
              Ongoing Consultations
            </h2>

            {ongoing.map((c, i) => (
              <div key={c.id} className="bg-card rounded-xl border border-primary/20 p-5">
                <p className="font-semibold">Consultation #{i + 1}</p>
                <p>Problem: {c.problem}</p>
                <p>
                  Started: {c.startedAt?.toDate
                    ? c.startedAt.toDate().toLocaleString()
                    : new Date(c.startedAt).toLocaleString()}
                </p>
                <p className="text-primary">Review by doctor pending</p>
              </div>
            ))}
          </div>
        )}

        {/* 🟢 COMPLETED */}
        {completed.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold">
              Completed Consultations
            </h2>

            {completed.map((c, i) => (
              <div key={c.id} className="bg-card rounded-xl border border-border p-5">
                <p className="font-semibold">Consultation #{i + 1}</p>
                <p>Problem: {c.problem}</p>
                <p>
                  Started: {c.startedAt?.toDate
                    ? c.startedAt.toDate().toLocaleString()
                    : new Date(c.startedAt).toLocaleString()}
                </p>
                <p className="text-green-600">Reviewed by doctor</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Consultation;