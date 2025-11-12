import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    duration: '',
    date: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create query parameters
    const queryParams = new URLSearchParams();
    if (searchParams.destination) queryParams.append('destination', searchParams.destination);
    if (searchParams.duration) queryParams.append('duration', searchParams.duration);
    if (searchParams.date) queryParams.append('date', searchParams.date);
    
    // Navigate to tours page with search parameters
    navigate(`/tours?${queryParams.toString()}`);
  };
  return (
    <section className={styles.heroSection}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundOverlay}>
        <div className={styles.overlayGradient}></div>
        <div className={styles.backgroundImage}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.contentWrapper}
        >
          <span className={styles.tagline}>
            {t('hero.tagline')}
          </span>
          <h1 className={styles.title}>
            {t('hero.title')}
          </h1>
          <p className={styles.description}>
            {t('hero.description')}
          </p>
          <div className={styles.buttonsContainer}>
            <Link 
              to="/tours" 
              className={styles.primaryButton}
            >
              {t('hero.exploreTours')}
              <ArrowRightIcon className={styles.icon} />
            </Link>
            <Link 
              to="/about" 
              className={styles.secondaryButton}
            >
              {t('hero.learnMore')}
            </Link>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.searchBar}
          onSubmit={handleSearch}
        >
          <h3 className={styles.searchTitle}>{t('hero.searchTitle')}</h3>
          <div className={styles.searchGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="destination" className={styles.formLabel}>{t('hero.destination')}</label>
              <select 
                id="destination"
                name="destination"
                className={styles.formSelect}
                value={searchParams.destination}
                onChange={handleInputChange}
              >
                <option value="">{t('hero.selectDestination')}</option>
                <option value="Marsa Alam">Marsa Alam</option>
                <option value="Cairo">Cairo</option>
                <option value="Safaga">Safaga</option>
                <option value="Luxor">Luxor</option>
                <option value="Hurghada">Hurghada</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="duration" className={styles.formLabel}>{t('hero.duration')}</label>
              <select 
                id="duration"
                name="duration"
                className={styles.formSelect}
                value={searchParams.duration}
                onChange={handleInputChange}
              >
                <option value="">{t('hero.anyDuration')}</option>
                <option value="1-3">{t('hero.days1to3')}</option>
                <option value="4-7">{t('hero.days4to7')}</option>
                <option value="7-14">{t('hero.weeks1to2')}</option>
                <option value="14+">{t('hero.weeks2plus')}</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.formLabel}>{t('hero.travelDate')}</label>
              <input 
                id="date"
                type="date" 
                name="date"
                className={styles.formInput}
                value={searchParams.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.searchButton}>
                {t('hero.search')}
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Scroll Down Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.animateBounce}>
          <svg 
            className={styles.scrollIcon} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
