import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.tours'), href: '/tours' },
    { name: t('nav.destinations'), href: '/destinations' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header 
        ref={menuRef}
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : styles.navbarTransparent}`}
        role="banner"
      >
        <div className={styles.container}>
          <div className={styles.navContent}>
            {/* Logo */}
            <Link 
              to="/" 
              className={styles.logo}
              aria-label="Get Your Trip - Home"
            >
              <span>Get Your Trip</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={styles.navLink}
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book-now"
                className={`${styles.bookNowButton} ${styles.navLink}`}
              >
                {t('nav.bookNow')}
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className={styles.mobileMenuButton}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`${styles.menuBackdrop} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <div 
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={styles.closeButton}
          aria-label="Close menu"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsOpen(false)}
              aria-current={location.pathname === link.href ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/book-now"
            className={`${styles.bookNowButton} ${styles.mobileNavLink}`}
            onClick={() => setIsOpen(false)}
          >
            {t('nav.bookNow')}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
