import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import styles from './PopularTours.module.css';
import allTours from '../../data/tours';

// Function to get random tours from the allTours array
const getRandomTours = (count: number) => {
  const shuffled = [...allTours].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const PopularTours = React.memo(() => {
  const [randomTours, setRandomTours] = useState<any[]>([]);
  
  useEffect(() => {
    setRandomTours(getRandomTours(4));
  }, []);
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Popular Tours</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Explore our most popular travel experiences
          </p>
        </div>

        <div className={styles.grid}>
          {randomTours.map((tour, index) => (
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
                    <span>{tour.rating} <span className={styles.reviews}>(24 reviews)</span></span>
                  </div>
                </div>
                
                <div className={styles.metaInfo}>
                  <div className={styles.location}>
                    <MapPinIcon className={styles.icon} />
                    <span>{tour.location}</span>
                  </div>
                  <div className={styles.duration}>
                    <ClockIcon className={styles.icon} />
                    <span>{tour.duration}</span>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <div>
                    <span className={styles.price}>${tour.price}</span>
                    <span className={styles.priceLabel}>Per Person</span>
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
});

PopularTours.displayName = 'PopularTours';

export default PopularTours;
