import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };

const RatingStars = ({ rating, size = "md", interactive = false, onChange }: RatingStarsProps) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`${sizeMap[size]} ${
              star <= rating
                ? "fill-accent text-accent"
                : "fill-none text-muted-foreground/30"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
