import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    mobile_number: string;
    message: string;
  }>({
    name: '',
    email: '',
    mobile_number: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
    const { api } = await import('../services/api');
    const submissionData: {
      name: string;
      email: string;
      message: string;
      mobile_number?: string;
    } = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      ...(formData.mobile_number && { mobile_number: formData.mobile_number })
    };
    
    const response = await api.contact.submit(submissionData); 
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: t('contact.form.successMessage') || 'Your message has been sent successfully! We will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          mobile_number: '',
          message: ''
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || 'There was an error submitting your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${styles.notification} ${
                  submitStatus.type === 'success' ? styles.notificationSuccess : styles.notificationError
                }`}
              >
                <div className={styles.notificationContent}>
                  {submitStatus.type === 'success' ? (
                    <svg className={styles.notificationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className={styles.notificationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <p className={styles.notificationMessage}>{submitStatus.message}</p>
                </div>
              </motion.div>
            )}
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
                <label htmlFor="mobile_number" className={styles.label}>
                  {t('contact.form.mobile_number', 'Whatsapp Number')}
                </label>
                <input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
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
                  disabled={isSubmitting}
                  className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonDisabled : ''}`}
                >
                  {isSubmitting ? (
                    <span className={styles.loadingText}>
                      <svg className={styles.spinner} viewBox="0 0 24 24">
                        <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    t('contact.form.sendMessage')
                  )}
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
