import { useState, useMemo } from "react";
import { StarIcon } from "lucide-react";
import classNames from "@/lib/utils/classNames";

const styles = {
  base: "h-5 w-5 flex-shrink-0",
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
};

const Star = ({
  lit,
  onClick,
  hoverHighlight = false,
  color = "amber",
}: StarProps) => (
  <StarIcon
    className={classNames(
      styles.base,
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
  onChange?: (rating: number) => void;
};

export const Stars = (props: StarsProps) => {
  const {
    scale = 5,
    rating,
    hoverHighlight,
    color = "amber",
    onChange,
  } = props;
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
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Stars;
