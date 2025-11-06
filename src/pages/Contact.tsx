import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${styles.animated} ${styles.container}`}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
        </div>
        
        <div className={styles.grid}>
          <div>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <p className={styles.description}>
              Have questions or need more information? Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <MapPinIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>123 Travel Street, Cairo, Egypt</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <PhoneIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>+20 123 456 7890</p>
                  <p className={styles.contactSubtext}>Mon-Fri, 9am-5pm</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <EnvelopeIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>info@getyourtrip.com</p>
                  <p className={styles.contactSubtext}>We'll respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
