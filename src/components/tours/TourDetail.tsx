import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ShieldCheckIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { destinations, convertToTour } from '../../data/destinations';
import { toast } from 'react-hot-toast';
import { Tour, Review, ItineraryDay, Destination } from '../../types';
import styles from './TourDetail.module.css';

const TourDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [tour, setTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Convert Destination to Tour by adding required properties
  const convertToTour = (destination: Destination): Tour => {
    return {
      ...destination,
      // Add required Tour properties with default values
      location: destination.country, // Using country as location
      title: destination.name,       // Using name as title
      // Ensure optional arrays are defined
      highlights: destination.highlights || [],
      included: destination.included || [],
      notIncluded: destination.notIncluded || [],
      // Add a default empty itinerary if needed
      itinerary: []
    };
  };

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
        
        // Find the tour in our mock data
        const tourId = parseInt(id);
        const foundDestination = destinations.find(dest => dest.id === tourId);
        
        if (!foundDestination) {
          setError('The requested tour was not found');
          setIsLoading(false);
          return;
        }
        
        // Convert the CustomDestination to a Tour
        const tour: Tour = {
          ...foundDestination,
          id: foundDestination.id,
          name: foundDestination.name,
          country: foundDestination.country,
          image: foundDestination.image,
          price: foundDestination.price,
          rating: foundDestination.rating,
          description: foundDestination.description || '',
          duration: foundDestination.duration || '',
          included: foundDestination.included || [],
          notIncluded: foundDestination.notIncluded || [],
          highlights: foundDestination.highlights || [],
          reviews: foundDestination.reviewsList || [],
          location: foundDestination.country,
          title: foundDestination.name,
          type: foundDestination.type,
          groupSize: foundDestination.groupSize,
          featured: foundDestination.featured,
          itinerary: []
        };
        setTour(tour);
        setError('');
      } catch (err) {
        setError('Failed to load tour data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading tour details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>
            <XMarkIcon className={styles.xMarkIcon} />
          </div>
          <h2 className={styles.errorTitle}>{error || 'Tour not found'}</h2>
          <p className={styles.errorMessage}>The tour you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/tours')}
            className={styles.errorButton}
          >
            <ArrowLeftIcon className={styles.buttonIcon} />
            <span>Back to Tours</span>
          </button>
        </div>
      </div>
    );
  }

  const calculateTotal = (): number => {
    if (!tour?.price) return 0;
    return (adults * tour.price) + (children * (tour.price * 0.7));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error('Please select a booking date');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    
    console.log('Booking submitted:', {
      ...formData,
      tourId: tour.id,
      tourName: tour.name,
      date: selectedDate,
      adults,
      children,
      total: calculateTotal()
    });

    toast.success('Booking request sent successfully! We will contact you soon.');

    setIsBookingModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
  };

  const renderReviews = () => {
    if (!tour?.reviews?.length) {
      return <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>;
    }

    return (
      <div className={styles.reviewsList}>
        {tour.reviews.map((review: Review) => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <h4 className={styles.reviewAuthor}>{review.author}</h4>
              <div className={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`${styles.starIcon} ${i < review.rating ? styles.filledStar : styles.emptyStar}`}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <p className={styles.reviewDate}>
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className={styles.reviewText}>{review.comment}</p>
          </div>
        ))}
      </div>
    );
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
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'reviews', label: `Reviews (${tour.reviews?.length || 0})` }
                ].map((tab) => (
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
                    alt={tour.name}
                    className={styles.tourImage}
                    loading="lazy"
                  />
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
            
            {activeTab === 'reviews' && (
              <div className={styles.reviewsSection}>
                <div className={styles.reviewsHeader}>
                  <h2 className={styles.sectionTitle}>Customer Reviews</h2>
                  <button className={styles.writeReviewButton}>
                    Write a Review
                  </button>
                </div>
                {renderReviews()}
              </div>
            )}
          </div>
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
              <ShieldCheckIcon className={styles.shieldIcon} />
              <span>Free cancellation up to 24 hours before</span>
            </div>
          </div>

          <div className={styles.helpCard}>
            <h3 className={styles.helpTitle}>
              <span>Need help?</span>
              <span className={styles.helpSubtitle}>We're here to help!</span>
            </h3>
            <p className={styles.helpText}>
              Our team is available 24/7 to assist you with any questions or special requests.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} />
                <span>+20 123 456 7890</span>
              </div>
              <div className={styles.contactItem}>
                <EnvelopeIcon className={styles.contactIcon} />
                <span>support@getyourtrip.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default TourDetail;