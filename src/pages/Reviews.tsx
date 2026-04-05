import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { doctorInfo } from "@/data/mockData";
import { toast } from "sonner";

// 🔥 Firebase
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  getDoc
} from "firebase/firestore";

const Reviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // ✅ Load instantly from cache
  useEffect(() => {
    const cached = localStorage.getItem("reviewsData");
    if (cached) {
      setReviews(JSON.parse(cached));
    }
  }, []);

  // 🔥 Fetch from Firestore
  const fetchReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = await Promise.all(
        snapshot.docs.map(async (d) => {
          const reviewData = d.data();

          // 🔥 Fix name if "User"
          if (!reviewData.name || reviewData.name === "User") {
            try {
              const userRef = doc(db, "users", reviewData.uid);
              const userSnap = await getDoc(userRef);

              if (userSnap.exists()) {
                return {
                  id: d.id,
                  ...reviewData,
                  name: userSnap.data().name || "User",
                };
              }
            } catch {}
          }

          return {
            id: d.id,
            ...reviewData,
          };
        })
      );

      setReviews(data);

      // ✅ Save to cache
      localStorage.setItem("reviewsData", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 🔥 Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      const user = auth.currentUser;

      // ✅ Get name from profile (Firestore)
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let userName = "User";

      if (userSnap.exists()) {
        userName = userSnap.data().name || "User";
      }

      // ✅ Save review
      await addDoc(collection(db, "reviews"), {
        uid: user.uid,
        name: userName,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      toast.success("Thank you for your review! 🌟");

      setShowForm(false);
      setRating(0);
      setComment("");

      fetchReviews(); // refresh
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Patient Reviews
            </h1>
            <p className="text-muted-foreground font-body mt-1">
              What patients say about {doctorInfo.name}
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <MessageSquare className="w-4 h-4 mr-2" /> Write Review
          </Button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-display font-semibold mb-4">
              Review {doctorInfo.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Your Rating</Label>
                <RatingStars
                  rating={rating}
                  size="lg"
                  interactive
                  onChange={setRating}
                />
              </div>

              <div>
                <Label>Your Review</Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Submit Review</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* REVIEWS */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border p-5 rounded-xl">
              <div className="flex justify-between">
                <p className="font-semibold">{review.name}</p>
                <RatingStars rating={review.rating} size="sm" />
              </div>
              <p className="mt-3 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;