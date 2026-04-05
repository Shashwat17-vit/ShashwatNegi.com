import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import './About.css';

const highlights = [
  'Developed LangGraph-based agentic systems with GPT-4/Claude routing, achieving 35% cost reduction and 90% automation in enterprise workflows, deployed via FastAPI microservices and AWS Bedrock.',
  'Engineered production ML models (XGBoost, DBSCAN) with MLflow tracking and A/B testing, delivering 15% conversion lift and scalable ETL pipelines processing 100K+ daily records on AWS.',
  'AWS Solutions Architect certified with hands-on expertise in cloud-native architectures using Terraform, Kubernetes (EKS), serverless computing, and compliance frameworks (GDPR, HIPAA).',
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          {/* Image column */}
          <motion.div
            className="about-image-wrap"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="about-image-frame">
              <img src="/assets/img/Photo4.jpg" alt="Shashwat Negi" />
              <div className="about-image-accent" aria-hidden="true" />
            </div>
            <div className="about-image-tag">
              <span className="about-image-tag-line">UW-Madison</span>
              <span className="about-image-tag-sub">MS Data Science · 2026</span>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className="about-text"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="section-label">About</p>
            <h2 className="section-title">Who's Building<br />This?</h2>
            <p className="about-lead">
              Applied AI Engineer and Data Scientist with a strong Software Engineering foundation,
              specializing in building production-grade LLM systems, multimodal AI solutions, and
              scalable cloud infrastructure.
            </p>
            <p className="about-body">
              With 3+ years of experience across AI engineering and software development, I deliver
              measurable business impact through end-to-end ML pipelines, agentic frameworks, and
              enterprise deployments.
            </p>

            <ul className="about-highlights">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="about-check">
                    <FiCheck />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="about-actions">
              <a
                href="/assets/Shashwats_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download Resume
              </a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
