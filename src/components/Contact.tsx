import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import './Contact.css';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function sendEmail(data: FormState): Promise<void> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? 'Failed to send message.');
  }
}

const contactInfo = [
  { icon: <FiMapPin />, label: 'Location', value: '514 E Washington Ave, Madison, WI 53703' },
  { icon: <FiPhone />, label: 'Phone', value: '+1 608 316 0789', href: 'tel:+16083160789' },
  { icon: <FiMail />, label: 'Email', value: 'negi3@wisc.edu', href: 'mailto:negi3@wisc.edu' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }
    setStatus('loading');
    try {
      await sendEmail(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            For business or personal inquiries, feel free to reach out using any of the methods below.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info cards */}
          <motion.div
            className="contact-info"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="contact-info-card">
                <div className="contact-info-icon">{item.icon}</div>
                <div>
                  <p className="contact-info-label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="contact-info-value">{item.value}</a>
                  ) : (
                    <p className="contact-info-value">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="contact-note">
              <p>
                Prefer email? Reach me directly at{' '}
                <a href="mailto:negi3@wisc.edu">negi3@wisc.edu</a> — I typically
                respond within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            noValidate
          >
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  autoComplete="name"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={6}
              />
            </div>

            {status === 'error' && (
              <p className="contact-status contact-status--error">{errorMsg}</p>
            )}
            {status === 'success' && (
              <p className="contact-status contact-status--success">
                Message sent! I'll get back to you soon.
              </p>
            )}

            <button type="submit" className="btn-primary contact-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : <><FiSend /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
