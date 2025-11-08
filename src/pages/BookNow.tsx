import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, UserGroupIcon, EnvelopeIcon, PhoneIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';
// import { loadStripe } from '@stripe/stripe-js'; // Commented out for now, uncomment when setting up Stripe
import styles from './BookNow.module.css';

// Define Tour type
interface Tour {
  id: number;
  title: string;
  price: number;
  duration: string;
  location: string;
  image: string;
}

// Mock tour data - in a real app, this would come from your API
const mockTours: Tour[] = [
  {
    id: 1,
    title: 'Luxury Red Sea Cruise',
    price: 899,
    duration: '7 days',
    location: 'Hurghada',
    image: 'https://images.unsplash.com/photo-1552733407-9d000c897dd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 2,
    title: 'Cairo Historical Tour',
    price: 499,
    duration: '3 days',
    location: 'Cairo',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 3,
    title: 'Luxor & Aswan Nile Cruise',
    price: 1299,
    duration: '10 days',
    location: 'Luxor',
    image: 'https://images.unsplash.com/photo-1568848391198-5c6b5f4a5c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
  },
];

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  specialRequests: string;
}

const BookNow = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    specialRequests: '',
  });

  // In a real app, you would fetch the tour data from your API
  useEffect(() => {
    const fetchTour = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundTour = mockTours.find(t => t.id === parseInt(id || ''));
        setTour(foundTour || null);
        setLoading(false);
      }, 500);
    };

    fetchTour();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would process the payment here
    // This is a mock implementation
    if (step === 1) {
      setStep(2);
    } else {
      // Process payment and booking
      try {
        // In a real app, you would call your backend to create a payment intent
        // const stripe = await loadStripe('your_publishable_key');
        // const response = await fetch('/api/create-payment-intent', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     amount: tour.price * formData.guests * 100, // in cents
        //     tourId: tour.id,
        //     ...formData,
        //   }),
        // });
        // const { clientSecret } = await response.json();
        // const result = await stripe.confirmCardPayment(clientSecret, {
        //   payment_method: { card: elements.getElement(CardElement) },
        // });
        
        // For demo purposes, we'll just show a success message
        alert('Booking successful! A confirmation has been sent to your email.');
        navigate('/');
      } catch (error) {
        // Handle payment error - show user-friendly message
        alert('There was an error processing your payment. Please try again.');
      }
    }
  };

  const totalAmount = tour ? tour.price * formData.guests : 0;

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
          <p>Complete your booking in just a few simple steps</p>
          
          <div className={styles.progress}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepText}>Your Details</div>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${step >= 2 ? styles.completed : ''}`} 
                style={{ width: step >= 2 ? '100%' : '0%' }}
              ></div>
            </div>
            <div className={`${styles.step} ${step === 2 ? styles.active : ''} ${step > 2 ? styles.completed : ''}`}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepText}>Payment</div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.bookingFormContainer}>
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              {step === 1 ? (
                <>
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
                    <label htmlFor="phone">Phone Number <span className={styles.required}>*</span></label>
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
                </>
              ) : (
                <>
                  <h2>Payment Information</h2>
                  <p className={styles.paymentNote}>
                    Your card will be charged <strong>${totalAmount}</strong> for {formData.guests} {formData.guests === 1 ? 'person' : 'people'}.
                  </p>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Card Number <span className={styles.required}>*</span></label>
                    <div className={styles.inputWithIcon}>
                      <CreditCardIcon className={styles.inputIcon} />
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                      <label htmlFor="expiry">Expiry Date <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                      <label htmlFor="cvv">CVV <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cardName">Name on Card <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="As shown on card"
                      required
                    />
                  </div>

                  <div className={styles.termsCheckbox}>
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                    />
                    <label htmlFor="terms">
                      I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    </label>
                  </div>
                </>
              )}

              <div className={styles.formActions}>
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`${styles.button} ${styles.buttonSecondary}`}
                  >
                    Back
                  </button>
                )}
                <button type="submit" className={styles.button}>
                  {step === 1 ? 'Continue to Payment' : 'Complete Booking'}
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
                <span>${tour.price} x {formData.guests} {formData.guests === 1 ? 'Person' : 'People'}</span>
                <span>${tour.price * formData.guests}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Taxes & Fees</span>
                <span>${(tour.price * formData.guests * 0.1).toFixed(2)}</span>
              </div>
              <div className={`${styles.priceRow} ${styles.total}`}>
                <span>Total Amount</span>
                <span>${(tour.price * formData.guests * 1.1).toFixed(2)}</span>
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
