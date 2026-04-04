import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCode, FiInstagram, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

const TYPED_ITEMS = [
  'a Data Science Masters Candidate.',
  'a Software Engineer.',
  'an AI Engineer.',
  'a proud Badger from UW-Madison!',
];

function useTyped(items: string[], speed = 60, pause = 1800) {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const [itemIdx, setItemIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const current = items[itemIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx((i) => i + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx((i) => i - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setItemIdx((i) => (i + 1) % items.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, itemIdx, items, pause, speed]);

  return { text, cursor };
}

export default function Hero() {
  const { text, cursor } = useTyped(TYPED_ITEMS);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle particle field for depth
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 151, 90, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Background image */}
      <div className="hero-bg">
        <img src="/assets/img/Aerial_Bascom3b.jpg" alt="" aria-hidden="true" />
        <div className="hero-bg-overlay" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />

      {/* Content */}
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="hero-eyebrow">Hello, I'm</p>
          <h1 className="hero-name">Shashwat<br />Negi</h1>

          <div className="hero-typed-wrapper">
            <span className="hero-typed-prefix">I'm </span>
            <span className="hero-typed-text">{text}</span>
            <span className={`hero-cursor${cursor ? ' hero-cursor--visible' : ''}`}>|</span>
          </div>

          <div className="hero-social">
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
        </motion.div>

        <motion.a
          href="#about"
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-label="Scroll to about"
        >
          <FiArrowDown />
          <span>Scroll</span>
        </motion.a>
      </div>
    </section>
  );
}
