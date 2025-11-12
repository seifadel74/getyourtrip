import React from 'react';
import { motion } from 'framer-motion';
import styles from './Terms.module.css';

const Terms = () => {
  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last Updated: November 6, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Get Your Trip. These Terms of Service ('Terms') govern your access to and use of our website, 
              services, and applications (collectively, the 'Service'). By accessing or using the Service, you agree to 
              be bound by these Terms and our Privacy Policy.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Booking Process</h2>
            <p>
              All bookings are subject to availability. Prices are in USD and include all applicable taxes and fees unless 
              otherwise stated. Booking requests will be confirmed by our team after review.
            </p>
            <p>
              Once your booking request is submitted, our team will contact you to confirm availability and provide further 
              instructions for completing your reservation.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Cancellation and Refunds</h2>
            <p>
              Cancellations made more than 7 days before the scheduled tour date will receive a full refund. Cancellations 
              made within 7 days of the tour date are non-refundable. No-shows will be charged the full price.
            </p>
            <p>
              In case of cancellation by us due to unforeseen circumstances, you will be offered an alternative date or a 
              full refund.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Changes to Bookings</h2>
            <p>
              Changes to bookings are subject to availability and must be requested at least 48 hours before the scheduled 
              tour. Additional charges may apply for changes made to the original booking.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Travel Insurance</h2>
            <p>
              We strongly recommend that you obtain comprehensive travel insurance before your trip to cover any 
              unforeseen circumstances, including but not limited to trip cancellations, medical emergencies, and 
              personal belongings.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Health and Safety</h2>
            <p>
              Participants must inform us of any medical conditions, allergies, or special requirements at the time of 
              booking. We reserve the right to refuse participation to anyone whose health or behavior may affect 
              the safety and enjoyment of other participants.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Liability</h2>
            <p>
              Get Your Trip acts as an intermediary between you and the service providers. We are not liable for any 
              injury, damage, loss, accident, delay, or irregularity that may occur during your tour. Participants 
              are responsible for their own safety and belongings.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property of Get Your Trip 
              or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and 
              protect your personal information.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon 
              posting on our website. Your continued use of the Service after any changes constitutes your acceptance 
              of the new Terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              our company is registered, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className={styles.contactSection}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <address>
              Get Your Trip<br />
              123 Travel Street<br />
              Cairo, Egypt<br />
              Email: info@getyourtrip.com<br />
              Phone: +20 123 456 7890
            </address>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
