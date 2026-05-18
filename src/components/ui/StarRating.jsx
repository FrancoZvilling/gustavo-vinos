import { Wine } from 'lucide-react';
import './StarRating.css';

export default function StarRating({ rating = 0, maxRating = 5, size = 18, showLabel = false }) {
  const fullCups = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="star-rating" aria-label={`Valoración: ${rating} de ${maxRating}`}>
      <div className="star-rating__icons">
        {Array.from({ length: maxRating }, (_, i) => (
          <Wine
            key={i}
            size={size}
            className={`star-rating__icon ${
              i < fullCups
                ? 'star-rating__icon--filled'
                : i === fullCups && hasHalf
                ? 'star-rating__icon--half'
                : 'star-rating__icon--empty'
            }`}
          />
        ))}
      </div>
      {showLabel && <span className="star-rating__label">{rating.toFixed(1)}</span>}
    </div>
  );
}
