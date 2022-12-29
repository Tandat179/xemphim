import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../assets/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    precision: 0.5,
    isHalf: true,
    size: 20,
    edit: false,
  };

  return (
    <div className="reviewCard">

      {/* Image User */}
      <img src={profilePng} alt="User" />
      {/* Review name */}
      <p>{review.name}</p>
      {/* Rating Star */}
      <ReactStars value={review.rating} {...options} />
      {/* Comment */}
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
