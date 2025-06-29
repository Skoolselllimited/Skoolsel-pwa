import { useState, useMemo } from "react";
import { StarIcon } from "lucide-react";
import classNames from "@/lib/utils/classNames";

// Define size classes
const sizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

const styles = {
  colors: {
    amber: {
      lit: "text-amber-400 fill-amber-400",
      hover: "hover:fill-yellow-600",
      unlit: "text-[#dadde5] hover:fill-gray-500",
    },
  },
};

type StarProps = {
  lit?: boolean;
  onClick?: () => void;
  hoverHighlight?: boolean;
  color?: "amber";
  size?: keyof typeof sizes; // 'sm' | 'md' | 'lg'
};

const Star = ({
  lit,
  onClick,
  hoverHighlight = false,
  color = "amber",
  size = "md",
}: StarProps) => (
  <StarIcon
    className={classNames(
      sizes[size],
      lit ? styles.colors[color].lit : styles.colors[color].unlit,
      hoverHighlight && styles.colors[color].hover,
      hoverHighlight && "cursor-pointer"
    )}
    aria-hidden="true"
    onClick={onClick}
  />
);

type StarsProps = {
  scale?: number;
  rating: number;
  hoverHighlight?: boolean;
  color?: "amber";
  size?: keyof typeof sizes; // 'sm' | 'md' | 'lg'
  onChange?: (rating: number) => void;
};

export const Stars = ({
  scale = 5,
  rating,
  hoverHighlight,
  color = "amber",
  size = "md",
  onChange,
}: StarsProps) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const ratings = useMemo(() => [...Array(scale).keys()], [scale]);

  const handleClick = (index: number) => {
    if (onChange) {
      setCurrentRating(index + 1);
      onChange(index + 1);
    }
  };

  return (
    <div className="flex">
      {ratings.map((index) => (
        <Star
          key={index}
          lit={index < (onChange ? currentRating : rating)}
          hoverHighlight={hoverHighlight}
          color={color}
          size={size}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Stars;
