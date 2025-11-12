import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Tour } from '../types/tour';

type PriceRange = {
  min: number;
  max: number;
};

type Filters = {
  priceRange: PriceRange;
  selectedTypes: string[];
  selectedGroupSizes: string[];
};

export const useTourFilters = (tours: Tour[]) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: 0, max: 2000 },
    selectedTypes: [],
    selectedGroupSizes: []
  });

  const filteredTours = useMemo(() => {
    // Get the search term from URL parameters (support both 'destination' and 'location' for backward compatibility)
    const searchTerm = (searchParams.get('destination') || searchParams.get('location') || '').trim().toLowerCase();
    const duration = searchParams.get('duration');

    if (!tours || !Array.isArray(tours)) {
      console.warn('No tours data available for filtering');
      return [];
    }

    return tours.filter((tour) => {
      // Filter by destination/location (case insensitive)
      if (searchTerm) {
        const tourLocation = (tour.location || '').toLowerCase();
        const tourTitle = (tour.title || '').toLowerCase();
        const tourCountry = (tour.country || '').toLowerCase();
        
        // Normalize search term by removing extra spaces and converting to lowercase
        const normalizedSearch = searchTerm.toLowerCase().trim().replace(/\s+/g, ' ');
        
        // Split search term into words for partial matching
        const searchWords = normalizedSearch.split(' ');
        
        // Check if any of the tour's fields contain all search words
        const searchableText = `${tourLocation} ${tourTitle} ${tourCountry}`.toLowerCase();
        const allWordsMatch = searchWords.every(word => 
          searchableText.includes(word)
        );
        
        if (!allWordsMatch) {
          return false;
        }
      }
      
      // Filter by duration
      if (duration) {
        const [minDays, maxDays] = duration.includes('+') 
          ? [parseInt(duration.replace('+', '')), Infinity]
          : duration.split('-').map(Number);
          
        const tourDuration = parseInt(tour.duration);
        if (tourDuration < minDays || tourDuration > maxDays) {
          return false;
        }
      }
      
      // Filter by price range
      const tourPrice = typeof tour.price === 'number' ? tour.price : 0;
      if (tourPrice < filters.priceRange.min || tourPrice > filters.priceRange.max) {
        return false;
      }
      
      // Filter by tour type
      if (filters.selectedTypes.length > 0 && tour.type && 
          !filters.selectedTypes.includes(tour.type.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [tours, searchParams, filters]);

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  return {
    filteredTours,
    filters,
    updateFilters,
    searchParams
  };
};
