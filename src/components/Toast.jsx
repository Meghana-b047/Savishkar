import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
  error: 'bg-red-500/10 dark:bg-red-500/20 border-red-500/30 text-red-700 dark:text-red-300',
  warning: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-300',
  info: 'bg-primary-500/10 dark:bg-primary-500/20 border-primary-500/30 text-primary-700 dark:text-primary-300',
};

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(({ id, message, type = 'info' }) => {
          const Icon = icons[type];
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border
                shadow-lg backdrop-blur-xl pointer-events-auto
                ${styles[type]}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{message}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
