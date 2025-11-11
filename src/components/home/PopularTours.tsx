import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import styles from './PopularTours.module.css';

const PopularTours = React.memo(() => {
  const { t } = useTranslation();
  const [tours, setTours] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        console.log('Fetching all tours...');
        const response = await api.tours.getAll({
          // Remove the featured filter to get all tours
          per_page: 4, // Still limit to 4 tours for display
        });
        
        console.log('API Response:', response);
        
        if (response && response.data) {
          console.log('Tours data:', response.data);
          // Take first 4 tours if more are returned
          const toursToShow = Array.isArray(response.data) ? response.data.slice(0, 4) : [response.data];
          setTours(toursToShow);
        } else {
          console.warn('No tours data in response or request was not successful');
          setTours([]);
        }
      } catch (err) {
        const error = err as any; // Type assertion since we don't know the exact error type
        console.error('Error fetching featured tours:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else if (error.message) {
          console.error('Error message:', error.message);
        }
        setTours([]);
      }
    };

    fetchFeaturedTours();
  }, []);
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('popularTours.title')}</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            {t('popularTours.subtitle')}
          </p>
        </div>

        <div className={styles.grid}>
          {tours.length > 0 ? tours.map((tour, index) => (
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
                    src={Array.isArray(tour.image) ? (tour.image[0] || '') : (tour.image || '')}
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
                    <span className={styles.priceLabel}>{t('popularTours.perPerson')}</span>
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
          )) : (
            <div className={styles.emptyState}>
              <p>{t('popularTours.noTours') || 'No tours available at the moment.'}</p>
            </div>
          )}
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
