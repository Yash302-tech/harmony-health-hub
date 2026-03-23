import { useState, useEffect } from "react";
import {
  Play, Pause, CheckCircle2, Clock, AlertTriangle, ArrowRight, ArrowLeft, RotateCcw, FileText,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { consultationSteps } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
  5: [
    { name: "observations", label: "Doctor's Observations", type: "textarea", placeholder: "To be filled by Dr. Nandita…" },
    { name: "constitution", label: "Constitutional Type", type: "input", placeholder: "e.g. Phosphorus type" },
  ],
  6: [
    { name: "remedy", label: "Prescribed Remedy", type: "input", placeholder: "e.g. Natrum Muriaticum 200C" },
    { name: "dosage", label: "Dosage Instructions", type: "textarea", placeholder: "e.g. 3 pellets, once weekly for 4 weeks" },
    { name: "followup", label: "Follow-up Plan", type: "input", placeholder: "e.g. Review in 4 weeks" },
  ],
};

interface DBConsultation {
  id: string;
  status: string;
  current_step: number;
  total_steps: number;
  pause_reason: string | null;
  notes: string | null;
  steps_data: any;
  created_at: string;
  updated_at: string;
}

const Consultation = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<DBConsultation[]>([]);
  const [activeSession, setActiveSession] = useState<DBConsultation | null>(null);
  const [stepData, setStepData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSessions(data);
    setLoading(false);
  };

  useEffect(() => { fetchSessions(); }, []);

  const getStepsData = (session: DBConsultation): any[] => {
    return Array.isArray(session.steps_data) ? session.steps_data : [];
  };

  const startNewSession = async () => {
    if (!user) return;
    const initialSteps = consultationSteps.map((s) => ({ ...s, completed: false, data: {} }));
    const { data, error } = await supabase.from("consultations").insert({
      user_id: user.id,
      status: "in-progress",
      current_step: 1,
      total_steps: 6,
      steps_data: initialSteps,
      notes: "",
    }).select().single();
    if (error || !data) { toast.error("Failed to start"); return; }
    setSessions([data, ...sessions]);
    setActiveSession(data);
    setStepData({});
    toast.success("New consultation started! 🩺");
  };

  const resumeSession = (session: DBConsultation) => {
    setActiveSession(session);
    const steps = getStepsData(session);
    const currentData = steps[session.current_step - 1]?.data || {};
    setStepData(currentData);
    toast.info(`Resuming from Step ${session.current_step}: ${consultationSteps[session.current_step - 1]?.title}`);
  };

  const pauseSession = async () => {
    if (!activeSession) return;
    const steps = getStepsData(activeSession);
    steps[activeSession.current_step - 1] = { ...steps[activeSession.current_step - 1], data: stepData };
    await supabase.from("consultations").update({
      status: "paused",
      steps_data: steps,
      pause_reason: "Session paused by patient.",
    }).eq("id", activeSession.id);
    setActiveSession(null);
    setStepData({});
    fetchSessions();
    toast.info("Session paused — you can resume anytime! ⏸️");
  };

  const saveStepAndNext = async () => {
    if (!activeSession) return;
    const steps = getStepsData(activeSession);
    const idx = activeSession.current_step - 1;
    steps[idx] = { ...steps[idx], completed: true, data: { ...stepData } };
    const isLast = activeSession.current_step >= activeSession.total_steps;

    await supabase.from("consultations").update({
      steps_data: steps,
      current_step: isLast ? activeSession.current_step : activeSession.current_step + 1,
      status: isLast ? "completed" : "in-progress",
    }).eq("id", activeSession.id);

    if (isLast) {
      setActiveSession(null);
      setStepData({});
      toast.success("Consultation completed! 🎉");
    } else {
      const updated = { ...activeSession, steps_data: steps, current_step: activeSession.current_step + 1 };
      setActiveSession(updated);
      setStepData(steps[activeSession.current_step]?.data || {});
    }
    fetchSessions();
  };

  const goToPreviousStep = () => {
    if (!activeSession || activeSession.current_step <= 1) return;
    const steps = getStepsData(activeSession);
    steps[activeSession.current_step - 1] = { ...steps[activeSession.current_step - 1], data: stepData };
    const updated = { ...activeSession, steps_data: steps, current_step: activeSession.current_step - 1 };
    setActiveSession(updated);
    setStepData(steps[updated.current_step - 1]?.data || {});
  };

  const currentFields = activeSession ? stepFields[activeSession.current_step] || [] : [];
  const progress = activeSession ? ((activeSession.current_step - 1) / activeSession.total_steps) * 100 : 0;
  const currentStepMeta = activeSession ? consultationSteps[activeSession.current_step - 1] : null;

  const pausedSessions = sessions.filter((s) => s.status === "paused");
  const inProgressSessions = sessions.filter((s) => s.status === "in-progress");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  if (activeSession) {
    const steps = getStepsData(activeSession);
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Consultation Session</h1>
              <p className="text-muted-foreground font-body text-sm mt-1">Step {activeSession.current_step} of {activeSession.total_steps}</p>
            </div>
            <Button variant="outline" onClick={pauseSession} className="font-body text-destructive border-destructive/30 hover:bg-destructive/10">
              <Pause className="w-4 h-4 mr-2" /> Pause & Save
            </Button>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">Progress</span>
              <span className="font-body text-sm font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2.5" />
            <div className="flex justify-between mt-4">
              {steps.map((step: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold transition-all ${
                    step.completed ? "bg-primary text-primary-foreground" : i === activeSession.current_step - 1 ? "bg-accent text-accent-foreground ring-2 ring-accent/30" : "bg-muted text-muted-foreground"
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-[10px] font-body text-muted-foreground text-center max-w-[60px] hidden sm:block">
                    {consultationSteps[i]?.title.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">{currentStepMeta?.title}</h2>
                <p className="text-sm text-muted-foreground font-body">{currentStepMeta?.description}</p>
              </div>
            </div>
            <div className="space-y-4 mt-6">
              {currentFields.map((field) => (
                <div key={field.name}>
                  <Label className="font-body">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea value={stepData[field.name] || ""} onChange={(e) => setStepData({ ...stepData, [field.name]: e.target.value })} placeholder={field.placeholder} className="mt-1 font-body bg-secondary/50 resize-none" rows={3} />
                  ) : (
                    <Input value={stepData[field.name] || ""} onChange={(e) => setStepData({ ...stepData, [field.name]: e.target.value })} placeholder={field.placeholder} className="mt-1 font-body bg-secondary/50" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={goToPreviousStep} disabled={activeSession.current_step <= 1} className="font-body">
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <Button onClick={saveStepAndNext} className="font-body">
                {activeSession.current_step >= activeSession.total_steps ? <>Complete <CheckCircle2 className="w-4 h-4 ml-2" /></> : <>Save & Next <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">My Consultations</h1>
            <p className="text-muted-foreground font-body mt-1">Start, pause, or resume your checkup sessions</p>
          </div>
          <Button onClick={startNewSession} className="font-body">
            <Play className="w-4 h-4 mr-2" /> Start New Consultation
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground font-body">Loading…</div>
        ) : (
          <>
            {pausedSessions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" /> Paused — Resume Anytime
                </h2>
                {pausedSessions.map((s) => (
                  <div key={s.id} className="bg-card rounded-xl border-2 border-warning/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center"><Pause className="w-6 h-6 text-warning" /></div>
                      <div>
                        <p className="font-body font-semibold text-foreground">Consultation</p>
                        <p className="text-sm text-muted-foreground font-body">Paused at Step {s.current_step}/{s.total_steps} — {consultationSteps[s.current_step - 1]?.title}</p>
                        <Progress value={(s.current_step - 1) / s.total_steps * 100} className="h-1.5 w-40 mt-2" />
                      </div>
                    </div>
                    <Button onClick={() => resumeSession(s)} className="font-body self-start sm:self-center"><RotateCcw className="w-4 h-4 mr-2" /> Resume</Button>
                  </div>
                ))}
              </div>
            )}

            {inProgressSessions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2"><Play className="w-5 h-5 text-primary" /> In Progress</h2>
                {inProgressSessions.map((s) => (
                  <div key={s.id} className="bg-card rounded-xl border border-primary/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Play className="w-6 h-6 text-primary" /></div>
                      <div>
                        <p className="font-body font-semibold text-foreground">Consultation</p>
                        <p className="text-sm text-muted-foreground font-body">Step {s.current_step}/{s.total_steps} — {consultationSteps[s.current_step - 1]?.title}</p>
                      </div>
                    </div>
                    <Button onClick={() => resumeSession(s)} className="font-body self-start sm:self-center">Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </div>
                ))}
              </div>
            )}

            {completedSessions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Completed</h2>
                {completedSessions.map((s) => (
                  <div key={s.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-muted-foreground" /></div>
                      <div>
                        <p className="font-body font-semibold text-foreground">Consultation</p>
                        <p className="text-sm text-muted-foreground font-body">All {s.total_steps} steps completed</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-body font-medium bg-primary/10 text-primary self-start sm:self-center">Completed</span>
                  </div>
                ))}
              </div>
            )}

            {sessions.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4"><FileText className="w-10 h-10 text-primary" /></div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">No consultations yet</h3>
                <p className="text-muted-foreground font-body mb-4">Start your first consultation with Dr. Nandita Karmakar</p>
                <Button onClick={startNewSession} className="font-body"><Play className="w-4 h-4 mr-2" /> Start Consultation</Button>
              </div>
            )}

            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">How Resume Consultation Works</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Play, title: "Start Anytime", desc: "Begin your consultation by filling out step-by-step health information." },
                  { icon: Pause, title: "Pause if Needed", desc: "Got an emergency? Pause your session — all progress is auto-saved." },
                  { icon: RotateCcw, title: "Resume Seamlessly", desc: "Come back and pick up exactly where you left off. Nothing is lost." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Consultation;
