import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeInSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.65,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    up: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -48 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    depth: { hidden: { opacity: 0, scale: 0.88, y: 30 }, visible: { opacity: 1, scale: 1, y: 0 } },
  };

  const v = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
