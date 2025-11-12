import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${styles.content} ${styles.animated}`}
        >
          <h2 className={styles.title}>{t('newsletter.title')}</h2>
          <p className={styles.description}>
            {t('newsletter.description')}
          </p>
          
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successMessage}
            >
              <svg
                className={styles.successIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{t('newsletter.success')}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t('newsletter.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder={t('newsletter.emailPlaceholder')}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.button} ${isLoading ? styles.loading : ''}`}
              >
                {isLoading ? (
                  <span className={styles.buttonContent}>
                    <svg
                      className={styles.spinner}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      ></circle>
                      <path
                        className={styles.loaderPath}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('newsletter.subscribing')}
                  </span>
                ) : (
                  t('newsletter.subscribe')
                )}
              </button>
            </form>
          )}
          
          <p className={styles.privacyText}>
            {t('newsletter.privacy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
