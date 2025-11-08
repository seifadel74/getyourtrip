import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, TagIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <ShieldCheckIcon />,
      title: t('whyChooseUs.features.bestPrice.title'),
      description: t('whyChooseUs.features.bestPrice.description')
    },
    {
      icon: <GlobeAltIcon />,
      title: t('whyChooseUs.features.worldwide.title'),
      description: t('whyChooseUs.features.worldwide.description')
    },
    {
      icon: <TagIcon />,
      title: t('whyChooseUs.features.bestDeals.title'),
      description: t('whyChooseUs.features.bestDeals.description')
    },
    {
      icon: <HeartIcon />,
      title: t('whyChooseUs.features.bestServices.title'),
      description: t('whyChooseUs.features.bestServices.description')
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('whyChooseUs.title')}</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            {t('whyChooseUs.subtitle')}
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
