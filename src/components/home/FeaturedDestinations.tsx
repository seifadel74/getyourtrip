import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { destinations, CustomDestination } from '../../data/destinations';
import styles from './FeaturedDestinations.module.css';

const FeaturedDestinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleDestinationClick = (tourLink: string) => {
    navigate(tourLink);
  };
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${styles.header} ${styles.animated}`}
        >
          <h2 className={styles.title}>{t('featuredDestinations.title')}</h2>
          <p className={styles.subtitle}>
            {t('featuredDestinations.subtitle')}
          </p>
        </motion.div>

        <div className={styles.grid}>
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${styles.card} ${styles.animated}`}
            >
              <div 
  onClick={() => handleDestinationClick(destination.tourLink)}
  className={styles.cardLink}
  style={{ cursor: 'pointer' }}
>
                <div className={styles.imageContainer}>
                  <img
                    src={Array.isArray(destination.image) ? destination.image[0] : destination.image}
                    alt={destination.name}
                    className={styles.image}
                  />
                  <div className={styles.overlay} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.location}>
                        <h3 className={styles.destinationName}>{destination.name}</h3>
                        <p className={styles.countryName}>{destination.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <p className={styles.description}>{destination.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.buttonContainer}
        >
          <div 
            onClick={() => navigate('/tours')}
            className={styles.viewAllButton}
            style={{ cursor: 'pointer' }}
          >
            {t('featuredDestinations.viewAllDestinations')}
            <svg
              className={styles.buttonIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
