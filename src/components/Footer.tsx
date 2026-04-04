import { FiGithub, FiLinkedin, FiCode, FiInstagram, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="divider" />
      <div className="container footer-inner">
        {/* Left */}
        <div className="footer-left">
          <a href="#hero" className="footer-logo">
            Shashwat Negi
          </a>
          <p className="footer-tagline">
            Applied AI Engineer & Data Scientist<br />
            Building things that matter.
          </p>
        </div>

        {/* Center — nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right */}
        <div className="footer-right">
          <div className="footer-social">
            <a href="https://github.com/Shashwat17-vit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/shashwat-negi-b57a8115b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://leetcode.com/u/ShashwatNegiUW-M/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <FiCode />
            </a>
            <a href="https://www.instagram.com/shashwat.negi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>

          <a href="#hero" className="footer-back-top" aria-label="Back to top">
            <FiArrowUp />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copy">
          © {currentYear} Shashwat Negi. Deployed on AWS &amp; GCP.
        </p>
        <p className="footer-built">
          Built with React + TypeScript + Framer Motion
        </p>
      </div>
    </footer>
  );
}
