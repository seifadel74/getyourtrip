import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { api } from '../../services/api';
import styles from './TourDetail.module.css';

interface ReviewFormProps {
  tourId: number;
  bookingId?: number;
  onReviewSubmitted: () => void;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  tourId,
  bookingId,
  onReviewSubmitted,
  onClose,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !email.trim() || !comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (comment.length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.reviews.create({
        tour_id: tourId,
        booking_id: bookingId,
        author,
        email,
        rating,
        comment,
      });

      if (response.success) {
        toast.success('Review submitted successfully! It will be published after approval.');
        setAuthor('');
        setEmail('');
        setComment('');
        setRating(5);
        onReviewSubmitted();
        onClose();
      } else {
        toast.error(response.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewFormOverlay}>
      <div className={styles.reviewFormContainer}>
        <div className={styles.reviewFormHeader}>
          <h3 className={styles.reviewFormTitle}>Write a Review</h3>
          <button
            onClick={onClose}
            className={styles.reviewFormCloseButton}
            aria-label="Close review form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          {/* Rating */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Rating *</label>
            <div className={styles.ratingSelector}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={styles.ratingButton}
                  aria-label={`Rate ${star} stars`}
                >
                  <StarIcon
                    className={`${styles.ratingStarIcon} ${
                      star <= (hoverRating || rating)
                        ? styles.ratingStarFilled
                        : styles.ratingStarEmpty
                    }`}
                    fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
            <p className={styles.ratingLabel}>
              {rating} star{rating !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Author Name */}
          <div className={styles.formGroup}>
            <label htmlFor="author" className={styles.formLabel}>
              Your Name *
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Comment */}
          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.formLabel}>
              Your Review * (minimum 10 characters)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`${styles.formInput} ${styles.textarea}`}
              placeholder="Share your experience with this tour..."
              rows={5}
              required
            />
            <p className={styles.characterCount}>
              {comment.length} / 1000 characters
            </p>
          </div>

          {/* Buttons */}
          <div className={styles.reviewFormButtons}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
