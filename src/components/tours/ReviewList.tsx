import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Review } from '../../types';
import styles from './TourDetail.module.css';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className={styles.reviewsList}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <div>
              <h4 className={styles.reviewAuthor}>{review.author}</h4>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`${styles.starIcon} ${
                      i < review.rating ? styles.filledStar : styles.emptyStar
                    }`}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <span className={styles.ratingValue}>{review.rating}</span>
          </div>
          <p className={styles.reviewDate}>
            {review.created_at ? new Date(review.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'Recently'}
          </p>
          <p className={styles.reviewText}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
