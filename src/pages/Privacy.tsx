import React from 'react';
import { motion } from 'framer-motion';
import styles from './Privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.container}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: November 6, 2025</p>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Introduction</h2>
            <p>
              At Get Your Trip, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or use our services. Please read 
              this privacy policy carefully.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our website, including:</p>
            <ul className={styles.list}>
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Travel preferences and special requirements</li>
              <li>Device and usage information (IP address, browser type, pages visited)</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className={styles.list}>
              <li>Process and manage your bookings</li>
              <li>Communicate with you about your reservations</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className={styles.list}>
              <li>Service providers who assist in operating our website and services</li>
              <li>Travel suppliers (hotels, tour operators, etc.) to fulfill your bookings</li>
              <li>Payment processors to complete transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className={styles.section}>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of 
              transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute 
              security.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className={styles.list}>
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>
          </section>

          <section className={styles.section}>
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can set your 
              browser to refuse all or some browser cookies, but this may limit your ability to use certain features of 
              our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
              content of these external sites.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal 
              information from children under 16.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last 
              Updated" date at the top of this page.
            </p>
          </section>

          <section className={`${styles.section} ${styles.contactSection}`}>
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <address>
              Get Your Trip<br />
              123 Travel Street<br />
              Cairo, Egypt<br />
              Email: privacy@getyourtrip.com<br />
              Phone: +20 123 456 7890
            </address>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
