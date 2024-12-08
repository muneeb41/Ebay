import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = ({ rating, totalStars = 5 }) => {
  // Helper to generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        // Full Star
        stars.push(<BsStarFill key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half Star
        stars.push(<BsStarHalf key={i} className="text-yellow-500" />);
      } else {
        // Empty Star
        stars.push(<BsStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{renderStars()}</div>
      <span className="text-sm font-medium text-gray-600">
        {rating ? rating.toFixed(2) : "0.0"}
      </span>
    </div>
  );
};

export default StarRating;
