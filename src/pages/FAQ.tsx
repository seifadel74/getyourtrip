import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './FAQ.module.css';

const FAQ = () => {
  const { t } = useTranslation();
  
  const faqs = [
    {
      question: t('faq.questions.booking.question'),
      answer: t('faq.questions.booking.answer')
    },
    {
      question: t('faq.questions.cancellation.question'),
      answer: t('faq.questions.cancellation.answer')
    },
    {
      question: t('faq.questions.whatToBring.question'),
      answer: t('faq.questions.whatToBring.answer')
    },
    {
      question: t('faq.questions.children.question'),
      answer: t('faq.questions.children.answer')
    },
    {
      question: t('faq.questions.privateTours.question'),
      answer: t('faq.questions.privateTours.answer')
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
          <h1 className={styles.title}>{t('faq.title')}</h1>
          <p className={styles.subtitle}>{t('faq.subtitle')}</p>
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
          <h2 className={styles.ctaTitle}>{t('faq.stillHaveQuestions')}</h2>
          <p className={styles.ctaText}>{t('faq.contactSupport')}</p>
          <a href="/contact" className={styles.ctaButton}>{t('contact.title')}</a>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
