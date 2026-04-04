import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { testimonials } from '../data';
import './Testimonials.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number, direction: 1 | -1) => {
    setDir(direction);
    setCurrent(next);
  }, []);

  const prev = () => go((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = useCallback(() => go((current + 1) % testimonials.length, 1), [current, go]);

  useEffect(() => {
    autoRef.current = setTimeout(() => next(), 5000);
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
  }, [current, next]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: -d * 60 }),
  };

  return (
    <section id="certifications" className="testimonials section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Certifications & Recommendations</p>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Recommendations from professors, managers, and supervisors — alongside technical certifications.
          </p>
        </motion.div>

        <motion.div
          className="testimonial-stage"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="testimonial-viewport">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                className="testimonial-card"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="testimonial-card-inner">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      <img src={t.image} alt={t.name} />
                    </div>
                    <div className="testimonial-meta">
                      <h3 className="testimonial-name">{t.name}</h3>
                      <p className="testimonial-role">{t.role}</p>
                      <p className="testimonial-org">{t.organization}</p>
                    </div>
                    <div className="testimonial-stars" aria-label="5 stars">
                      {'★'.repeat(5)}
                    </div>
                  </div>

                  <blockquote className="testimonial-quote">
                    <span className="testimonial-quote-mark">"</span>
                    {t.quote}
                    <span className="testimonial-quote-mark testimonial-quote-mark--right">"</span>
                  </blockquote>

                  {t.isCertification && t.certLink && (
                    <a href={t.certLink} target="_blank" rel="noopener noreferrer" className="testimonial-cert-link">
                      <FiExternalLink /> View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-controls">
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot${i === current ? ' testimonial-dot--active' : ''}`}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="testimonial-arrows">
              <button className="testimonial-arrow" onClick={prev} aria-label="Previous">
                <FiChevronLeft />
              </button>
              <button className="testimonial-arrow" onClick={next} aria-label="Next">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
