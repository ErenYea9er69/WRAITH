import { useState } from 'react';
import { useWraithStore } from '../../store/useWraithStore';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OriginChamber = () => {
  const { project, updateProject, completeOrigin } = useWraithStore();
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'THE WOUND', description: 'Why must this story be written?' },
    { title: 'PRESSURE MAP', description: 'Real-world forces in conversation.' },
    { title: 'COLLAPSE QUESTION', description: 'The irresolvable contradiction.' },
    { title: 'WRITING COMPASS', description: 'The cadence of conviction.' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOrigin();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center gap-4">
          <span className="text-crimson">WORKSPACE ZERO:</span> ORIGIN CHAMBER
        </h1>
        <div className="flex gap-4">
          {steps.map((s, i) => (
            <div 
              key={i}
              className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold transition-colors ${i === step ? 'text-bone' : 'text-zinc-600'}`}
            >
              <span>{String(i).padStart(2, '0')}</span>
              <span className={i === step ? 'text-crimson' : ''}>{s.title}</span>
              {i < steps.length - 1 && <ChevronRight size={12} className="text-zinc-800" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-bone mb-2 uppercase">{steps[step].title}</h2>
            <p className="text-zinc-500 text-sm italic">{steps[step].description}</p>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <textarea 
                value={project.wound}
                onChange={(e) => updateProject({ wound: e.target.value })}
                placeholder="Write until you have nothing left to say..."
                className="w-full h-96 bg-zinc-900/30 border border-zinc-800 p-8 text-bone font-mono text-sm leading-relaxed focus:border-crimson outline-none transition-colors scrollbar-thin scrollbar-thumb-zinc-700"
              />
              <div className="p-4 bg-crimson/5 border border-crimson/10 rounded">
                <p className="text-[11px] text-zinc-500 leading-relaxed uppercase tracking-wide">
                  The AI reads this entry to extract the emotional core. This remains a living document.
                  Your wound will be visible in the top panel of every workspace once initialized.
                </p>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded bg-zinc-900/10">
              <p className="text-zinc-600 uppercase tracking-widest text-[10px]">
                Zone {steps[step].title} Pending Implementation
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-12 flex justify-end">
        <button 
          onClick={handleNext}
          className="group flex items-center gap-3 px-8 py-3 bg-crimson text-bone uppercase tracking-widest text-[11px] font-bold hover:bg-crimson-bright transition-all"
        >
          {step === steps.length - 1 ? 'INITIALIZE SIGNAL ROOM' : 'PROCEED TO NEXT ZONE'}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
