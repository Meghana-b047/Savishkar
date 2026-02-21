import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HardHat, Zap } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Plan' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        background: scrolled
          ? 'rgba(6, 7, 26, 0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(139, 92, 246, 0.18)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(139,92,246,0.06)'
          : 'none',
        padding: scrolled ? '10px 0' : '20px 0',
      }}
    >
      <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366f1 50%, #06B6D4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)',
              flexShrink: 0,
            }}
          >
            <HardHat size={20} color="white" />
          </motion.div>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1.15rem',
            background: 'linear-gradient(90deg, #e2e8f0 0%, #a78bfa 50%, #67e8f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ConstructAI
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  position: 'relative',
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: isActive ? '#a78bfa' : 'rgba(226,232,240,0.75)',
                  transition: 'color 0.25s ease',
                  padding: '4px 0',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#e2e8f0'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(226,232,240,0.75)'; }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navUnderline"
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
                      boxShadow: '0 0 8px rgba(139,92,246,0.8)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <AnimatedButton size="sm">
              <Zap size={14} style={{ marginRight: 4 }} />
              Start Planning
            </AnimatedButton>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.92 }}
          className="md:hidden"
          style={{
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: 10,
            padding: '8px',
            cursor: 'pointer',
            color: '#e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              margin: '8px 16px',
              borderRadius: 16,
              background: 'rgba(10, 10, 30, 0.9)',
              backdropFilter: 'blur(32px)',
              border: '1px solid rgba(139,92,246,0.22)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    color: location.pathname === link.to ? '#a78bfa' : '#e2e8f0',
                    background: location.pathname === link.to ? 'rgba(139,92,246,0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none', marginTop: 4 }}>
                <AnimatedButton size="sm" fullWidth>Start Planning</AnimatedButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
