import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Tour, ItineraryDay } from '../../types';
import styles from './TourDetail.module.css';

// Lazy load the ReviewList component
const ReviewList = lazy(() => import('./ReviewList'));

// Define the expected URL params type
type TourParams = {
  id: string;
};

// Form data type
type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
};

const TourDetail = () => {
  // All hooks at the top of the component, before any conditional logic
  const { id } = useParams<TourParams>();
  const navigate = useNavigate();
  
  // State hooks
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [tour, setTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Memoized values
  const tabItems = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'reviews', label: `Reviews (${tour?.reviews?.length || 0})` }
  ], [tour?.reviews?.length]);

  const reviewsSection = useMemo(() => (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <button className={styles.writeReviewButton}>
          Write a Review
        </button>
      </div>
      <Suspense fallback={<div className={styles.loadingText}>Loading reviews...</div>}>
        <ReviewList reviews={tour?.reviews || []} />
      </Suspense>
    </div>
  ), [tour?.reviews]);

  // Callback hooks
  const calculateTotal = useCallback((): number => {
    if (!tour?.price) return 0;
    return (adults * tour.price) + (children * (tour.price * 0.7));
  }, [tour?.price, adults, children]);

  const validateForm = useCallback((): boolean => {
    if (!selectedDate) {
      toast.error('Please select a booking date');
      return false;
    }
    
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\+?[0-9\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    return true;
  }, [selectedDate, formData]);

  const handleBooking = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsBookingModalOpen(true);
    }
  }, [validateForm]);

  const handleBookingSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    
    // In production, send booking data to your API endpoint
    toast.success('Booking request sent successfully! We will contact you soon.');

    setIsBookingModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  }, [formData, tour, selectedDate, adults, children, calculateTotal]);


  // Fetch tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        setIsLoading(true);
        
        // Ensure id exists before proceeding
        if (!id) {
          setError('Invalid tour ID');
          setIsLoading(false);
          return;
        }
        
        // Import tours data
        const { default: tours } = await import('../../data/tours');
        
        // Find the tour in our tours data
        const tourId = parseInt(id);
        const foundTour = tours.find(tour => tour.id === tourId);
        
        if (!foundTour) {
          setError('The requested tour was not found');
          setIsLoading(false);
          return;
        }
        
        // Map the tour data to match the Tour interface
        const tour: Tour = {
          ...foundTour,
          id: foundTour.id,
          name: foundTour.title,
          country: foundTour.location,
          image: foundTour.image,
          price: foundTour.price,
          rating: foundTour.rating,
          description: foundTour.description || '',
          duration: foundTour.duration || '',
          included: foundTour.included || [],
          highlights: foundTour.highlights || [],
          reviews: foundTour.reviews || [],
          location: foundTour.location,
          title: foundTour.title,
          type: foundTour.type || 'adventure',
          groupSize: foundTour.groupSize || 'Small Group',
          featured: foundTour.featured || false,
          itinerary: foundTour.itinerary || []
        };
        
        setTour(tour);
        setError('');
      } catch (err) {
        // Handle error appropriately - show error message to user
        setError('Failed to load tour. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  // Skeleton loader for better loading state
  // Loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeletonHeader}></div>
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonText} style={{ width: '80%' }}></div>
        </div>
        <div className={styles.skeletonSidebar}></div>
      </div>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <div className={styles.errorContainer} role="alert" aria-live="assertive">
        <div className={styles.errorCard}>
          <div className={styles.errorIcon} aria-hidden="true">
            <XMarkIcon className={styles.xMarkIcon} />
          </div>
          <h1 className={styles.errorTitle}>{error || 'Tour not found'}</h1>
          <p className={styles.errorMessage}>
            The tour you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className={styles.errorButton}
            aria-label="Go back to previous page"
          >
            <ArrowLeftIcon className={styles.buttonIcon} aria-hidden="true" />
            <span>Back to results</span>
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <ArrowLeftIcon className={styles.backButtonIcon} />
          <span className={styles.backButtonText}>Back to results</span>
        </button>

        {/* Main Content */}
        <div className={styles.gridContainer}>
          <div className={styles.tourContent}>
            {/* Tour Header */}
            <div className={styles.tourHeader}>
              <h1 className={styles.tourTitle}>{tour.name}</h1>
              <div className={styles.tourLocation}>
                <MapPinIcon />
                <span className={styles.country}>{tour.country}</span>
              </div>
              <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                  <StarIcon className={styles.starIcon} />
                  <span className={styles.ratingValue}>{tour.rating}</span>
                  <span className={styles.reviewCount}>({tour.reviews?.length || 0} reviews)</span>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className={styles.tabContainer}>
              <nav className={styles.tabNav}>
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabButton} ${
                      activeTab === tab.id ? styles.tabButtonActive : ''
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <div className={styles.overviewContent}>
                <div className={styles.overviewText}>
                  <h2 className={styles.sectionTitle}>About this tour</h2>
                  <p className={styles.tourDescription}>{tour.description}</p>
                </div>

                {/* Tour Image - Moved here to appear under the overview */}
                <div className={styles.imageContainer}>
                  <img
                    src={tour.image}
                    alt={`${tour.name} tour`}
                    className={styles.tourImage}
                    loading="lazy"
                    width="800"
                    height="500"
                  />
                  <div className={styles.helpCard}>
                    <h3 className={styles.helpTitle}>
                      <span>Need help?</span>
                      <span className={styles.helpSubtitle}>We're here to help!</span>
                    </h3>
                  </div>
                </div>
                
                {tour.highlights && tour.highlights.length > 0 && (
                  <div className={styles.highlightsSection}>
                    <h3 className={styles.sectionSubtitle}>Tour Highlights</h3>
                    <ul className={styles.highlightsList}>
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span className={styles.highlightText}>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {tour.included && tour.included.length > 0 && (
                  <div className={styles.includedSection}>
                    <h3 className={styles.sectionSubtitle}>What's Included</h3>
                    <ul className={styles.includedList}>
                      {tour.included.map((item, index) => (
                        <li key={index} className={styles.includedItem}>
                          <span className={styles.bulletPoint}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'itinerary' && (
              <div className={styles.itinerarySection}>
                <h2 className={styles.sectionTitle}>Tour Itinerary</h2>
                <div className={styles.itineraryList}>
                  {tour.itinerary && tour.itinerary.length > 0 ? (
                    tour.itinerary.map((day: ItineraryDay, index: number) => (
                      <div key={index} className={styles.itineraryDay}>
                        <div className={styles.dayHeader}>
                          <h3 className={styles.dayTitle}>Day {index + 1}</h3>
                          <span className={styles.dayDuration}>
                            <ClockIcon className={styles.smallIcon} />
                            {day.duration || 'Full day'}
                          </span>
                        </div>
                        <p className={styles.dayDescription}>{day.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noItinerary}>No itinerary available for this tour.</p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && reviewsSection}
          </div>
        </div>
        
        {/* Booking Sidebar */}
        <div className={styles.bookingSidebar}>
          <div className={styles.bookingCard}>
            <div className={styles.priceSection}>
              <div>
                <p className={styles.priceLabel}>From</p>
                <p className={styles.priceAmount}>${tour.price}</p>
                <p className={styles.priceNote}>per person</p>
              </div>
              <div className={styles.ratingContainer}>
                <StarIcon className={styles.starIcon} />
                <span className={styles.rating}>{tour.rating}</span>
                <span className={styles.reviewCount}>({tour.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            <form onSubmit={handleBooking} className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  <CalendarIcon className={styles.inputIcon} />
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={styles.formInput}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className={styles.guestSelector}>
                <div className={styles.guestsGroup}>
                  <label className={styles.formLabel}>Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className={styles.formSelect}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adult' : 'Adults'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.guestsGroup}>
                  <label className={styles.formLabel}>Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className={styles.formSelect}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Child' : 'Children'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.bookingSummary}>
                <div className={styles.priceRow}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>${calculateTotal().toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className={styles.bookButton}
                  disabled={!selectedDate}
                >
                  Book Now
                </button>
              </div>
            </form>

            <div className={styles.cancellationPolicy}>
            </div>
            <div className={styles.ratingContainer}>
              <div className={styles.rating}>
                {/* Booking Modal */}
                {isBookingModalOpen && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <div className={styles.modalHeader}>
                        <h3 className={styles.modalTitle}>Complete Your Booking</h3>
                        <button 
                          onClick={() => setIsBookingModalOpen(false)}
                          className={styles.modalCloseButton}
                        >
                          <XMarkIcon className={styles.modalCloseIcon} />
                        </button>
                      </div>
                      <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                        <div className={styles.formGroup}>
                          <label htmlFor="name" className={styles.formLabel}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="email" className={styles.formLabel}>
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="phone" className={styles.formLabel}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="specialRequests" className={styles.formLabel}>
                            Special Requests
                          </label>
                          <textarea
                            id="specialRequests"
                            name="specialRequests"
                            rows={3}
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            className={`${styles.formInput} ${styles.textarea}`}
                            placeholder="Any special requirements or requests..."
                          />
                        </div>

                        <div className={styles.formFooter}>
                          <div className={styles.totalContainer}>
                            <span>Total</span>
                            <span className={styles.totalAmount}>${calculateTotal().toFixed(2)}</span>
                          </div>
                          <button
                            type="submit"
                            className={styles.submitButton}
                          >
                            Confirm Booking
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
