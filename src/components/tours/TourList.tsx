import React from 'react';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import styles from './TourList.module.css';
import { Tour } from '../../types/tour';

interface TourListProps {
  tours?: Tour[];
}

// Default tours data in case none is provided
const defaultTours: Tour[] = [
  {
    id: 1,
    title: 'Luxury Red Sea Cruise',
    location: 'Hurghada',
    duration: '7 Days',
    price: 899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552733407-9d000c897dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'cruise',
    groupSize: 'Small Group',
    description: 'Experience the beauty of the Red Sea with our luxury cruise package.'
  },
  {
    id: 2,
    title: 'Pyramids & Nile Cruise',
    location: 'Cairo & Luxor',
    duration: '5 Days',
    price: 749,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503177119279-aa258b946e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'cultural',
    groupSize: 'Small Group',
    description: 'Discover ancient Egyptian history with our guided tour of the pyramids and a relaxing Nile cruise.'
  },
  {
    id: 3,
    title: 'Desert Safari Adventure',
    location: 'Sahara Desert',
    duration: '3 Days',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: false,
    type: 'adventure',
    groupSize: 'Private',
    description: 'Experience the magic of the Sahara Desert with our guided safari adventure.'
  },
  {
    id: 4,
    title: 'Red Sea Diving Experience',
    location: 'Sharm El Sheikh',
    duration: '4 Days',
    price: 649,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'adventure',
    groupSize: 'Small Group',
    description: 'Discover the underwater world of the Red Sea with our professional diving instructors.'
  }
];

const TourList: React.FC<TourListProps> = ({ tours = defaultTours }) => {
  // Ensure tours is always an array to prevent undefined errors
  const displayTours = Array.isArray(tours) ? tours : [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const toursPerPage = 6;

  // Pagination calculations
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = displayTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(displayTours.length / toursPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.tourList}>
      {/* Removed View Mode Toggle */}
      {/* Tours Grid */}
      <div className={styles.toursGridFixedFour}> {/* <-- Now 4-column forced grid */}
        {currentTours.map((tour) => (
          <div 
            key={tour.id}
            className={styles.tourCard}
          >
            <div className={styles.tourImageContainer}>
              <img 
                src={Array.isArray(tour.image) ? (tour.image[0] || '') : (tour.image || '')} 
                alt={tour.title} 
                className={styles.tourImage}
              />
            </div>
            <div className={styles.tourContent}>
              <div className={styles.tourHeader}>
                <h3 className={styles.tourTitle}>{tour.title}</h3>
                <div className={styles.tourRating}>
                  <StarIcon className={styles.ratingIcon} />
                  <span className={styles.ratingText}>{tour.rating}</span>
                </div>
              </div>
              <div className={styles.tourMeta}>
                <span className={styles.metaItem}>
                  <MapPinIcon className={styles.metaIcon} />
                  <span className={styles.metaText}>{tour.location}</span>
                </span>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaItem}>
                  <ClockIcon className={styles.metaIcon} />
                  <span className={styles.metaText}>{tour.duration}</span>
                </span>
              </div>
              {/* Description removed */}
              <div className={styles.tourFooter}>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>${tour.price}</p>
                  <span className={styles.priceLabel}>per person</span>
                </div>
                <Link 
                  to={`/tours/${tour.id}`}
                  className={styles.viewButton}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination (unchanged) */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className={styles.pageButton}
            >
              Previous
            </button>
          )}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => paginate(pageNum)}
                className={`${styles.pageButton} ${
                  currentPage === pageNum ? styles.pageButtonActive : ''
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className={styles.pageButton}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TourList;
