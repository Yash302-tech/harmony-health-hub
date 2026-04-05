// Import core Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// 🔥 Import Auth & Firestore
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC5pPjG0v5IBjSmNeEerlI5o-O25U52H1Q",
  authDomain: "harmonyhealth-f0386.firebaseapp.com",
  projectId: "harmonyhealth-f0386",
  storageBucket: "harmonyhealth-f0386.firebasestorage.app",
  messagingSenderId: "556071231661",
  appId: "1:556071231661:web:376d329b3cd53d66302624",
  measurementId: "G-5NR7RV6SK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (optional)
const analytics = getAnalytics(app);

// ✅ Initialize services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Export app if needed
export default app;