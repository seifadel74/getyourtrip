import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import styles from './FAQ.module.css';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I book a tour?',
      answer: 'You can book a tour directly through our website by selecting your desired tour and following the booking process. Alternatively, you can contact our customer service for assistance.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer free cancellation up to 7 days before your scheduled tour. Cancellations made within 7 days of the tour date may be subject to a fee. Please check the specific tour details for more information.'
    },
    {
      question: 'What should I bring on the tour?',
      answer: 'We recommend bringing comfortable walking shoes, weather-appropriate clothing, a water bottle, sunscreen, and a camera. Specific tours may have additional recommendations which will be provided in your booking confirmation.'
    },
    {
      question: 'Are your tours suitable for children?',
      answer: 'Most of our tours are family-friendly and suitable for children. However, some tours may have age restrictions due to safety concerns. Please check the tour details or contact us for specific information.'
    },
    {
      question: 'Do you offer private tours?',
      answer: 'Yes, we offer private tours for individuals and groups. Private tours can be customized according to your preferences and schedule. Please contact us for more information and pricing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. Payment is required at the time of booking to secure your reservation.'
    }
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>Find answers to common questions about our tours and services.</p>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}>
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDownIcon className={styles.chevron} />
              </button>
              <motion.div
                id={`faq-${index}`}
                className={styles.faqAnswer}
                initial={false}
                animate={openIndex === index ? 'open' : 'collapsed'}
                variants={{
                  open: { opacity: 1, height: 'auto', marginTop: '1rem' },
                  collapsed: { opacity: 0, height: 0, marginTop: 0 }
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Still have questions?</h2>
          <p className={styles.ctaText}>Contact our support team for more information.</p>
          <a href="/contact" className={styles.ctaButton}>Contact Us</a>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
