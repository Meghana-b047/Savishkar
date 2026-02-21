import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, DollarSign, Package, ChevronDown, ChevronUp, 
  Download, ArrowLeft, FileImage 
} from 'lucide-react';
import { Navbar, Footer, GlassCard, AnimatedButton } from '../components';
import { staggerContainer, staggerItem } from '../animations/variants';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expandedWeek, setExpandedWeek] = useState(null);
  
  const data = state?.data;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">No plan data found</p>
            <AnimatedButton onClick={() => navigate('/dashboard')}>
              Create a Plan
            </AnimatedButton>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalCost = data.cost_breakdown 
    ? Object.values(data.cost_breakdown).reduce((a, b) => a + b, 0) 
    : 0;

  const handleDownload = () => {
    alert('PDF download will be available when backend is connected.');
  };

  const cards = [
    {
      title: 'Worker Requirements',
      icon: Users,
      delay: 0,
      content: data.worker_requirements && (
        <div className="space-y-3">
          {Object.entries(data.worker_requirements).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 capitalize">{key}</span>
              <span className="font-semibold text-slate-900 dark:text-white">{val}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Timeline',
      icon: Calendar,
      delay: 0.1,
      content: data.timeline && (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Total Duration</span>
            <span className="font-semibold">{data.timeline.total_days} days</span>
          </div>
          {data.timeline.phases?.map((phase) => (
            <div key={phase.name} className="text-sm">
              <div className="flex justify-between mb-1">
                <span>{phase.name}</span>
                <span>{phase.days} days</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(phase.days / data.timeline.total_days) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Cost Breakdown',
      icon: DollarSign,
      delay: 0.2,
      content: data.cost_breakdown && (
        <div className="space-y-3">
          {Object.entries(data.cost_breakdown).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 capitalize">{key}</span>
              <span className="font-semibold">₹{val?.toLocaleString?.() ?? val}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">₹{totalCost.toLocaleString()}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Material Estimation',
      icon: Package,
      delay: 0.3,
      content: data.material_estimation && (
        <div className="space-y-3">
          {Object.entries(data.material_estimation).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400 capitalize">{key}</span>
              <span className="font-semibold">{val?.toLocaleString?.() ?? val} units</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12"
          >
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-2">
                Your AI Construction Plan
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Detailed breakdown of labour, cost, materials, and schedule
              </p>
            </div>
            <div className="flex gap-3">
              <AnimatedButton variant="secondary" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5" />
                New Plan
              </AnimatedButton>
              <AnimatedButton variant="secondary" onClick={handleDownload}>
                <Download className="w-5 h-5" />
                Download PDF
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {cards.map(({ title, icon: Icon, delay, content }) => (
              <motion.div key={title} variants={staggerItem}>
                <GlassCard delay={delay}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">
                      {title}
                    </h2>
                  </div>
                  {content}
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {data.weekly_schedule && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard hover={false}>
                <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Weekly Schedule
                </h2>
                <div className="space-y-2">
                  <AnimatePresence>
                    {data.weekly_schedule.map((week) => (
                      <motion.div
                        key={week.week}
                        layout
                        className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="font-medium">Week {week.week}</span>
                          {expandedWeek === week.week ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedWeek === week.week && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="px-4 py-3 space-y-2 bg-white dark:bg-slate-900/50">
                                {week.tasks?.map((task) => (
                                  <li key={task} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </GlassCard>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <GlassCard hover={false}>
              <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileImage className="w-5 h-5" />
                Blueprint Preview
              </h2>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  Blueprint visualization will appear when integrated with CAD/design API
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
