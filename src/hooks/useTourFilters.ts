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
    const destination = searchParams.get('destination')?.toLowerCase();
    const duration = searchParams.get('duration');

    return tours.filter((tour) => {
      // Filter by destination (case insensitive)
      if (destination && !tour.location.toLowerCase().includes(destination)) {
        return false;
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
