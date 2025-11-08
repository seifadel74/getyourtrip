import React from 'react';
import styles from './Loader.module.css';

export const PageLoader: React.FC = () => {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PageLoader;
