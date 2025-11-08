import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.css';

const Contact = () => {
  const { t } = useTranslation();
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
    // In production, send data to your API endpoint
    alert(t('contact.form.successMessage'));
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
          <h1 className={styles.title}>{t('contact.title')}</h1>
        </div>
        
        <div className={styles.grid}>
          <div>
            <h2 className={styles.sectionTitle}>{t('contact.getInTouch')}</h2>
            <p className={styles.description}>
              {t('contact.description')}
            </p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <MapPinIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>{t('contact.address')}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <PhoneIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>{t('contact.phone')}</p>
                  <p className={styles.contactSubtext}>{t('contact.phoneHours')}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconContainer}>
                  <EnvelopeIcon className={styles.icon} aria-hidden="true" />
                </div>
                <div>
                  <p className={styles.contactText}>{t('contact.email')}</p>
                  <p className={styles.contactSubtext}>{t('contact.emailResponse')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t('contact.form.name')} <span className={styles.required}>{t('contact.form.required')}</span>
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
                  {t('contact.form.email')} <span className={styles.required}>{t('contact.form.required')}</span>
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
                  {t('contact.form.subject')}
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
                  {t('contact.form.message')} <span className={styles.required}>{t('contact.form.required')}</span>
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
                  {t('contact.form.sendMessage')}
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
