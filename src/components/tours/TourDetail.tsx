import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ClockIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Tour, ItineraryDay } from '../../types';
import styles from './TourDetail.module.css';
import ImageSlider from './ImageSlider';

// Lazy load the ReviewList component
const ReviewList = lazy(() => import('./ReviewList'));

// Itinerary Item Component with expand/collapse
const ItineraryItem: React.FC<{ day: ItineraryDay; index: number }> = ({ day, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  
  return (
    <div className={styles.itineraryDay}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.itineraryToggle}
      >
        <span className={styles.itineraryTitle}>
          {day.title || `Day ${day.day || index + 1}`}
        </span>
        {isExpanded ? (
          <ChevronUpIcon className={styles.chevronIcon} />
        ) : (
          <ChevronDownIcon className={styles.chevronIcon} />
        )}
      </button>
      {isExpanded && (
        <div className={styles.itineraryContent}>
          <p className={styles.dayDescription}>{day.description}</p>
          {day.duration && (
            <div className={styles.dayDuration}>
              <ClockIcon className={styles.smallIcon} />
              {day.duration}
            </div>
          )}
          {day.activities && day.activities.length > 0 && (
            <ul className={styles.activitiesList}>
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex}>{activity}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

// Itinerary List Component
const ItineraryList: React.FC<{ items: ItineraryDay[] }> = ({ items }) => {
  return (
    <>
      {items.map((day, index) => (
        <ItineraryItem key={index} day={day} index={index} />
      ))}
    </>
  );
};

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

  const handleBooking = useCallback(() => {
    if (!selectedDate) {
      toast.error('Please select a booking date');
      return;
    }
    // Navigate to the booking page with the tour ID and selected date
    navigate(`/book-now/${id}?date=${encodeURIComponent(selectedDate)}`);
  }, [selectedDate, id, navigate]);

  const handleBookingSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour || !validateForm()) return;
    
    try {
      // In production, send booking data to your API endpoint
      // Example API call:
      // await api.bookings.create({
      //   tour_id: tour.id,
      //   date: selectedDate,
      //   adults,
      //   children,
      //   ...formData
      // });
      
      toast.success('Booking request sent successfully! We will contact you soon.');
      setIsBookingModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  }, [tour, selectedDate, adults, children, formData, validateForm]);


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
        
        // Fetch tour from API
        const { api } = await import('../../services/api');
        const tourId = parseInt(id);
        const response = await api.tours.getById(tourId);
        
        if (!response.success || !response.data) {
          setError('The requested tour was not found');
          setIsLoading(false);
          return;
        }
        
        const apiTour = response.data;
        
        // Map API tour format to frontend Tour type
        // Handle image as string or array - keep as is for display component to handle
        const imageValue: string | string[] = apiTour.image 
          ? (Array.isArray(apiTour.image) ? apiTour.image : apiTour.image)
          : '';
        
        const tour: Tour = {
          id: apiTour.id,
          title: apiTour.title,
          name: apiTour.title,
          location: apiTour.location,
          country: apiTour.location,
          image: imageValue,
          price: apiTour.price,
          rating: apiTour.rating || 0,
          description: apiTour.description || '',
          duration: apiTour.duration || '',
          included: apiTour.included || [],
          excluded: apiTour.excluded || [],
          highlights: apiTour.highlights || [],
          reviews: [],
          type: apiTour.type || 'adventure',
          groupSize: apiTour.max_group_size ? `${apiTour.max_group_size} People` : 'Small Group',
          featured: apiTour.is_featured || false,
          itinerary: apiTour.itinerary || [],
          countries: apiTour.countries || [], // Assuming countries is part of the Tour type
          languages: apiTour.languages || [] // Assuming languages is part of the Tour type
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
                {/* Tour Images Slider - Before "About this tour" section */}
                {(() => {
                  const images = Array.isArray(tour.image) ? tour.image : tour.image ? [tour.image] : [];
                  if (images.length > 0) {
                    return <ImageSlider images={images} alt={`${tour.name} tour`} />;
                  }
                  return null;
                })()}

                <div className={styles.overviewText}>
                  <h2 className={styles.sectionTitle}>About this tour</h2>
                  <p className={styles.tourDescription}>{tour.description}</p>
                </div>

                {/* Tour Specifications - Under About section */}
                <div className={styles.specificationsSection}>
                  <h3 className={styles.specificationsTitle}>Tour Specifications</h3>
                  <div className={styles.specificationsGrid}>
                    <div className={styles.specItem}>
                      <div className={styles.specHeader}>
                        <Cog6ToothIcon className={styles.specIcon} />
                        <span className={styles.specLabel}>Tour Length</span>
                        <ChevronUpIcon className={styles.chevronIcon} />
                      </div>
                      <div className={styles.specValue}>{tour.duration}</div>
                      <div className={styles.specSubValue}>Day use</div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specHeader}>
                        <Cog6ToothIcon className={styles.specIcon} />
                        <span className={styles.specLabel}>Countries</span>
                        <ChevronUpIcon className={styles.chevronIcon} />
                      </div>
                      <div className={styles.specValue}>
                        {(tour.countries && tour.countries.length > 0)
                          ? tour.countries.join(', ')
                          : 'Not specified'}
                      </div>
                      <div className={styles.specSubValue}></div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specHeader}>
                        <Cog6ToothIcon className={styles.specIcon} />
                        <span className={styles.specLabel}>Group Size</span>
                        <ChevronUpIcon className={styles.chevronIcon} />
                      </div>
                      <div className={styles.specValue}>
                        {tour.groupSize ? (tour.groupSize.includes('People') ? tour.groupSize.replace(' People', '') : tour.groupSize) : '1-40'}
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specHeader}>
                        <Cog6ToothIcon className={styles.specIcon} />
                        <span className={styles.specLabel}>Tour Type</span>
                        <ChevronUpIcon className={styles.chevronIcon} />
                      </div>
                      <div className={styles.specValue}>{tour.type || 'Multi Tours'}</div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specHeader}>
                        <Cog6ToothIcon className={styles.specIcon} />
                        <span className={styles.specLabel}>Languages</span>
                        <ChevronUpIcon className={styles.chevronIcon} />
                      </div>
                      <div className={styles.specValue}>
                        {tour.languages && tour.languages.length > 0
                          ? tour.languages.join(', ')
                          : 'English, Multi-language'}
                      </div>
                      <div className={styles.specSubValue}></div>
                    </div>
                  </div>
                </div>

                {/* Itinerary Section - Under About section */}
                {tour.itinerary && tour.itinerary.length > 0 && (
                  <div className={styles.itinerarySection}>
                    <h3 className={styles.sectionSubtitle}>Itinerary</h3>
                    <div className={styles.itineraryList}>
                      <ItineraryList items={tour.itinerary} />
                    </div>
                  </div>
                )}
                
                {tour.highlights && tour.highlights.length > 0 && (
                  <div className={styles.highlightsSection}>
                    <h3 className={styles.sectionSubtitle}>Highlights</h3>
                    <ul className={styles.highlightsList}>
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className={styles.highlightItem}>
                          <CheckCircleIcon className={styles.checkIcon} />
                          <span className={styles.highlightText}>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Included/Excluded Section */}
                {(tour.included && tour.included.length > 0) || (tour.excluded && tour.excluded.length > 0) ? (
                  <div className={styles.includedExcludedSection}>
                    <h3 className={styles.sectionSubtitle}>Included/Excluded</h3>
                    <div className={styles.includedExcludedGrid}>
                      {tour.included && tour.included.length > 0 && (
                        <div className={styles.includedColumn}>
                          <h4 className={styles.columnTitle}>Included</h4>
                          <ul className={styles.includedList}>
                            {tour.included.map((item, index) => (
                              <li key={index} className={styles.includedItem}>
                                <CheckCircleIcon className={styles.includedIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {tour.excluded && tour.excluded.length > 0 && (
                        <div className={styles.excludedColumn}>
                          <h4 className={styles.columnTitle}>Excluded</h4>
                          <ul className={styles.excludedList}>
                            {tour.excluded.map((item, index) => (
                              <li key={index} className={styles.excludedItem}>
                                <XCircleIcon className={styles.excludedIcon} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
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

            <div className={styles.bookingForm}>
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
                  type="button"
                  className={styles.bookButton}
                  disabled={!selectedDate}
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>

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
