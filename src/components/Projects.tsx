import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data';
import type { Project, ProjectFilter } from '../types';
import './Projects.css';

const filters: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'software', label: 'Software Dev' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'data', label: 'Data Science' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-panel"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>

          <div className="modal-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="modal-body">
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <h3 className="modal-title">{project.title}</h3>
            <p className="modal-desc">{project.longDescription}</p>

            {project.metrics && (
              <ul className="modal-metrics">
                {project.metrics.map((m) => (
                  <li key={m}>
                    <span className="modal-metric-dot" />
                    {m}
                  </li>
                ))}
              </ul>
            )}

            <div className="modal-actions">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <FiGithub /> View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FiExternalLink /> Live Site
                </a>
              )}
              {project.extraLinks?.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <FiExternalLink /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Projects spanning Data Science, Deep Learning, and AI Engineering — from hackathons to production systems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="projects-filters"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-card-overlay">
                    <button
                      className="project-card-open"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View ${project.title}`}
                    >
                      <FiArrowUpRight />
                    </button>
                  </div>
                </div>
                <div className="project-card-body">
                  <div className="project-card-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <button
                    className="project-card-cta"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details <FiArrowUpRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
