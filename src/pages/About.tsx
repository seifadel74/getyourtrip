import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, UsersIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import styles from './About.module.css';

const About = () => {
  const values = [
    {
      name: 'Passionate Experts',
      description: 'Our team consists of travel enthusiasts who have personally experienced the destinations we offer.',
      icon: UsersIcon,
    },
    {
      name: 'Sustainable Travel',
      description: "We're committed to responsible tourism that benefits local communities and preserves natural resources.",
      icon: GlobeAltIcon,
    },
    {
      name: 'Personalized Service',
      description: 'We take the time to understand your preferences and craft the perfect itinerary just for you.',
      icon: CheckCircleIcon,
    },
    {
      name: 'Safety First',
      description: 'Your safety is our top priority. We partner with trusted local operators and maintain strict safety standards.',
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
            About Get Your Trip
          </h1>
          <p className={styles.heroSubtitle}>
            Creating unforgettable travel experiences since 2020
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
              <h2 className={styles.storyTitle}>Our Story</h2>
              <p className={styles.storyText}>
                Founded in 2020, Get Your Trip began with a simple mission: to make travel planning effortless and enjoyable. 
                What started as a small team of travel enthusiasts has grown into a trusted name in the travel industry, 
                helping thousands of travelers discover the world's most beautiful destinations.
              </p>
              <p className={styles.storyText}>
                We believe that travel has the power to change lives, broaden perspectives, and create lasting memories. 
                That's why we're committed to providing exceptional service, carefully curated experiences, and 
                personalized attention to every traveler who books with us.
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
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <p className={styles.sectionSubtitle}>
              What makes Get Your Trip different
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
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <p className={styles.sectionSubtitle}>
              The passionate people behind Get Your Trip
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
            <span>Ready to plan your next adventure?</span>
            <span className={styles.ctaSubtitle}>Start your journey with us today.</span>
          </h2>
          <div className={styles.ctaButtons}>
            <Link to="/tours" className={styles.ctaButton}>
              Explore Tours
            </Link>
            <Link to="/contact" className={styles.ctaButtonSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
