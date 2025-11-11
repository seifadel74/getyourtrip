import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const languages = useMemo(() => [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ], []);

  const currentLanguage = useMemo(() => 
    languages.find(lang => lang.code === i18n.language) || languages[0],
    [languages, i18n.language]
  );

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
    // Set document direction for RTL languages
    if (lng === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lng;
    }
  }, [i18n]);

  // Set initial direction based on current language
  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  // Scroll to top when path changes with smooth behavior
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLangDropdownOpen(false);
      }
    };

    if (isLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isLangDropdownOpen]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={styles.floatingButtons}>
      {/* Language Switcher */}
      <div className={styles.languageSwitcher} ref={langDropdownRef}>
        <button
          onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
          className={styles.langDropdownButton}
          aria-label="Select language"
          aria-expanded={isLangDropdownOpen}
        >
          <span className={styles.langFlag}>{currentLanguage.flag}</span>
          <span className={styles.langCode}>{currentLanguage.code.toUpperCase()}</span>
          <ChevronDownIcon className={`${styles.chevronIcon} ${isLangDropdownOpen ? styles.chevronOpen : ''}`} />
        </button>
        {isLangDropdownOpen && (
          <div className={styles.langDropdownMenu}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${styles.langDropdownItem} ${i18n.language === lang.code ? styles.active : ''}`}
                aria-label={`Switch to ${lang.name}`}
              >
                <span className={styles.langFlag}>{lang.flag}</span>
                <span className={styles.langName}>{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className={styles.scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
