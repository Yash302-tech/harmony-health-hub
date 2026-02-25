import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockReviews, mockDoctors } from "@/data/mockData";
import { toast } from "sonner";

const Reviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    toast.success("Thank you for your review! 🌟");
    setShowForm(false);
    setRating(0);
    setComment("");
    setSelectedDoctor("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Reviews & Ratings</h1>
            <p className="text-muted-foreground font-body mt-1">See what patients say about our doctors</p>
          </div>
          <Button className="font-body" onClick={() => setShowForm(!showForm)}>
            <MessageSquare className="w-4 h-4 mr-2" /> Write Review
          </Button>
        </div>

        {/* Review form */}
        {showForm && (
          <div className="bg-card rounded-xl border border-border p-6 animate-scale-in">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="font-body">Select Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="mt-1 font-body bg-secondary/50">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map((d) => (
                      <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body mb-2 block">Your Rating</Label>
                <RatingStars rating={rating} size="lg" interactive onChange={setRating} />
              </div>
              <div>
                <Label className="font-body">Your Review</Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with the doctor..."
                  className="mt-1 font-body bg-secondary/50"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="font-body">Submit Review</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="font-body">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <p className="font-body font-semibold text-foreground">{review.patientName}</p>
                  <p className="text-sm text-primary font-body">on {review.doctorName}</p>
                </div>
                <div className="text-right">
                  <RatingStars rating={review.rating} size="sm" />
                  <p className="text-xs text-muted-foreground font-body mt-1">{review.date}</p>
                </div>
              </div>
              <p className="text-foreground/80 font-body mt-3 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
