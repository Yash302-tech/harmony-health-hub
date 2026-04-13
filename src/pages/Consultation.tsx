import { useState } from "react";
import {
  Play,
  Pause,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  FileText,
  Save,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { mockConsultations, consultationSteps, type ConsultationSession, type ConsultationStep } from "@/data/mockData";
import { toast } from "sonner";

const stepFields: Record<number, { name: string; label: string; type: "input" | "textarea"; placeholder: string }[]> = {
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
    { name: "pastIllness", label: "Past Illnesses", type: "textarea", placeholder: "Any significant illnesses or surgeries…" },
    { name: "medications", label: "Current Medications", type: "textarea", placeholder: "List any medicines you're taking…" },
    { name: "familyHistory", label: "Family History", type: "textarea", placeholder: "Any diseases common in your family…" },
  ],
  4: [
    { name: "sleep", label: "Sleep Pattern", type: "input", placeholder: "e.g. 6-7 hours, difficulty falling asleep" },
    { name: "diet", label: "Diet Preferences", type: "input", placeholder: "e.g. Vegetarian, spicy food lover" },
    { name: "stress", label: "Stress Level", type: "input", placeholder: "e.g. High — work-related" },
    { name: "emotional", label: "Emotional State", type: "textarea", placeholder: "How are you feeling emotionally lately?" },
  ],

};

const Consultation = () => {
  const [sessions, setSessions] = useState<ConsultationSession[]>(mockConsultations);
  const [activeSession, setActiveSession] = useState<ConsultationSession | null>(null);
  const [stepData, setStepData] = useState<Record<string, string>>({});

  const pausedSessions = sessions.filter((s) => s.status === "paused");
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const inProgressSessions = sessions.filter((s) => s.status === "in-progress");

  const startNewSession = () => {
    const newSession: ConsultationSession = {
      id: `CS${String(sessions.length + 1).padStart(3, "0")}`,
      patientName: "You",
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      status: "in-progress",
      currentStep: 1,
      totalSteps: 6,
      notes: "",
      steps: consultationSteps.map((step) => ({ ...step, completed: false })),
    };
    setSessions([newSession, ...sessions]);
    setActiveSession(newSession);
    setStepData({});
    toast.success("New consultation started! 🩺");
  };



  const saveStepAndNext = () => {
    if (!activeSession) return;
    const stepIndex = activeSession.currentStep - 1;
    const updatedSteps = [...activeSession.steps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], completed: true, data: { ...stepData } };

    const isLastStep = activeSession.currentStep >= activeSession.totalSteps;
    const updated: ConsultationSession = {
      ...activeSession,
      steps: updatedSteps,
      currentStep: isLastStep ? activeSession.currentStep : activeSession.currentStep + 1,
      status: isLastStep ? "completed" : "in-progress",
      lastUpdatedAt: new Date().toISOString(),
      notes: isLastStep ? activeSession.notes + " Consultation completed." : activeSession.notes,
    };

    setSessions(sessions.map((s) => (s.id === updated.id ? updated : s)));

    if (isLastStep) {
      setActiveSession(null);
      setStepData({});
      toast.success("Consultation completed! 🎉 Dr. Nandita will review your case.");
    } else {
      setActiveSession(updated);
      const nextStepData = updated.steps[updated.currentStep - 1]?.data || {};
      setStepData(nextStepData);
    }
  };

  const goToPreviousStep = () => {
    if (!activeSession || activeSession.currentStep <= 1) return;
    const updated = { ...activeSession, currentStep: activeSession.currentStep - 1 };
    setActiveSession(updated);
    const prevData = updated.steps[updated.currentStep - 1]?.data || {};
    setStepData(prevData);
  };

  const currentStepInfo = activeSession ? activeSession.steps[activeSession.currentStep - 1] : null;
  const currentFields = activeSession ? stepFields[activeSession.currentStep] || [] : [];
  const progress = activeSession ? ((activeSession.currentStep - 1) / activeSession.totalSteps) * 100 : 0;

  // Active session view
  if (activeSession) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Consultation #{activeSession.id}
              </h1>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Step {activeSession.currentStep} of {activeSession.totalSteps}
              </p>
            </div>
            
          </div>

          {/* Progress */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">Progress</span>
              <span className="font-body text-sm font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2.5" />
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {activeSession.steps.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold transition-all ${
                    step.completed
                      ? "bg-primary text-primary-foreground"
                      : i === activeSession.currentStep - 1
                      ? "bg-accent text-accent-foreground ring-2 ring-accent/30"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-[10px] font-body text-muted-foreground text-center max-w-[60px] hidden sm:block">
                    {step.title.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current step form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">{currentStepInfo?.title}</h2>
                <p className="text-sm text-muted-foreground font-body">{currentStepInfo?.description}</p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {currentFields.map((field) => (
                <div key={field.name}>
                  <Label className="font-body">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      value={stepData[field.name] || ""}
                      onChange={(e) => setStepData({ ...stepData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      className="mt-1 font-body bg-secondary/50 resize-none"
                      rows={3}
                    />
                  ) : (
                    <Input
                      value={stepData[field.name] || ""}
                      onChange={(e) => setStepData({ ...stepData, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      className="mt-1 font-body bg-secondary/50"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                disabled={activeSession.currentStep <= 1}
                className="font-body"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <Button onClick={saveStepAndNext} className="font-body">
                {activeSession.currentStep >= activeSession.totalSteps ? (
                  <>Complete Consultation <CheckCircle2 className="w-4 h-4 ml-2" /></>
                ) : (
                  <>Save & Next <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Sessions list view
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">My Consultations</h1>
            <p className="text-muted-foreground font-body mt-1">Start, pause, or resume your checkup sessions with Dr. Nandita</p>
          </div>
          <Button onClick={startNewSession} className="font-body">
            <Play className="w-4 h-4 mr-2" /> Start New Consultation
          </Button>
        </div>

        {/* Paused sessions — resume banner */}
        {pausedSessions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Ongoing Consultation
            </h2>
            {pausedSessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl border-2 border-warning/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  
                  <div>
                    <p className="font-body font-semibold text-foreground">Consultation #{session.id}</p>
                    
                   
                    <div className="mt-2">
                      <Progress value={100-30} className="h-1.5 w-40" />
                    </div>
                  </div>
                </div>
               
              </div>
            ))}
          </div>
        )}

        {/* In-progress */}
        {inProgressSessions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" /> In Progress
            </h2>
            {inProgressSessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl border border-primary/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">Consultation #{session.id}</p>
                    <p className="text-sm text-muted-foreground font-body">
                      Step {session.currentStep}/{session.totalSteps} — {session.steps[session.currentStep - 1]?.title}
                    </p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}

        {/* Completed */}
        {completedSessions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Completed
            </h2>
            {completedSessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">Consultation #{session.id}</p>
                    <p className="text-sm text-muted-foreground font-body">
                      All process are completed.
                    </p>
                    <p className="text-xs text-muted-foreground font-body">{session.notes}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-body font-medium bg-primary/10 text-primary self-start sm:self-center">
                  Completed
                </span>
              </div>
            ))}
          </div>
        )}

        {sessions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">No consultations yet</h3>
            <p className="text-muted-foreground font-body mb-4">Start your first consultation with Dr. Nandita Karmakar</p>
            <Button onClick={startNewSession} className="font-body">
              <Play className="w-4 h-4 mr-2" /> Start Consultation
            </Button>
          </div>
        )}

        {/* How it works */}
    
      </div>
    </DashboardLayout>
  );
};

export default Consultation;
