import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Navbar, Footer, AnimatedButton, GlassCard } from '../components';
import { useToast } from '../context/ToastContext';
import { analyzeConstruction } from '../services/api';

const FLOOR_OPTIONS = ['G+1', 'G+2', 'G+3', 'G+4'];

const FIELD_ORDER = ['builtUpArea', 'floors', 'duration', 'location', 'budget', 'wageRate', 'materialCost'];

const SECTIONS = [
  {
    id: 'project',
    title: 'Project Info',
    fields: ['builtUpArea', 'floors', 'duration', 'location'],
    step: 1,
  },
  {
    id: 'budget',
    title: 'Budget Info',
    fields: ['budget'],
    step: 2,
  },
  {
    id: 'cost',
    title: 'Cost Info',
    fields: ['wageRate', 'materialCost'],
    step: 3,
  },
];

const TOOLTIPS = {
  builtUpArea: 'Total built-up area in square feet. Include all floors.',
  floors: 'Number of floors including ground. G+1 = 2 floors, G+2 = 3 floors, etc.',
  duration: 'Estimated project duration in working days.',
  location: 'Construction site location (city/region) for labour cost estimates.',
  budget: 'Total project budget in ₹. Optional—AI will estimate if not provided.',
  wageRate: 'Daily wage rate per labourer in ₹. Optional—uses regional defaults.',
  materialCost: 'Material cost per sq ft in ₹. Optional—uses standard rates.',
};

const initialForm = {
  builtUpArea: '',
  floors: 'G+1',
  duration: '',
  budget: '',
  location: '',
  wageRate: '',
  materialCost: '',
};

export default function Dashboard() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const inputRefs = useRef({});
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();

  const getCurrentStep = useCallback(() => {
    if (!focusedField) return { step: 1, total: 3 };
    const section = SECTIONS.find((s) => s.fields.includes(focusedField));
    return section ? { step: section.step, total: 3 } : { step: 1, total: 3 };
  }, [focusedField]);

  const currentStep = getCurrentStep();

  useEffect(() => {
    const firstRef = inputRefs.current[FIELD_ORDER[0]];
    if (firstRef) {
      const timer = setTimeout(() => firstRef.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e, fieldName) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const idx = FIELD_ORDER.indexOf(fieldName);
      if (idx === -1) return;
      if (idx === FIELD_ORDER.length - 1) {
        formRef.current?.requestSubmit();
      } else {
        const nextRef = inputRefs.current[FIELD_ORDER[idx + 1]];
        nextRef?.focus();
      }
    },
    []
  );

  const validate = () => {
    const newErrors = {};
    if (!form.builtUpArea || Number(form.builtUpArea) <= 0) {
      newErrors.builtUpArea = 'Valid built-up area is required';
    }
    if (!form.duration || Number(form.duration) <= 0) {
      newErrors.duration = 'Valid duration is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showError('Please fix the form errors');
      return;
    }

    setSubmitting(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 10, 90));
    }, 300);

    try {
      const payload = {
        built_up_area: Number(form.builtUpArea),
        floors: form.floors,
        duration: Number(form.duration),
        budget: form.budget ? Number(form.budget) : undefined,
        location: form.location || undefined,
        wage_rate: form.wageRate ? Number(form.wageRate) : undefined,
        material_cost: form.materialCost ? Number(form.materialCost) : undefined,
      };

      const result = await analyzeConstruction(payload);
      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        success('Plan generated successfully!');
        navigate('/results', { state: { data: result } });
      }, 300);
    } catch (err) {
      clearInterval(progressInterval);
      const message = err.response?.data?.message || err.message || 'Failed to generate plan';
      const useDemo = !err.response || err.response.status >= 400 || err.code === 'ERR_NETWORK';
      if (useDemo) {
        setProgress(100);
        setTimeout(() => {
          const mockData = generateMockData();
          success('Demo mode: Showing sample plan (API unavailable)');
          navigate('/results', { state: { data: mockData } });
        }, 300);
      } else {
        setSubmitting(false);
        showError(message);
      }
    }
  };

  const generateMockData = () => {
    const area = Number(form.builtUpArea) || 2000;
    const floors = FLOOR_OPTIONS.indexOf(form.floors) + 2 || 2;
    const duration = Number(form.duration) || 180;
    return {
      worker_requirements: {
        skilled: Math.ceil(area / 500) + 2,
        unskilled: Math.ceil(area / 300) + 5,
        supervisors: Math.ceil(floors) + 1,
      },
      timeline: {
        total_days: duration,
        phases: [
          { name: 'Foundation', days: Math.ceil(duration * 0.15), start: 0 },
          { name: 'Structure', days: Math.ceil(duration * 0.45), start: Math.ceil(duration * 0.15) },
          { name: 'MEP & Finishing', days: Math.ceil(duration * 0.3), start: Math.ceil(duration * 0.6) },
          { name: 'Handover', days: Math.ceil(duration * 0.1), start: duration - Math.ceil(duration * 0.1) },
        ],
      },
      cost_breakdown: {
        labour: Math.round(area * 800 * floors),
        materials: Math.round(area * 1200 * floors),
        equipment: Math.round(area * 150 * floors),
        miscellaneous: Math.round(area * 200 * floors),
      },
      material_estimation: {
        cement: Math.ceil(area * 0.4 * floors),
        steel: Math.ceil(area * 4 * floors),
        sand: Math.ceil(area * 1.5 * floors),
        bricks: Math.ceil(area * 500 * floors),
      },
      weekly_schedule: Array.from({ length: Math.ceil(duration / 7) }, (_, i) => ({
        week: i + 1,
        tasks: [`Phase ${Math.min(Math.floor(i / (duration / 28)), 3) + 1} activities`, 'Quality checks', 'Progress review'],
      })),
    };
  };

  const InputField = ({ label, name, type = 'text', options, optional, fullWidth }) => {
    const value = form[name];
    const hasValue = value !== '' && value !== undefined;
    const isFocused = focusedField === name;
    const hasError = !!errors[name];

    return (
      <motion.div
        layout
        className={`relative ${fullWidth ? 'md:col-span-2' : ''}`}
        onClick={() => {
          const ref = inputRefs.current[name];
          ref?.focus();
        }}
      >
        <motion.div
          layout
          className={`
            relative rounded-xl cursor-text transition-all duration-300
            ${isFocused ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900' : ''}
            ${hasError ? 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-slate-900' : ''}
          `}
          animate={{
            boxShadow: isFocused
              ? '0 0 0 4px rgba(99, 102, 241, 0.15), 0 0 24px -4px rgba(99, 102, 241, 0.25)'
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
        >
          {options ? (
            <select
              ref={(el) => (inputRefs.current[name] = el)}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              onKeyDown={(e) => handleKeyDown(e, name)}
              className="w-full px-4 pt-6 pb-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              ref={(el) => (inputRefs.current[name] = el)}
              type={type}
              value={form[name]}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              onKeyDown={(e) => handleKeyDown(e, name)}
              placeholder=" "
              disabled={submitting}
              className="w-full px-4 pt-6 pb-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50"
            />
          )}
          <motion.label
            layout
            className="absolute left-4 pointer-events-none text-slate-500 dark:text-slate-400"
            initial={false}
            animate={{
              top: hasValue || isFocused ? 12 : '50%',
              y: hasValue || isFocused ? 0 : '-50%',
              fontSize: hasValue || isFocused ? 12 : 16,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left center' }}
          >
            <span className={isFocused ? 'text-primary-600 dark:text-primary-400' : ''}>
              {label} {optional && <span className="text-slate-400">(optional)</span>}
            </span>
          </motion.label>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button
              type="button"
              className="p-1 rounded-full text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              onClick={(e) => {
                e.stopPropagation();
                setTooltipVisible(tooltipVisible === name ? null : name);
              }}
              onMouseEnter={() => setTooltipVisible(name)}
              onMouseLeave={() => setTooltipVisible(null)}
              aria-label={`Help for ${label}`}
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <AnimatePresence>
            {tooltipVisible === name && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 z-10 px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white text-sm shadow-lg"
              >
                {TOOLTIPS[name]}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors[name]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
              AI Construction Planner
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Enter your project details to generate an intelligent construction plan with cost, labour, and schedule estimates
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            onClick={() => setTooltipVisible(null)}
          >
            <GlassCard className="max-w-2xl mx-auto" hover={false}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between mb-6"
              >
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Step {currentStep.step} of {currentStep.total}
                </span>
              </motion.div>

              {SECTIONS.map((section) => (
                <motion.div
                  key={section.id}
                  layout
                  className="mb-8 last:mb-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.h3
                    layout
                    className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-4"
                  >
                    {section.title}
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((name) => (
                      <InputField
                        key={name}
                        label={
                          name === 'builtUpArea'
                            ? 'Built-up Area (sq ft)'
                            : name === 'floors'
                            ? 'Floors'
                            : name === 'duration'
                            ? 'Duration (days)'
                            : name === 'budget'
                            ? 'Budget (₹)'
                            : name === 'location'
                            ? 'Location'
                            : name === 'wageRate'
                            ? 'Wage Rate (₹/day)'
                            : 'Material Cost (₹/sq ft)'
                        }
                        name={name}
                        type={['builtUpArea', 'duration', 'budget', 'wageRate', 'materialCost'].includes(name) ? 'number' : 'text'}
                        options={name === 'floors' ? FLOOR_OPTIONS : undefined}
                        optional={['budget', 'location', 'wageRate', 'materialCost'].includes(name)}
                        fullWidth={name === 'materialCost'}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              {submitting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6"
                >
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Generating your AI plan...</p>
                </motion.div>
              )}

              <div className="mt-8">
                <AnimatedButton
                  type="submit"
                  loading={submitting}
                  disabled={submitting}
                  fullWidth
                  size="lg"
                  icon={null}
                >
                  Generate AI Plan
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
