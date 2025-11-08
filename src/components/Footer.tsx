import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = React.memo(() => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = React.useMemo(() => [
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.aboutUs'), href: '/about' },
        { name: t('footer.ourTeam'), href: '/team' },
        { name: t('footer.careers'), href: '/careers' },
        { name: t('footer.blog'), href: '/blog' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.faqs'), href: '/faq' },
        { name: t('footer.contactUs'), href: '/contact' },
        { name: t('footer.termsConditions'), href: '/terms' },
        { name: t('footer.privacyPolicy'), href: '/privacy' },
      ],
    },
    {
      title: t('footer.contact'),
      links: [
        { name: 'info@getyourtrip.com', href: 'mailto:info@getyourtrip.com' },
        { name: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { name: '123 Travel St, City, Country', href: '#' },
      ],
    },
  ], [t]);

  const socialLinks = React.useMemo(() => [
    { name: t('footer.social.facebook'), href: 'https://facebook.com' },
    { name: t('footer.social.twitter'), href: 'https://twitter.com' },
    { name: t('footer.social.instagram'), href: 'https://instagram.com' },
    { name: t('footer.social.tripadvisor'), href: 'https://tripadvisor.com' },
  ], [t]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo and Description */}
          <div>
            <h3 className={styles.logo}>Get Your Trip</h3>
            <p className={styles.description}>
              {t('footer.description')}
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className={styles.linksList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className={styles.link}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Get Your Trip. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
