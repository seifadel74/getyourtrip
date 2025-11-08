import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  const { t } = useTranslation();
  
  return (
    <section className={styles.section}>
      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.backgroundPatternInner} />
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${styles.animated} ${styles.heading}`}
          >
            {t('callToAction.title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.subtitle}
          >
            {t('callToAction.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.buttonsContainer}
          >
            <Link 
              to="/tours"
              className={styles.primaryButton}
            >
              {t('callToAction.exploreTours')}
            </Link>
            <Link 
              to="/contact"
              className={styles.secondaryButton}
            >
              {t('callToAction.contactUs')}
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={styles.contactInfo}
          >
            <div className={styles.contactItem}>
              <div className={styles.contactIconContainer}>
                <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{t('callToAction.callUs')}</span>
                <span className={styles.contactValue}>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contactItem}>
              <div className={styles.contactIconContainer}>
                <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{t('callToAction.emailUs')}</span>
                <span className={styles.contactValue}>info@getyourtrip.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
