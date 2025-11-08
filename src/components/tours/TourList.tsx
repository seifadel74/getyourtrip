import React, { useState } from 'react';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import styles from './TourList.module.css';
import { Tour } from '../../types/tour';

interface TourListProps {
  tours: Tour[];
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
    groupSize: 'Small Group'
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
    groupSize: 'Small Group'
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
    groupSize: 'Private'
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
    groupSize: 'Small Group'
  },
  {
    id: 5,
    title: 'Luxor & Aswan Nile Cruise',
    location: 'Luxor, Aswan',
    duration: '7 Days',
    price: 1099,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true,
    type: 'cultural',
    groupSize: 'Small Group'
  },
  {
    id: 6,
    title: 'Cairo City Tour',
    location: 'Cairo',
    duration: '1 Day',
    price: 99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: false,
    type: 'cultural',
    groupSize: 'Private'
  },
];

const TourList: React.FC<TourListProps> = ({ tours = defaultTours }) => {
  // All hooks must be called at the top level, unconditionally
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  // Pagination calculations (these are not hooks, just regular variables)
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {/* View Mode Toggle */}
      <div className={styles.viewModeToggle}>
        <p className={styles.viewModeText}>Showing {indexOfFirstTour + 1}-{Math.min(indexOfLastTour, tours.length)} of {tours.length} tours</p>
        <div className={styles.viewModeButtons}>
          <button 
            onClick={() => setViewMode('grid')} 
            className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.viewModeButtonActive : styles.viewModeButtonInactive}`}
            aria-label="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.viewModeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.viewModeButtonActive : styles.viewModeButtonInactive}`}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.viewModeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className={`${viewMode === 'grid' ? styles.gridView : styles.listView}`}>
        {currentTours.map((tour) => (
          <div 
            key={tour.id}
            className={`${styles.tourCard} ${viewMode === 'list' ? styles.tourCardList : ''}`}
          >
            <div className={`${styles.tourImageContainer} ${viewMode === 'list' ? styles.tourImageContainerList : ''}`}>
              <img 
                src={tour.image} 
                alt={tour.title} 
                className={styles.tourImage}
              />
            </div>
            
            <div className={`${styles.tourContent} ${viewMode === 'list' ? styles.tourContentList : ''}`}>
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
              
              <p className={styles.tourDescription}>
                Experience the beauty of {tour.location} with our expertly guided tour. {tour.duration} of unforgettable memories.
              </p>
              
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <nav className={styles.paginationNav}>
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
              aria-label="Previous page"
            >
              <span className={styles.srOnly}>Previous</span>
              <svg className={styles.paginationIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`${styles.pageNumber} ${
                  currentPage === number
                    ? styles.pageNumberActive
                    : styles.pageNumberInactive
                }`}
                aria-label={`Page ${number}`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
              aria-label="Next page"
            >
              <span className={styles.srOnly}>Next</span>
              <svg className={styles.paginationIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TourList;
