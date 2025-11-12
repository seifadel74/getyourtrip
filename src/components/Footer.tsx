import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
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
    { icon: faFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: faTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { 
      icon: faWhatsapp, 
      href: 'https://wa.me/15551234567', // Replace with your actual WhatsApp number
      label: 'WhatsApp',
    },
  ], []);

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
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
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
