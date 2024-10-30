import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./ReviewSection.css";

const reviews = [
  {
    id: 1,
    user: "Chelito Estigarribia",
    avatarColor: "red",
    rating: 4.5,
    date: "Oct 20, 2024",
    review: "Pedazo de camiseta amigos! y al mejor precio!",
  },
  {
    id: 2,
    user: "Monica Arevalo",
    avatarColor: "yellow",
    rating: 5,
    date: "Dic 9, 2023",
    review:
      "Una pagina donde venden tambien camisetas para nosotras, estamos encantadas!",
  },
];

export default function ReviewSection() {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div>
      <div className="review-section-container">
        <div className="review-section-content">
          <h1 className="review-section-title">Reviews</h1>
          <div className="review-card-container">
            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-card-header">
                  <div className="review-card-user">
                    <div className={`user-avatar ${review.avatarColor}`}>
                      {review.user.charAt(0)}
                    </div>
                    <span className="user-name">{review.user}</span>
                  </div>
                  <div className="review-card-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div>{review.review}</div>
                <div className="review-card-footer">
                  <span className="review-card-date">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
