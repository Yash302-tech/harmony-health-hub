import { useState } from "react";
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

const stepFields = {
  1: [
    { name: "age", label: "Age", type: "input", placeholder: "e.g. 32" },
    { name: "gender", label: "Gender", type: "input", placeholder: "e.g. Female" },
    { name: "weight", label: "Weight", type: "input", placeholder: "e.g. 58 kg" },
    { name: "occupation", label: "Occupation", type: "input", placeholder: "e.g. Teacher" },
  ],
  2: [
    { name: "complaint", label: "Chief Complaint", type: "textarea", placeholder: "Describe your main health concern…" },
    { name: "duration", label: "Since When?", type: "input", placeholder: "e.g. 6 months" },
    { name: "severity", label: "Severity (1-10)", type: "input", placeholder: "e.g. 7" },
  ],
  3: [
    { name: "pastIllness", label: "Past Illnesses", type: "textarea", placeholder: "Any illnesses…" },
    { name: "medications", label: "Current Medications", type: "textarea", placeholder: "Medicines…" },
    { name: "familyHistory", label: "Family History", type: "textarea", placeholder: "Family diseases…" },
  ],
  4: [
    { name: "sleep", label: "Sleep Pattern", type: "input", placeholder: "e.g. 6-7 hours" },
    { name: "diet", label: "Diet Preferences", type: "input", placeholder: "e.g. Vegetarian" },
    { name: "stress", label: "Stress Level", type: "input", placeholder: "e.g. High" },
    { name: "emotional", label: "Emotional State", type: "textarea", placeholder: "How are you feeling?" },
  ],
};

const stepTitles = [
  "Personal Information",
  "Chief Complaint",
  "Medical History",
  "Lifestyle & Mental Health",
];

const stepDescriptions = [
  "Basic details like age, gender, weight, and lifestyle habits",
  "Describe your main health concern and symptoms",
  "Past illnesses, medications, and family history",
  "Sleep, diet, stress, and emotional wellbeing",
];

const Consultation = () => {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const totalSteps = 4;
  const progress = ((step - 1) / totalSteps) * 100;

  const startNew = () => {
    setActive(true);
    setStep(1);
    setFormData({});
  };

  const nextStep = () => {
    if (step === totalSteps) {
      toast.success("Consultation Completed 🎉");
      setActive(false);
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // ================= FORM UI =================
  if (active) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Consultation #CS003
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Step {step} of 4
            </p>
          </div>

          {/* Progress */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">Progress</span>
              <span className="font-body text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>

            <Progress value={progress} className="h-2.5" />

            {/* Step Circles */}
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold ${
                      i < step
                        ? "bg-primary text-white"
                        : i === step
                        ? "bg-accent ring-2 ring-accent/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i}
                  </div>
                  <span className="text-[10px] text-muted-foreground hidden sm:block">
                    {stepTitles[i - 1].split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">
                  {stepTitles[step - 1]}
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  {stepDescriptions[step - 1]}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {stepFields[step].map((field: any) => (
                <div key={field.name}>
                  <Label className="font-body">{field.label}</Label>

                  {field.type === "textarea" ? (
                    <Textarea
                      className="mt-1 font-body bg-secondary/50"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input
                      className="mt-1 font-body bg-secondary/50"
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="font-body"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>

              <Button onClick={nextStep} className="font-body">
                {step === totalSteps ? (
                  <>
                    Complete <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Save & Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ================= MAIN PAGE =================
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              My Consultations
            </h1>
            <p className="text-muted-foreground font-body mt-1">
              Start your consultation
            </p>
          </div>

          <Button onClick={startNew} className="font-body">
            <Play className="w-4 h-4 mr-2" /> Start New Consultation
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Consultation;