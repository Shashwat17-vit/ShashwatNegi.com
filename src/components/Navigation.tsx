import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiCode, FiInstagram, FiMenu, FiX } from 'react-icons/fi';
import './Navigation.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <header className={`nav-header${scrolled ? ' nav-header--scrolled' : ''}`}>
        <div className="container nav-inner">
          {/* Logo — name only, no mark */}
          <a href="#hero" className="nav-logo" onClick={handleNavClick}>
            Shashwat Negi
          </a>

          {/* Desktop Links */}
          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons (desktop) */}
          <div className="nav-social">
            <a href="https://github.com/Shashwat17-vit" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href="https://www.linkedin.com/in/shashwat-negi-b57a8115b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href="https://leetcode.com/u/ShashwatNegiUW-M/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode"><FiCode /></a>
            <a href="https://www.instagram.com/shashwat.negi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {/*
        IMPORTANT: The drawer is a SIBLING of the header (not nested inside it).
        Nesting inside the header breaks `position: fixed` on the drawer because
        `backdrop-filter` on the scrolled header creates a new containing block,
        causing the fixed drawer to be positioned relative to the header instead
        of the viewport — making nav links bleed below the navbar.
      */}
      <div
        className={`nav-drawer${mobileOpen ? ' nav-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
        aria-modal={mobileOpen}
        role="dialog"
      >
        <nav className="nav-drawer-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-drawer-link"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-drawer-social">
          <a href="https://github.com/Shashwat17-vit" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/shashwat-negi-b57a8115b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="https://leetcode.com/u/ShashwatNegiUW-M/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode"><FiCode /></a>
          <a href="https://www.instagram.com/shashwat.negi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
        </div>
      </div>
    </>
  );
}
