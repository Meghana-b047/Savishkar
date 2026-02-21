import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardHat, Github, Linkedin, Twitter } from 'lucide-react';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Plan' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(139,92,246,0.15)',
      background: 'rgba(4, 5, 18, 0.85)',
      backdropFilter: 'blur(24px)',
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '15%',
        right: '15%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(6,182,212,0.4), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ gridColumn: 'span 2' }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8B5CF6, #6366f1, #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(139,92,246,0.45)',
              }}>
                <HardHat size={20} color="white" />
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1.2rem',
                background: 'linear-gradient(90deg, #e2e8f0, #a78bfa, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ConstructAI
              </span>
            </Link>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(148,163,184,0.65)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxWidth: '320px',
              margin: 0,
            }}>
              AI-powered construction planning for smarter cost estimation, labour allocation, and project scheduling. Build with confidence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '16px',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: 'rgba(148,163,184,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(148,163,184,0.7)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '16px',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>Connect</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(148,163,184,0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                    e.currentTarget.style.color = '#a78bfa';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(139,92,246,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                    e.currentTarget.style.color = 'rgba(148,163,184,0.7)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(139,92,246,0.12)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(100,116,139,0.75)', fontSize: '0.82rem', margin: 0 }}>
            © {new Date().getFullYear()} ConstructAI. Built for hackathon.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(100,116,139,0.75)', fontSize: '0.82rem', margin: 0 }}>
            AI-Powered Construction Planning System
          </p>
        </div>
      </div>
    </footer>
  );
}
