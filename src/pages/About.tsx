import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, UsersIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';

const About = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      name: t('about.ourValues.passionateExperts.name'),
      description: t('about.ourValues.passionateExperts.description'),
      icon: UsersIcon,
    },
    {
      name: t('about.ourValues.sustainableTravel.name'),
      description: t('about.ourValues.sustainableTravel.description'),
      icon: GlobeAltIcon,
    },
    {
      name: t('about.ourValues.personalizedService.name'),
      description: t('about.ourValues.personalizedService.description'),
      icon: CheckCircleIcon,
    },
    {
      name: t('about.ourValues.safetyFirst.name'),
      description: t('about.ourValues.safetyFirst.description'),
      icon: ShieldCheckIcon,
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Travel enthusiast with over 15 years of experience in the tourism industry.'
    },
    {
      name: 'Maria Garcia',
      role: 'Travel Specialist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Expert in crafting personalized travel experiences across Europe and Asia.'
    },
    {
      name: 'James Wilson',
      role: 'Operations Manager',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Ensures every trip runs smoothly from start to finish.'
    },
    {
      name: 'Sarah Chen',
      role: 'Customer Experience',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Dedicated to making your travel experience seamless and memorable.'
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
            alt="Travel Adventure"
            loading="lazy"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {t('about.title')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.storyGrid}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={styles.storyTitle}>{t('about.ourStory.title')}</h2>
              <p className={styles.storyText}>
                {t('about.ourStory.paragraph1')}
              </p>
              <p className={styles.storyText}>
                {t('about.ourStory.paragraph2')}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.storyImage}>
                <img
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our Team"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className={styles.sectionGray}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.ourValues.title')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('about.ourValues.subtitle')}
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((feature, index) => (
              <motion.div 
                key={index} 
                className={styles.valueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.valueIcon}>
                  <feature.icon className={styles.icon} aria-hidden="true" />
                </div>
                <h3 className={styles.valueTitle}>{feature.name}</h3>
                <p className={styles.valueDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.team.title')}</h2>
            <p className={styles.sectionSubtitle}>
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className={styles.teamMember}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.memberImage}>
                  <img
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            <span>{t('about.cta.title')}</span>
            <span className={styles.ctaSubtitle}>{t('about.cta.subtitle')}</span>
          </h2>
          <div className={styles.ctaButtons}>
            <Link to="/tours" className={styles.ctaButton}>
              {t('about.cta.exploreTours')}
            </Link>
            <Link to="/contact" className={styles.ctaButtonSecondary}>
              {t('about.cta.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
