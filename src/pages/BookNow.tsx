import React, { useState, useEffect, ReactElement } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, UserGroupIcon, EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BookNow.module.css';

// Import Tour type from the API service
import { Tour } from '../services/api';

// Import the API service
import { api } from '../services/api';

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  specialRequests: string;
}

const BookNow: React.FC = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  // Removed unused submitting state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: searchParams.get('date') || '',
    guests: 1,
    specialRequests: '',
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) {
        navigate('/tours');
        return;
      }

      setLoading(true);
      try {
        // Fetch tour details from the backend API
        const response = await api.tours.getById(parseInt(id));
        
        if (response && response.data) {
          // Ensure we have a valid tour with required fields
          const tourData = response.data;
          if (!tourData.image) {
            // Provide a default image if none is provided
            tourData.image = '/images/default-tour.jpg';
          }
          setTour(tourData);
        } else {
          throw new Error('Tour not found');
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
        toast.error('Failed to load tour details');
        navigate('/tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tour) {
      console.error('No tour selected');
      toast.error('No tour selected. Please try again.');
      return;
    }

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Import the API service
      const { api } = await import('../services/api');
      
      // Make the API call
      const response = await api.bookings.create({
        tour_id: tour.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        booking_date: formData.date,
        adults: formData.guests,
        children: 0,
        special_requests: formData.specialRequests || '',
      });

      if (response.success) {
        toast.success('Booking confirmed! A confirmation email has been sent to your email address.');

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          guests: 1,
          specialRequests: '',
        });

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(response.message || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('An error occurred while processing your booking. Please try again.');
    }
  };


  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading tour details...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className={styles.notFound}>
        <h2>Tour not found</h2>
        <p>Sorry, we couldn't find the tour you're looking for.</p>
        <button onClick={() => navigate('/tours')} className={styles.button}>
          Browse Tours
        </button>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h1>Book Your Adventure</h1>
          <p>Complete your booking request</p>
        </div>

        <div className={styles.content}>
          <div className={styles.bookingFormContainer}>
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <h2>Your Information</h2>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name <span className={styles.required}>*</span></label>
                <div className={styles.inputWithIcon}>
                  <UserIcon className={styles.inputIcon} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address <span className={styles.required}>*</span></label>
                <div className={styles.inputWithIcon}>
                  <EnvelopeIcon className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Whatsapp Number <span className={styles.required}>*</span></label>
                <div className={styles.inputWithIcon}>
                  <PhoneIcon className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+20 123 456 7890"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                  <label htmlFor="date">Tour Date <span className={styles.required}>*</span></label>
                  <div className={styles.inputWithIcon}>
                    <CalendarIcon className={styles.inputIcon} />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                  <label htmlFor="guests">Number of Guests <span className={styles.required}>*</span></label>
                  <div className={styles.inputWithIcon}>
                    <UserGroupIcon className={styles.inputIcon} />
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className={styles.select}
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requirements or requests?"
                  rows={4}
                />
              </div>

              <div className={styles.termsCheckbox}>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                  I confirm my booking and agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> *
                </label>
              </div>

              <div className={styles.formActions}>
                <button 
                  type="submit" 
                  className={`${styles.button} ${!isTermsAccepted ? styles.disabledButton : ''}`}
                  disabled={!isTermsAccepted}
                >
                  Submit Booking Request
                </button>
              </div>
            </form>
          </div>

          <div className={styles.bookingSummary}>
            <div className={styles.summaryHeader}>
              <h3>Your Booking</h3>
            </div>
            
            <div className={styles.tourCard}>
              <div className={styles.tourImage} style={{ backgroundImage: `url(${tour.image})` }}></div>
              <div className={styles.tourDetails}>
                <h4>{tour.title}</h4>
                <p className={styles.tourLocation}>{tour.location}</p>
                <div className={styles.tourMeta}>
                  <span><CalendarIcon className={styles.icon} /> {tour.duration}</span>
                  <span><UserGroupIcon className={styles.icon} /> {formData.guests} {formData.guests === 1 ? 'Person' : 'People'}</span>
                </div>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Price per person</span>
                <span>${tour.price}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Number of guests</span>
                <span>{formData.guests}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.total}`}>
                <span>Estimated Total</span>
                <span>${tour.price * formData.guests}</span>
              </div>
            </div>

            <div className={styles.needHelp}>
              <h4>Need Help?</h4>
              <p>Our customer service team is available 24/7 to assist you with any questions.</p>
              <a href="mailto:support@getyourtrip.com">support@getyourtrip.com</a>
              <a href="tel:+201234567890">+20 123 456 7890</a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookNow;
