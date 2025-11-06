import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import styles from './PopularTours.module.css';

const tours = [
  {
    id: 1,
    title: 'Luxury Red Sea Cruise',
    location: 'Hurghada',
    duration: '7 Days',
    price: 899,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552733407-9d000c897dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true
  },
  {
    id: 2,
    title: 'Pyramids & Nile Cruise',
    location: 'Cairo & Luxor',
    duration: '5 Days',
    price: 749,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503177119279-aa258b946e0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true
  },
  {
    id: 3,
    title: 'Desert Safari Adventure',
    location: 'Sahara Desert',
    duration: '3 Days',
    price: 499,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: false
  },
  {
    id: 4,
    title: 'Red Sea Diving Experience',
    location: 'Sharm El Sheikh',
    duration: '4 Days',
    price: 649,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    featured: true
  },
];

const PopularTours = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Popular Tours</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Discover our most popular travel packages that have been carefully crafted to provide you with unforgettable experiences.
          </p>
        </div>

        <div className={styles.grid}>
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${styles.card} ${styles.animated}`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={tour.image}
                  alt={tour.title}
                  className={styles.image}
                />
                {tour.featured && (
                  <div className={styles.featuredBadge}>
                    Featured
                  </div>
                )}
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{tour.title}</h3>
                  <div className={styles.rating}>
                    <StarIcon className={styles.ratingIcon} />
                    <span>{tour.rating}</span>
                  </div>
                </div>
                
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <MapPinIcon className={styles.metaIcon} />
                    <span>{tour.location}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <ClockIcon className={styles.metaIcon} />
                    <span>{tour.duration}</span>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <div>
                    <span className={styles.price}>${tour.price}</span>
                    <span className={styles.priceLabel}>Per person</span>
                  </div>
                  <Link
                    to={`/tours/${tour.id}`}
                    className={styles.viewButton}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.buttonWrapper}
          >
            <Link 
              to="/tours"
              className={styles.viewAllButton}
            >
              View All Tours
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <svg 
                  className={styles.buttonIcon}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PopularTours;
