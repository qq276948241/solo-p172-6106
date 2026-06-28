import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: 1 | 2 | 3 | 4 | 5) => void;
  readonly?: boolean;
  size?: number;
  className?: string;
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = 20,
  className,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars.map((s) => {
        const filled = s <= value;
        return (
          <button
            key={s}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange?.(s as 1 | 2 | 3 | 4 | 5)}
            className={cn(
              "transition-all duration-150",
              !readonly && "cursor-pointer hover:scale-110 active:scale-95",
              readonly && "cursor-default"
            )}
          >
            <Star
              size={size}
              strokeWidth={1.8}
              className={cn(
                "transition-colors duration-150",
                filled
                  ? "text-caramel-500 fill-caramel-500"
                  : "text-mocha-400/40 fill-transparent"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
