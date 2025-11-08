import React, { Suspense, lazy, useState, useEffect } from 'react';
import type { Tour } from '../types/tour';
import { PageLoader } from '../components/ui/PageLoader';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useTourFilters } from '../hooks/useTourFilters';
import { useTranslation } from 'react-i18next';
import toursData from '../data/tours';
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

  // Fetch tours (simulating an API call)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setTours(toursData);
      } catch (err) {
        // Handle error appropriately - could show toast notification
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
  );
};

export default Tours;
