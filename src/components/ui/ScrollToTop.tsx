import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import styles from './ScrollToTop.module.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

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
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className={styles.scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
