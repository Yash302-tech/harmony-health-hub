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
