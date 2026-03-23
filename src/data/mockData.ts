export const doctorInfo = {
  id: 1,
  name: "Dr. Nandita Karmakar",
  specialty: "Classical Homeopathy",
  qualification: "BHMS, MD (Hom)",
  experience: 15,
  rating: 5,
  reviews: 320,
  location: "Bhopal, Madhya Pradesh",
  fee: 500,
  available: true,
  avatar: "👩‍⚕️",
  skills: ["Chronic Disease", "Women's Health", "Pediatrics", "Skin Disorders", "Allergies", "Mental Wellness"],
  about: "Dr. Nandita Karmakar is a dedicated homeopathic practitioner with over 15 years of experience in classical homeopathy. She believes in treating the whole person — mind, body, and spirit — using safe, natural remedies with zero side effects. Her mission is to make quality homeopathic care accessible to every patient through both offline and online consultations.",
  languages: ["Hindi", "English", "Bengali"],
  education: [
    { degree: "BHMS", institution: "National Institute of Homeopathy, Kolkata", year: 2008 },
    { degree: "MD (Homeopathy)", institution: "Dr. B.R. Sur Homeopathic Medical College, Delhi", year: 2012 },
  ],
};

export const mockReviews = [
  {
    id: 1,
    patientName: "Sneha M.",
    rating: 5,
    date: "2025-02-20",
    comment: "Dr. Nandita is amazing! She really listened to all my symptoms and the remedy she prescribed worked wonders for my chronic migraine. Highly recommended!",
  },
  {
    id: 2,
    patientName: "Rahul K.",
    rating: 5,
    date: "2025-02-18",
    comment: "Incredible knowledge of homeopathy. Her treatment helped me with my autoimmune condition when modern medicine couldn't. Very grateful.",
  },
  {
    id: 3,
    patientName: "Priyanka T.",
    rating: 4,
    date: "2025-02-15",
    comment: "Very helpful for my PCOS treatment. The remedies are natural and I saw improvement within 3 months. Highly recommend her for women's health issues.",
  },
  {
    id: 4,
    patientName: "Amit S.",
    rating: 5,
    date: "2025-02-10",
    comment: "Great experience! She took detailed case history and prescribed a constitutional remedy. My allergies have significantly reduced.",
  },
  {
    id: 5,
    patientName: "Kavita D.",
    rating: 5,
    date: "2025-02-08",
    comment: "My son's recurrent cold and cough got so much better after Dr. Nandita's treatment. She is wonderful with children and very patient.",
  },
  {
    id: 6,
    patientName: "Deepak R.",
    rating: 5,
    date: "2025-01-28",
    comment: "I was skeptical about homeopathy but Dr. Nandita changed my perspective. My chronic eczema is 80% better in just 4 months!",
  },
  {
    id: 7,
    patientName: "Meera J.",
    rating: 4,
    date: "2025-01-20",
    comment: "Very professional and caring doctor. She explains everything clearly and the online consultation experience was seamless.",
  },
];

export const mockAppointments = [
  {
    id: 1,
    date: "2025-03-01",
    time: "10:00 AM",
    status: "upcoming" as const,
    type: "Follow-up",
  },
  {
    id: 2,
    date: "2025-02-20",
    time: "2:30 PM",
    status: "completed" as const,
    type: "Consultation",
  },
  {
    id: 3,
    date: "2025-02-15",
    time: "11:00 AM",
    status: "completed" as const,
    type: "First Visit",
  },
];

export interface ConsultationSession {
  id: string;
  patientName: string;
  startedAt: string;
  lastUpdatedAt: string;
  status: "in-progress" | "paused" | "completed";
  currentStep: number;
  totalSteps: number;
  steps: ConsultationStep[];
  notes: string;
  pauseReason?: string;
}

export interface ConsultationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  data?: Record<string, string>;
}

export const consultationSteps: Omit<ConsultationStep, "completed" | "data">[] = [
  { id: 1, title: "Personal Information", description: "Basic details like age, gender, weight, and lifestyle habits." },
  { id: 2, title: "Chief Complaint", description: "Describe your primary health concern and symptoms in detail." },
  { id: 3, title: "Medical History", description: "Past illnesses, surgeries, ongoing medications, and family history." },
  { id: 4, title: "Lifestyle & Mental Health", description: "Sleep patterns, diet, stress levels, and emotional well-being." },
  { id: 5, title: "Physical Examination Notes", description: "Dr. Nandita's observations and constitutional assessment." },
  { id: 6, title: "Remedy & Prescription", description: "Recommended homeopathic remedies, dosage, and follow-up plan." },
];

export const mockConsultations: ConsultationSession[] = [
  {
    id: "CS001",
    patientName: "You",
    startedAt: "2025-02-25T10:00:00",
    lastUpdatedAt: "2025-02-25T10:45:00",
    status: "paused",
    currentStep: 3,
    totalSteps: 6,
    pauseReason: "Patient had an emergency — will resume later.",
    notes: "Patient reported chronic headaches for 6 months. Family history of migraine. Lifestyle assessment pending.",
    steps: consultationSteps.map((step, i) => ({
      ...step,
      completed: i < 2,
      data: i === 0 ? { age: "32", gender: "Female", weight: "58kg" } : i === 1 ? { complaint: "Chronic migraine with aura, worsening in evenings" } : undefined,
    })),
  },
  {
    id: "CS002",
    patientName: "You",
    startedAt: "2025-02-10T14:00:00",
    lastUpdatedAt: "2025-02-10T15:30:00",
    status: "completed",
    currentStep: 6,
    totalSteps: 6,
    notes: "Complete consultation done. Prescribed Natrum Muriaticum 200C. Follow-up in 4 weeks.",
    steps: consultationSteps.map((step) => ({
      ...step,
      completed: true,
    })),
  },
];
