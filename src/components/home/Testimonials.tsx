import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import styles from './Testimonials.module.css';

// Move testimonials data outside component to prevent recreation on each render
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Travel Enthusiast',
    content: 'The best travel experience I\'ve ever had! The team went above and beyond to make our trip memorable.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Adventure Seeker',
    content: 'Excellent service and well-organized tours. I highly recommend Get Your Trip for your next adventure!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Solo Traveler',
    content: 'As a solo traveler, I felt completely safe and well taken care of throughout my journey. Will definitely book again!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const Testimonials = React.memo(() => {
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Travelers Say</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Hear from our happy travelers about their experiences with us
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${styles.card} ${styles.animated}`}
            >
              <div className={styles.userInfo}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className={styles.avatar}
                />
                <div>
                  <h4 className={styles.userName}>{testimonial.name}</h4>
                  <p className={styles.userRole}>{testimonial.role}</p>
                </div>
              </div>
              <p className={styles.content}>{testimonial.content}</p>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`${styles.star} ${i < testimonial.rating ? styles.starFilled : styles.starEmpty}`} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
