import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, Calendar, DollarSign, ChevronDown, Zap, TrendingUp, Shield } from 'lucide-react';
import { Navbar, Footer, AnimatedButton, FadeInSection } from '../components';
import ParticleBackground from '../components/ParticleBackground';

const features = [
  {
    icon: BarChart3,
    title: 'Smart Cost Estimation',
    description: 'AI-powered budget forecasting with material and labour cost breakdowns, accurate to within 3%.',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.4)',
  },
  {
    icon: Users,
    title: 'Labour Planning',
    description: 'Optimal worker allocation based on project scope and timeline using real-time workforce intelligence.',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    icon: Calendar,
    title: 'Schedule Optimization',
    description: 'Intelligent timeline generation with weekly milestones adapted to your project constraints.',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.4)',
  },
  {
    icon: DollarSign,
    title: 'Budget Control',
    description: 'Track expenses in real-time and get AI alerts before costs spiral beyond your construction budget.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.4)',
  },
];

const stats = [
  { icon: Zap, value: '10x', label: 'Faster planning' },
  { icon: TrendingUp, value: '97%', label: 'Cost accuracy' },
  { icon: Shield, value: '500+', label: 'Projects built' },
];

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: '#06071a' }}>
      {/* Global background system */}
      <ParticleBackground />

      <Navbar />

      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>

        {/* ========== HERO SECTION ========== */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          paddingTop: '100px',
          paddingBottom: '60px',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 5 }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: '28px', display: 'inline-block' }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '100px',
                background: 'linear-gradient(90deg, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.18) 100%)',
                border: '1px solid rgba(139,92,246,0.4)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 500,
                color: '#a78bfa',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 20px rgba(139,92,246,0.15)',
                backgroundSize: '200% 100%',
                animation: 'shimmerSweep 4s linear infinite',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #8B5CF6', animation: 'bloomPulse 2s ease-in-out infinite', flexShrink: 0 }} />
                AI-Powered Construction Intelligence
              </span>
            </motion.div>

            {/* Headline with float animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ perspective: '1200px' }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  lineHeight: 1.08,
                  marginBottom: '24px',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                AI-Powered{' '}
                <br />
                <span style={{
                  background: 'linear-gradient(90deg, #a78bfa 0%, #06B6D4 35%, #818cf8 65%, #a78bfa 100%)',
                  backgroundSize: '300% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientTextShift 3.5s ease infinite',
                  filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.5))',
                  display: 'inline-block',
                }}>
                  Construction
                </span>
                {' '}Planning
              </motion.h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'rgba(203, 213, 225, 0.82)',
                maxWidth: '580px',
                margin: '0 auto 40px',
              }}
            >
              Optimize cost estimation, labour allocation, and schedule planning
              with intelligent AI analytics.{' '}
              <span style={{ color: '#a78bfa', fontWeight: 600 }}>Build smarter, faster.</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {/* Glow ring */}
                  <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: 18,
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.5))',
                    filter: 'blur(8px)',
                    animation: 'glowRingPulse 2.5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }} />
                  <AnimatedButton size="lg" style={{ position: 'relative' }}>
                    Start Planning
                    <ArrowRight size={18} />
                  </AnimatedButton>
                </div>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                gap: '40px',
                justifyContent: 'center',
                marginTop: '56px',
                flexWrap: 'wrap',
              }}
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '4px',
                  }}>
                    <Icon size={16} color="#a78bfa" style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.7))' }} />
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.6rem',
                      color: '#ffffff',
                      lineHeight: 1,
                    }}>{value}</span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.78rem',
                    color: 'rgba(148,163,184,0.8)',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.7rem',
                color: 'rgba(148,163,184,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>Explore</span>
              <div style={{ animation: 'scrollBounce 1.8s ease-in-out infinite' }}>
                <ChevronDown size={20} color="rgba(139,92,246,0.7)" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== FEATURES SECTION ========== */}
        <section style={{ padding: '120px 0 100px', position: 'relative' }}>
          {/* Section glow bg */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
            <FadeInSection className="" direction="depth" style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h2 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#ffffff',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}>
                  Everything you need{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #a78bfa, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>to plan</span>
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(148,163,184,0.75)',
                  maxWidth: '520px',
                  margin: '0 auto',
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                }}>
                  From initial estimation to weekly schedules — our AI handles the complexity so you build with confidence.
                </p>
              </div>
            </FadeInSection>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}>
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <FadeInSection key={feature.title} delay={i * 0.12} direction="depth">
                    <motion.div
                      whileHover={{ y: -10, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className="glass-card"
                      style={{
                        borderRadius: 24,
                        padding: '32px',
                        height: '100%',
                        cursor: 'default',
                      }}
                    >
                      {/* Icon */}
                      <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: 16,
                        background: `radial-gradient(circle at 30% 30%, ${feature.color}, rgba(0,0,0,0.5))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        boxShadow: `0 0 20px ${feature.glow}, 0 4px 15px rgba(0,0,0,0.4)`,
                        animation: 'bloomPulse 3.5s ease-in-out infinite',
                        animationDelay: `${i * 0.4}s`,
                      }}>
                        <Icon size={24} color="#ffffff" />
                      </div>

                      <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        color: '#f1f5f9',
                        marginBottom: '10px',
                        letterSpacing: '-0.01em',
                      }}>
                        {feature.title}
                      </h3>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: 'rgba(148,163,184,0.75)',
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}>
                        {feature.description}
                      </p>

                      {/* Bottom accent line */}
                      <div style={{
                        marginTop: '24px',
                        height: 2,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                        opacity: 0.5,
                      }} />
                    </motion.div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section style={{ padding: '100px 0 120px', position: 'relative', overflow: 'hidden' }}>
          {/* Cosmic radial glow bg */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 25% 50%, rgba(139,92,246,0.18) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 50%, rgba(6,182,212,0.12) 0%, transparent 55%)
            `,
            pointerEvents: 'none',
          }} />
          {/* Glow border top */}
          <div style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(6,182,212,0.5), transparent)',
          }} />

          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <FadeInSection direction="depth">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 100,
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                marginBottom: '28px',
              }}>
                <Zap size={13} color="#a78bfa" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#a78bfa', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Ready to build?
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                Build smarter,{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #a78bfa, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>faster, together</span>
              </h2>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'rgba(148,163,184,0.75)',
                maxWidth: '480px',
                margin: '0 auto 44px',
                fontSize: '1.05rem',
                lineHeight: 1.65,
              }}>
                Get your AI-generated construction plan in minutes.
                No complex setup — just enter your project details.
              </p>

              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Outer pulsing glow ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: 22,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(6,182,212,0.6))',
                  filter: 'blur(10px)',
                  animation: 'glowRingPulse 2.5s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <AnimatedButton size="lg">
                    <Zap size={18} />
                    Generate AI Plan
                    <ArrowRight size={16} />
                  </AnimatedButton>
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
