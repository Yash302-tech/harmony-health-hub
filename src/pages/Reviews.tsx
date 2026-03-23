import { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { doctorInfo } from "@/data/mockData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Reviews = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error("Please select a rating"); return; }
    if (!user) return;
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      patient_name: patientName || "Anonymous",
      rating,
      comment,
    });
    if (error) { toast.error("Failed to submit review"); return; }
    toast.success("Thank you for your review! 🌟");
    setShowForm(false);
    setRating(0);
    setComment("");
    setPatientName("");
    fetchReviews();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Patient Reviews</h1>
            <p className="text-muted-foreground font-body mt-1">What patients say about {doctorInfo.name}</p>
          </div>
          <Button className="font-body" onClick={() => setShowForm(!showForm)}>
            <MessageSquare className="w-4 h-4 mr-2" /> Write Review
          </Button>
        </div>

        {showForm && (
          <div className="bg-card rounded-xl border border-border p-6 animate-scale-in">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Review {doctorInfo.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="font-body">Your Name</Label>
                <Input value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Display name (optional)" className="mt-1 font-body bg-secondary/50" />
              </div>
              <div>
                <Label className="font-body mb-2 block">Your Rating</Label>
                <RatingStars rating={rating} size="lg" interactive onChange={setRating} />
              </div>
              <div>
                <Label className="font-body">Your Review</Label>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience with Dr. Nandita..." className="mt-1 font-body bg-secondary/50" rows={4} required />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="font-body">Submit Review</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="font-body">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground font-body">Loading reviews…</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1">No reviews yet</h3>
              <p className="text-muted-foreground font-body text-sm">Be the first to review Dr. Nandita!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <p className="font-body font-semibold text-foreground">{review.patient_name}</p>
                  <div className="text-right">
                    <RatingStars rating={review.rating} size="sm" />
                    <p className="text-xs text-muted-foreground font-body mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-foreground/80 font-body mt-3 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
