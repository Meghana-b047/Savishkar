import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
  fullWidth = false,
  ...props
}) {
  const btnRef = useRef(null);
  const rippleRef = useRef(null);

  const sizeStyles = {
    sm: { padding: '8px 18px', fontSize: '0.875rem' },
    md: { padding: '12px 26px', fontSize: '1rem' },
    lg: { padding: '16px 38px', fontSize: '1.1rem' },
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #8B5CF6 0%, #6366f1 45%, #06B6D4 100%)',
      color: '#ffffff',
      boxShadow: '0 0 24px rgba(139,92,246,0.45), 0 4px 20px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.12)',
    },
    secondary: {
      background: 'rgba(15,15,40,0.65)',
      color: '#e2e8f0',
      boxShadow: '0 0 12px rgba(139,92,246,0.2)',
      border: '1px solid rgba(139,92,246,0.3)',
    },
    ghost: {
      background: 'transparent',
      color: '#e2e8f0',
      boxShadow: 'none',
      border: '1px solid rgba(226,232,240,0.15)',
    },
  };

  // Magnetic hover
  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current || disabled || loading) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
    btnRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }, [disabled, loading]);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate(0px, 0px)';
    btnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transition = '';
    }, 400);
  }, []);

  // Ripple
  const handleClick = useCallback((e) => {
    if (!btnRef.current || disabled || loading) return;
    const rect = btnRef.current.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2.5;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    Object.assign(ripple.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.18)',
      transform: 'scale(0)',
      animation: 'rippleExpand 0.65s ease-out forwards',
      pointerEvents: 'none',
      zIndex: 0,
    });
    btnRef.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onClick?.(e);
  }, [disabled, loading, onClick]);

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled || loading}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={disabled || loading ? {} : { scale: 1.03 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        borderRadius: 14,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.5 : 1,
        transition: 'box-shadow 0.3s ease, background 0.3s ease',
        width: fullWidth ? '100%' : 'auto',
        letterSpacing: '0.01em',
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      onMouseEnter={e => {
        if (variant === 'primary' && !disabled && !loading) {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(139,92,246,0.7), 0 0 80px rgba(6,182,212,0.2), 0 8px 30px rgba(0,0,0,0.5)';
        }
      }}
      onMouseLeave2={e => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = variantStyles.primary.boxShadow;
        }
      }}
      {...props}
    >
      {/* Shimmer overlay for primary */}
      {variant === 'primary' && (
        <span style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmerSweep 3s linear infinite',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }} />
      )}

      {loading ? (
        <motion.span
          style={{
            width: 20,
            height: 20,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={16} />}
          {children}
        </span>
      )}
    </motion.button>
  );
}
