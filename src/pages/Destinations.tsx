import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { destinations, CustomDestination } from '../data/destinations';
import styles from './Destinations.module.css';

const Destinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDestinationClick = (destination: CustomDestination) => {
    console.log('Navigating to tours with location:', destination.name);
    // Navigate to tours page with the destination name as a query parameter
    navigate(`/tours?location=${encodeURIComponent(destination.name)}`);
  };

  return (
    <div className={styles.destinationsPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('destinations.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('destinations.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className={styles.destinationsContainer}>
        <div className={styles.destinationsGrid}>
          {destinations.map((destination) => (
            <motion.div 
              key={destination.id}
              className={`${styles.destinationCard} ${destination.isPopular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              onClick={() => handleDestinationClick(destination)}
              style={{ cursor: 'pointer' }}
            >
              {destination.isPopular && <div className={styles.popularBadge}>{t('destinations.popular')}</div>}
              <div className={styles.imageWrapper}>
                <img 
                  src={Array.isArray(destination.image) ? destination.image[0] : destination.image} 
                  alt={destination.name}
                  className={styles.destinationImage}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a placeholder image if the main image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    target.onerror = null; // Prevent infinite loop if placeholder also fails
                  }}
                />
                {Array.isArray(destination.image) && destination.image.length > 1 && (
                  <div className={styles.imageCount}>
                    +{destination.image.length - 1}
                  </div>
                )}
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.destinationInfo}>
                <div className={styles.destinationHeader}>
                  <h3>{destination.name}</h3>
                  <div className={styles.location}>
                    <MapPinIcon className={styles.locationIcon} />
                    <span>{destination.country}</span>
                  </div>
                </div>
                <p className={styles.description}>{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
