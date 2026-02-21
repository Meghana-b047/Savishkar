import { motion } from 'framer-motion';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <motion.div
      className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export function Skeleton({ className = '', width, height }) {
  return (
    <motion.div
      className={`bg-slate-200 dark:bg-slate-700 rounded-lg ${className}`}
      style={{ width: width || '100%', height: height || '1rem' }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <Skeleton height={24} width="60%" />
      <Skeleton height={16} width="100%" />
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="75%" />
      <div className="flex gap-2 pt-4">
        <Skeleton height={40} width={100} />
        <Skeleton height={40} width={100} />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6"
    >
      <Spinner size="lg" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 dark:text-slate-400 font-medium"
      >
        Generating your AI plan...
      </motion.p>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Spinner;
