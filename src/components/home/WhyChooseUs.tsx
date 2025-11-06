import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, TagIcon, HeartIcon } from '@heroicons/react/24/outline';
import styles from './WhyChooseUs.module.css';

const features = [
  {
    icon: <ShieldCheckIcon />,
    title: 'Best Price Guarantee',
    description: 'We offer the best prices for your dream vacation, guaranteed!'
  },
  {
    icon: <GlobeAltIcon />,
    title: 'Worldwide Coverage',
    description: 'Explore amazing destinations all around the world with our expert guides.'
  },
  {
    icon: <TagIcon />,
    title: 'Best Deals',
    description: 'Exclusive deals and discounts for our loyal customers.'
  },
  {
    icon: <HeartIcon />,
    title: 'Best Services',
    description: '24/7 customer support to ensure you have the best travel experience.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            We are committed to providing you with the best travel experience possible.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${styles.card} ${styles.animated}`}
            >
              <div className={styles.iconContainer}>
                {React.cloneElement(feature.icon, { className: styles.icon })}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
