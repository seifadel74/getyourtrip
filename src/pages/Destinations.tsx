import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon as SearchIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import { destinations, CustomDestination } from '../data/destinations';
import styles from './Destinations.module.css';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Get unique countries for filter
  const countries = ['All', ...Array.from(new Set(destinations.map(dest => dest.country)))];

  // Filter destinations based on search term and selected country
  const filteredDestinations = destinations.filter((destination: CustomDestination) => {
    const matchesSearch = searchTerm === '' || 
                         destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || destination.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className={styles.destinationsPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Amazing Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our curated selection of the most beautiful places around the world
          </motion.p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="country-filter" className={styles.filterLabel}>Filter by Country:</label>
            <select
              id="country-filter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={styles.filterSelect}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className={styles.destinationsContainer}>
        <div className={styles.destinationsGrid}>
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <motion.div 
                key={destination.id}
                className={`${styles.destinationCard} ${destination.isPopular ? styles.popular : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                {destination.isPopular && <div className={styles.popularBadge}>Popular</div>}
                <div 
                  className={styles.destinationImage}
                  style={{ backgroundImage: `url(${destination.image})` }}
                >
                  <div className={styles.overlay}></div>
                </div>
                <div className={styles.destinationInfo}>
                  <div className={styles.destinationHeader}>
                    <h3>{destination.name}</h3>
                    <div className={styles.location}>
                      <MapPinIcon className={styles.locationIcon} />
                      <span>{destination.country}</span>
                    </div>
                  </div>
                  <p className={styles.description}>{destination.description}</p>
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`${styles.starIcon} ${i < Math.floor(destination.rating) ? styles.filled : ''}`}
                        />
                      ))}
                    </div>
                    <span className={styles.reviews}>({destination.reviews} reviews)</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>No destinations found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
