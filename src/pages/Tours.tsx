import React, { Suspense, lazy, useState, useEffect } from 'react';
import type { Tour } from '../types/tour';
import { PageLoader } from '../components/ui/PageLoader';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useTourFilters } from '../hooks/useTourFilters';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import styles from './Tours.module.css';

// Lazy load components
const TourList = lazy(() => import('../components/tours/TourList'));
const TourFilter = lazy(() => 
  import('../components/tours/TourFilter').then(module => ({
    default: module.default
  }))
);

const Tours: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tours, setTours] = useState<Tour[]>([]);
  
  // Use our custom hook for filtering
  const { 
    filteredTours, 
    filters, 
    updateFilters, 
    searchParams 
  } = useTourFilters(tours);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await api.tours.getAll({
          per_page: 100, // Get all tours
        });
        
        if (response.success && response.data) {
          // Map API tour format to frontend Tour type
          const mappedTours: Tour[] = response.data.map((tour) => {
            // Handle image as string or array - keep as is for display component to handle
            const imageValue = tour.image 
              ? (Array.isArray(tour.image) ? tour.image : tour.image)
              : '';
            
            return {
              id: tour.id,
              title: tour.title,
              name: tour.title,
              location: tour.location,
              country: tour.location,
              price: tour.price,
              rating: tour.rating || 0,
              image: imageValue,
              description: tour.description || '',
              duration: tour.duration || '',
              type: tour.type || 'adventure',
              groupSize: tour.max_group_size ? `${tour.max_group_size} People` : 'Small Group',
              featured: tour.is_featured || false,
              included: tour.included || [],
              excluded: tour.excluded || [],
              highlights: [],
              itinerary: tour.itinerary || [],
              reviews: [],
            };
          });
          setTours(mappedTours);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        // Fallback to empty array on error
        setTours([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Loading state with skeleton
  if (isLoading) {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>{t('tours.loadingTitle')}</h1>
            <p className={styles.headerSubtitle}>
              {t('tours.loadingSubtitle')}
            </p>
          </div>
        </div>
        <div className={styles.loadingContainer}>
          <PageLoader />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>
            {searchParams.get('destination') 
              ? `${t('tours.toursIn')} ${searchParams.get('destination')}` 
              : t('tours.title')}
          </h1>
          <p className={styles.headerSubtitle}>
            {filteredTours.length} {filteredTours.length === 1 ? t('tours.tourFound') : t('tours.toursFound')}
          </p>
        </div>
      </div>

      {/* Tours Content */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Sidebar with Filters */}
          <aside className={styles.sidebar}>
            <Suspense fallback={<div className={styles.loadingText}>{t('tours.loadingFilters')}</div>}>
              <TourFilter 
                filters={filters}
                onFilterChange={updateFilters}
              />
            </Suspense>
          </aside>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <Suspense fallback={<LoadingSkeleton count={4} />}>
              {filteredTours.length > 0 ? (
                <TourList tours={filteredTours} />
              ) : (
                <div className={styles.noResults}>
                  <p>{t('tours.noResults')}</p>
                  <button 
                    onClick={() => {
                      updateFilters({
                        priceRange: { min: 0, max: 2000 },
                        selectedTypes: [],
                        selectedGroupSizes: []
                      });
                    }}
                    className={styles.resetButton}
                    aria-label="Reset all filters"
                  >
                    {t('tours.clearFilters')}
                  </button>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
      </main>
    </>
  );
};

export default Tours;
