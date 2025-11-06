import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourList from '../components/tours/TourList';
import TourFilter from '../components/tours/TourFilter';
import type { Tour } from '../types/tour';
import toursData from '../data/tours';
import styles from './Tours.module.css';

const Tours = () => {
  const [searchParams] = useSearchParams();
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    selectedTypes: [] as string[],
    selectedGroupSizes: [] as string[]
  });

  useEffect(() => {
    // Get search parameters from URL
    const destination = searchParams.get('destination')?.toLowerCase();
    const duration = searchParams.get('duration');

    // Fetch tours (in a real app, this would be an API call)
    const fetchTours = async () => {
      try {
        // In a real app, you would fetch from your API with the search parameters
        // const response = await fetch(`/api/tours?destination=${destination}&duration=${duration}&date=${date}`);
        // const data = await response.json();
        
        // Use the imported tours data
        const allTours = toursData;
        
        // Filter tours based on search parameters and filters
        const filtered = allTours.filter((tour: Tour) => {
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
          
          // Filter by group size (if implemented in your tour data)
          // if (filters.selectedGroupSizes.length > 0 && !filters.selectedGroupSizes.includes(tour.groupSize)) {
          //   return false;
          // }
          
          // Filter by date (if implemented in your data)
          // if (date) {
          //   // Add date filtering logic here
          // }
          
          return true;
        });
        
        setFilteredTours(filtered);
      } catch (error) {
        console.error('Error fetching tours:', error);
        console.log('Available tours data:', toursData);
        // In case of error, show all tours with error state
        setFilteredTours(toursData || []);
        
        // Log more details about the error
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
        } else {
          console.error('Unknown error type:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTours();
  }, [searchParams, filters]);

  // Debug: Log the current filters and filtered tours
  useEffect(() => {
    console.log('Current filters:', filters);
    console.log('Filtered tours count:', filteredTours.length);
  }, [filters, filteredTours]);
  return (
    <main className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Our Tours</h1>
          <p className={styles.headerSubtitle}>
            Discover our handpicked selection of amazing tours and experiences
          </p>
        </div>
      </div>

      {/* Tours Content */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Sidebar */}
          <aside>
            <TourFilter onFilterChange={(newFilters) => {
              setFilters(newFilters);
              // We don't need to update the tours here because the useEffect will handle it
            }} />
          </aside>

          {/* Tours Grid */}
          <div>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Loading tours...</p>
              </div>
            ) : (
              <TourList tours={filteredTours} />
            )}
            
            {!isLoading && filteredTours.length === 0 && (
              <div className={styles.noResults}>
                <h3 className={styles.noResultsTitle}>No tours found</h3>
                <p className={styles.noResultsText}>We couldn't find any tours matching your search criteria.</p>
                <button 
                  onClick={() => window.location.href = '/tours'}
                  className={styles.clearButton}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tours;
