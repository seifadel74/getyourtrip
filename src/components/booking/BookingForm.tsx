import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import styles from './BookingForm.module.css';

type BookingFormData = {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  acceptTerms: boolean;
};

const BookingForm = ({ tourId, onSuccess }: { tourId: string; onSuccess: () => void }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      // Handle booking error - could show toast notification
      // In production, handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>
          <CheckCircleIcon className={styles.successIcon} />
        </div>
        <h2 className={styles.successTitle}>تم تأكيد حجزك بنجاح!</h2>
        <p className={styles.successMessage}>
          سنرسل لك تأكيد الحجز مع تفاصيل الرحلة على بريدك الإلكتروني ورقم الجوال
        </p>
        <div>
          <button
            onClick={() => navigate('/my-bookings')}
            className={`${styles.successButton} ${styles.primaryButton}`}
          >
            عرض حجوزاتي
          </button>
          <button
            onClick={() => navigate('/tours')}
            className={`${styles.successButton} ${styles.secondarySuccessButton}`}
          >
            تصفح المزيد من الرحلات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={handleBack}
          className={styles.backButton}
        >
          <ArrowLeftIcon className={styles.backIcon} />
          رجوع
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.formSection}
        >
          <h2 className={styles.sectionTitle}>معلومات الحجز</h2>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                الاسم الكامل
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="أدخل الاسم الكامل"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                رقم الجوال
              </label>
              <div className={styles.phoneInputContainer}>
                <div className={styles.countrySelect}>
                  <select
                    id="country"
                    name="country"
                    className={styles.input}
                  >
                    <option>+20</option>
                    <option>+966</option>
                    <option>+971</option>
                    <option>+973</option>
                  </select>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`${styles.input} ${styles.phoneInput}`}
                  placeholder="123 456 7890"
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="specialRequests" className={styles.label}>
                طلبات خاصة (اختياري)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={handleChange}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="أي متطلبات خاصة أو احتياجات إضافية"
              />
            </div>
          </div>
          
          <div className={styles.checkboxContainer}>
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
              أوافق على <a href="/terms" className={styles.link}>الشروط والأحكام</a> و <a href="/privacy" className={styles.link}>سياسة الخصوصية</a>
            </label>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleBack}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              رجوع
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              {isSubmitting ? (
                <span className={styles.buttonContent}>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تأكيد الحجز...
                </span>
              ) : 'تأكيد الحجز'}
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default BookingForm;
