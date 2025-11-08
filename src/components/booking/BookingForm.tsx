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
  paymentMethod: 'credit' | 'paypal' | 'bank';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  acceptTerms: boolean;
};

const BookingForm = ({ tourId, onSuccess }: { tourId: string; onSuccess: () => void }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
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
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
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
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
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
      {/* Progress Bar */}
      <div className={styles.header}>
        <button
          onClick={handleBack}
          className={styles.backButton}
        >
          <ArrowLeftIcon className={styles.backIcon} />
          رجوع
        </button>
        <div className={styles.stepIndicator}>
          الخطوة {step} من 2
        </div>
      </div>
      <div className={styles.progressBar}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: step === 1 ? '50%' : '100%' }}
          animate={{ width: step === 1 ? '50%' : '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
                id="terms"
                name="terms"
                type="checkbox"
                required
                className={styles.checkbox}
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                أوافق على <a href="/terms" className={styles.link}>الشروط والأحكام</a> و <a href="/privacy" className={styles.link}>سياسة الخصوصية</a>
              </label>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.formSection}
          >
            <h2 className={styles.sectionTitle}>الدفع</h2>
            
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>بطاقة ائتمان/خصم</span>
              </label>
              
              <label className={styles.radioOption}>
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>باي بال</span>
              </label>
              
              <label className={styles.radioOption}>
                <input
                  id="bank"
                  name="paymentMethod"
                  type="radio"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioLabel}>تحويل بنكي</span>
              </label>
            </div>
            
            {formData.paymentMethod === 'credit' && (
              <div className={styles.paymentForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="cardNumber" className={styles.label}>
                    رقم البطاقة
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className={styles.cardDetails}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cardExpiry" className={styles.label}>
                      تاريخ الانتهاء
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="cardCvv" className={styles.label}>
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cardCvv"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div className={styles.checkboxContainer}>
                  <input
                    id="saveCard"
                    name="saveCard"
                    type="checkbox"
                    className={styles.checkbox}
                  />
                  <label htmlFor="saveCard" className={styles.checkboxLabel}>
                    حفظ معلومات البطاقة للاستخدام المستقبلي
                  </label>
                </div>
              </div>
            )}
            
            {formData.paymentMethod === 'paypal' && (
              <div className={`${styles.infoBox} ${styles.infoBoxYellow}`}>
                <p>
                  سيتم توجيهك إلى موقع باي بال لإتمام عملية الدفع.
                </p>
              </div>
            )}
            
            {formData.paymentMethod === 'bank' && (
              <div className={`${styles.infoBox} ${styles.infoBoxBlue}`}>
                <h3 className={styles.infoTitle}>معلومات الحوالة البنكية</h3>
                <div className={styles.bankInfoGrid}>
                  <div className={styles.bankInfoItem}>
                    <div className={styles.bankInfoLabel}>اسم البنك:</div>
                    <div>بنك مصر</div>
                  </div>
                  <div className={styles.bankInfoItem}>
                    <div className={styles.bankInfoLabel}>رقم الحساب:</div>
                    <div>1234 5678 9012 3456</div>
                  </div>
                  <div className={styles.bankInfoItem}>
                    <div className={styles.bankInfoLabel}>اسم المستفيد:</div>
                    <div>شركة جيت يور تريب للسياحة</div>
                  </div>
                  <div className={styles.bankInfoItem}>
                    <div className={styles.bankInfoLabel}>IBAN:</div>
                    <div>EG12345678901234567890123456</div>
                  </div>
                </div>
                <p className={styles.infoNote}>
                  يرجى إرسال صورة من إيصال التحويل إلى info@getyourtrip.com مع رقم الحجز
                </p>
              </div>
            )}
            
            <div className={styles.summary}>
              <h3 className={styles.summaryTitle}>ملخص الطلب</h3>
              <div className={styles.summaryItem}>
                <span>سعر الرحلة</span>
                <span>$1,000.00</span>
              </div>
              <div className={styles.summaryItem}>
                <span>الضرائب والرسوم</span>
                <span>$50.00</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>المجموع الكلي</span>
                <span>$1,050.00</span>
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
                أوافق على الشروط والأحكام وسياسة الخصوصية
              </label>
            </div>

            <div className={styles.formActions}>
              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`${styles.button} ${styles.secondaryButton}`}
                >
                  رجوع
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`${styles.button} ${styles.secondaryButton}`}
                >
                  رجوع للمعلومات الشخصية
                </button>
              )}
              
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
                    {step === 1 ? 'جاري التحميل...' : 'جاري تأكيد الحجز...'}
                  </span>
                ) : step === 1 ? 'الانتقال للدفع' : 'تأكيد الحجز'}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
