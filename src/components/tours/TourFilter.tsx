import React, { useState, useEffect } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import styles from './TourFilter.module.css';

interface TourFilterProps {
  onFilterChange?: (filters: {
    priceRange: { min: number; max: number };
    selectedTypes: string[];
    selectedGroupSizes: string[];
  }) => void;
}

type PriceRange = {
  min: number;
  max: number;
};

const TourFilter: React.FC<TourFilterProps> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 2000 });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGroupSizes, setSelectedGroupSizes] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Close mobile filter when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileFilterOpen && !target.closest(`.${styles.filterContainer}`) && !target.closest(`.${styles.mobileFilterButton}`)) {
        setIsMobileFilterOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileFilterOpen]);

  const tourTypes = [
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'cruise', name: 'Cruise' },
    { id: 'beach', name: 'Beach' },
    { id: 'wildlife', name: 'Wildlife' },
  ];

  const groupSizes = [
    { id: 'private', name: 'Private' },
    { id: 'small', name: 'Small Group' },
    { id: 'large', name: 'Large Group' },
  ];

  const handleTypeChange = (typeId: string) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedTypes: newSelectedTypes,
        selectedGroupSizes
      });
    }
  };

  const handleGroupSizeChange = (sizeId: string) => {
    const newSelectedGroupSizes = selectedGroupSizes.includes(sizeId)
      ? selectedGroupSizes.filter(id => id !== sizeId)
      : [...selectedGroupSizes, sizeId];
    
    setSelectedGroupSizes(newSelectedGroupSizes);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedTypes,
        selectedGroupSizes: newSelectedGroupSizes
      });
    }
  };

  const handlePriceChange = (newPriceRange: PriceRange) => {
    setPriceRange(newPriceRange);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: newPriceRange,
        selectedTypes,
        selectedGroupSizes
      });
    }
  };

  const resetFilters = () => {
    const resetPriceRange = { min: 0, max: 2000 };
    const resetTypes: string[] = [];
    const resetSizes: string[] = [];
    
    setPriceRange(resetPriceRange);
    setSelectedTypes(resetTypes);
    setSelectedGroupSizes(resetSizes);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: resetPriceRange,
        selectedTypes: resetTypes,
        selectedGroupSizes: resetSizes
      });
    }
  };

  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className={styles.filterWrapper}>
      {/* Mobile Filter Button - Only visible on mobile */}
      <div className={styles.mobileFilterHeader}>
        <h2 className={styles.mobileFilterTitle}>Filters</h2>
        <button 
          type="button" 
          className={styles.mobileFilterButton}
          onClick={toggleMobileFilter}
          aria-expanded={isMobileFilterOpen}
          aria-controls="filter-container"
        >
          <span className={styles.screenReaderOnly}>
            {isMobileFilterOpen ? 'Close filters' : 'Open filters'}
          </span>
          <FunnelIcon 
            className={`${styles.mobileFilterIcon} ${isMobileFilterOpen ? styles.active : ''}`} 
            aria-hidden="true" 
          />
        </button>
      </div>
      
      {/* Overlay for mobile - Only shown when mobile menu is open */}
      {isMobileFilterOpen && (
        <div 
          className={styles.filterOverlay}
          onClick={() => setIsMobileFilterOpen(false)}
          aria-hidden="true"
          role="presentation"
        />
      )}
      
      {/* Filter Container */}
      <div 
        id="filter-container"
        className={`${styles.filterContainer} ${isMobileFilterOpen ? styles.mobileOpen : ''}`}
        aria-labelledby="filter-heading"
      >
        <div className={styles.filterHeader}>
          <h2 id="filter-heading" className={styles.filterTitle}>Filters</h2>
          <button 
            type="button" 
            className={styles.closeButton}
            onClick={() => setIsMobileFilterOpen(false)}
            aria-label="Close filters"
          >
            <XMarkIcon className={styles.closeIcon} aria-hidden="true" />
          </button>
        </div>

        {/* Price Range Filter */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterSubtitle}>Price Range</h3>
          <div className={styles.priceInputs}>
            <div className={styles.priceInputGroup}>
              <span className={styles.priceSymbol}>$</span>
              <input
                type="number"
                min="0"
                max={priceRange.max}
                value={priceRange.min}
                onChange={(e) => handlePriceChange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className={styles.priceInput}
                aria-label="Minimum price"
              />
            </div>
            <span className={styles.priceSeparator}>to</span>
            <div className={styles.priceInputGroup}>
              <span className={styles.priceSymbol}>$</span>
              <input
                type="number"
                min={priceRange.min}
                max="5000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange({ ...priceRange, max: parseInt(e.target.value) || 2000 })}
                className={styles.priceInput}
                aria-label="Maximum price"
              />
            </div>
          </div>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange.max}
              onChange={(e) => handlePriceChange({ ...priceRange, max: parseInt(e.target.value) })}
              className={styles.slider}
              aria-label="Price range slider"
            />
          </div>
        </div>

        {/* Tour Type Filter */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterSubtitle}>Tour Type</h3>
          <div className={styles.optionGroup}>
            {tourTypes.map((type) => (
              <label key={type.id} className={styles.optionItem}>
                <input
                  type="checkbox"
                  id={`type-${type.id}`}
                  className={styles.optionInput}
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeChange(type.id)}
                />
                <span className={styles.optionCheckmark} aria-hidden="true"></span>
                <span className={styles.optionLabel}>
                  {type.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Group Size Filter */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterSubtitle}>Group Size</h3>
          <div className={styles.optionGroup}>
            {groupSizes.map((size) => (
              <label key={size.id} className={styles.optionItem}>
                <input
                  type="checkbox"
                  id={`size-${size.id}`}
                  className={styles.optionInput}
                  checked={selectedGroupSizes.includes(size.id)}
                  onChange={() => handleGroupSizeChange(size.id)}
                />
                <span className={styles.optionCheckmark} aria-hidden="true"></span>
                <span className={styles.optionLabel}>
                  {size.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          type="button"
          onClick={resetFilters}
          className={styles.resetButton}
        >
          <XMarkIcon className={styles.resetIcon} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TourFilter;
