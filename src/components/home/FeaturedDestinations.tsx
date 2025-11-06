import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './FeaturedDestinations.module.css';

const destinations = [
  {
    id: 1,
    name: 'شرم الشيخ',
    country: 'مصر',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 350,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'دبي',
    country: 'الإمارات',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 420,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'إسطنبول',
    country: 'تركيا',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 290,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'باريس',
    country: 'فرنسا',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    price: 510,
    rating: 4.9,
  },
];

const FeaturedDestinations = () => {
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
          <h2 className={styles.title}>الوجهات المميزة</h2>
          <p className={styles.subtitle}>
            اكتشف أفضل الوجهات السياحية حول العالم مع عروض حصرية
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
              <Link to={`/tours/${destination.id}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className={styles.image}
                  />
                  <div className={styles.overlay} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.rating}>
                        <span>{destination.rating}</span>
                        <svg
                          className={styles.starIcon}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className={styles.location}>
                        <h3 className={styles.destinationName}>{destination.name}</h3>
                        <p className={styles.countryName}>{destination.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.priceLabel}>ابتداءً من</span>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>${destination.price}</span>
                    <span className={styles.priceSuffix}>/ لليلة</span>
                  </div>
                </div>
              </Link>
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
          <Link to="/tours" className={styles.viewAllButton}>
            عرض جميع الوجهات
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
