import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const validImages = images && images.length > 0 ? images : [];

  // Reset to first image when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Auto-play slider (optional)
  useEffect(() => {
    if (validImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [validImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Early return after all hooks
  if (validImages.length === 0) {
    return null;
  }

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        {validImages.length > 1 && (
          <button
            onClick={goToPrevious}
            className={styles.navButton}
            aria-label="Previous image"
          >
            <ChevronLeftIcon className={styles.navIcon} />
          </button>
        )}

        <div className={styles.imageWrapper}>
          {validImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                index === currentIndex ? styles.slideActive : styles.slideInactive
              }`}
            >
              <img
                src={image}
                alt={index === 0 ? alt : `${alt} ${index + 1}`}
                className={styles.slideImage}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {validImages.length > 1 && (
          <button
            onClick={goToNext}
            className={styles.navButton}
            aria-label="Next image"
          >
            <ChevronRightIcon className={styles.navIcon} />
          </button>
        )}
      </div>

      {/* Dots indicator */}
      {validImages.length > 1 && (
        <div className={styles.dotsContainer}>
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : ''
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {validImages.length > 1 && (
        <div className={styles.counter}>
          {currentIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;

