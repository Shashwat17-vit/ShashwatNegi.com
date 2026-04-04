import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { experience, education, certifications, skills } from '../data';
import './Resume.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Resume() {
  return (
    <section id="resume" className="resume section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="section-label">Resume</p>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            The experiences, skills, and milestones that have shaped who I am today.
          </p>
        </motion.div>

        <div className="resume-grid">
          {/* Left: Education + Skills + Certs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Education */}
            <h3 className="resume-category">Education</h3>
            <div className="timeline">
              {education.map((edu, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-body">
                    <div className="timeline-header">
                      <h4 className="timeline-title">{edu.institution}</h4>
                      <span className="timeline-period">{edu.period}</span>
                    </div>
                    <p className="timeline-role">{edu.degree}</p>
                    <p className="timeline-gpa">GPA: {edu.gpa}</p>
                    <p className="timeline-meta">{edu.coursework}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <h3 className="resume-category">Technical Skills</h3>
            <div className="skills-grid">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="skills-group">
                  <h4 className="skills-group-title">{category}</h4>
                  <div className="skills-tags">
                    {items.map((skill) => (
                      <span key={skill} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <h3 className="resume-category">Certifications</h3>
            <ul className="cert-list">
              {certifications.map((cert, i) => (
                <li key={i} className="cert-item">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                    <span className="cert-title">{cert.title}</span>
                    <span className="cert-issuer">{cert.issuer}</span>
                    <FiExternalLink className="cert-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Experience */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="resume-category">Professional Experience</h3>
            <div className="timeline">
              {experience.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-body">
                    <div className="timeline-header">
                      <h4 className="timeline-title">{exp.company}</h4>
                      <span className="timeline-location">{exp.location}</span>
                    </div>
                    <p className="timeline-role">{exp.role}</p>
                    <p className="timeline-period">{exp.period}</p>
                    <ul className="timeline-bullets">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                    {exp.subRole && (
                      <>
                        <p className="timeline-role timeline-role--sub">{exp.subRole}</p>
                        <p className="timeline-period">{exp.subPeriod}</p>
                        <ul className="timeline-bullets">
                          {exp.subBullets?.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
