import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : styles.navbarTransparent}`}>
      <nav className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span>Get Your Trip</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={styles.navLink}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book-now"
              className={styles.bookNowButton}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.mobileMenuButton}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileNav}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={styles.navLink}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book-now"
                className={styles.bookNowButton}
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
