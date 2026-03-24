import { useState } from 'react';
import { useWraithStore } from '../../store/useWraithStore';
import { ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
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

  const pressures = [
    'Institutional Corruption', 'Police Violence', 'Government Surveillance',
    'Corporate Extraction', 'Economic Precarity', 'Gender-Based Power',
    'Racial Hierarchy', 'Environmental Destruction', 'Media Capture',
    'Immigration Enforcement', 'Educational Gatekeeping', 'Healthcare Abandonment',
    'Housing Displacement', 'Addiction Systems', 'Political Repression',
    'Carceral Logic', 'Child Welfare Failures', 'Elder Abandonment',
    'Religious Abuse', 'Workplace Exploitation', 'Inherited Family Damage',
    'Whistleblower Persecution', 'Complicit Silence', 'Bureaucratic Harm'
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOrigin();
    }
  };

  const togglePressure = (p: string) => {
    const next = project.pressures.includes(p)
      ? project.pressures.filter(x => x !== p)
      : [...project.pressures, p];
    updateProject({ pressures: next });
  };

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-12 max-w-5xl mx-auto min-h-full workspace-content-padding">
      {/* Header */}
      <div className="mb-12 shrink-0">
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
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-bone mb-1 uppercase">{steps[step].title}</h2>
              <p className="text-zinc-500 text-xs italic">{steps[step].description}</p>
            </div>

            {step === 0 && (
              <div className="space-y-6 h-full pb-8">
                <textarea 
                  value={project.wound}
                  onChange={(e) => updateProject({ wound: e.target.value })}
                  placeholder="Write until you have nothing left to say..."
                  className="w-full h-96 bg-zinc-900/10 border border-zinc-800 p-8 text-bone font-mono text-sm leading-relaxed focus:border-crimson outline-none transition-colors scrollbar-thin scrollbar-thumb-zinc-700 resize-none"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6 pb-8">
                <div className="grid grid-cols-3 gap-3">
                  {pressures.map(p => {
                    const isSelected = project.pressures.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePressure(p)}
                        className={`
                          p-3 text-[10px] text-left uppercase tracking-wider border transition-all duration-200
                          ${isSelected 
                            ? 'bg-crimson/10 border-crimson text-bone font-bold' 
                            : 'bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}
                        `}
                      >
                        {p}
                        {isSelected && <div className="mt-1 h-0.5 w-full bg-crimson" />}
                      </button>
                    );
                  })}
                </div>
                
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded">
                  <h4 className="text-[10px] text-crimson font-bold uppercase mb-2 tracking-widest">AI Proposal Simulation</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                    "Based on your Wound entry, I detect latent pressures involving **Inherited Family Damage** and **Complicit Silence**. These forces appear to be the primary drivers of your protagonist's isolation."
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 pb-8">
                <div className="space-y-4">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">The Collapse Question</label>
                  <input 
                    type="text"
                    value={project.collapseQuestion.question}
                    onChange={(e) => updateProject({ collapseQuestion: { ...project.collapseQuestion, question: e.target.value } })}
                    placeholder="e.g. Can a person be redeemed for a choice they no longer remember making?"
                    className="w-full bg-zinc-900/40 border border-zinc-800 p-4 text-bone font-mono text-sm focus:border-crimson outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Character A (Side 1)</label>
                    <input 
                      type="text"
                      value={project.collapseQuestion.charA.name}
                      onChange={(e) => updateProject({ collapseQuestion: { ...project.collapseQuestion, charA: { ...project.collapseQuestion.charA, name: e.target.value } } })}
                      placeholder="Name"
                      className="w-full bg-zinc-900/40 border border-zinc-800 p-3 text-bone font-mono text-sm mb-2 focus:border-crimson outline-none"
                    />
                    <textarea 
                      value={project.collapseQuestion.charA.position}
                      onChange={(e) => updateProject({ collapseQuestion: { ...project.collapseQuestion, charA: { ...project.collapseQuestion.charA, position: e.target.value } } })}
                      placeholder="Why would they die for their position?"
                      className="w-full h-32 bg-zinc-900/20 border border-zinc-800 p-3 text-bone font-mono text-xs outline-none focus:border-crimson"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Character B (Side 2)</label>
                    <input 
                      type="text"
                      value={project.collapseQuestion.charB.name}
                      onChange={(e) => updateProject({ collapseQuestion: { ...project.collapseQuestion, charB: { ...project.collapseQuestion.charB, name: e.target.value } } })}
                      placeholder="Name"
                      className="w-full bg-zinc-900/40 border border-zinc-800 p-3 text-bone font-mono text-sm mb-2 focus:border-crimson outline-none"
                    />
                    <textarea 
                      value={project.collapseQuestion.charB.position}
                      onChange={(e) => updateProject({ collapseQuestion: { ...project.collapseQuestion, charB: { ...project.collapseQuestion.charB, position: e.target.value } } })}
                      placeholder="Why would they die for their position?"
                      className="w-full h-32 bg-zinc-900/20 border border-zinc-800 p-3 text-bone font-mono text-xs outline-none focus:border-crimson"
                    />
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-crimson/5 border border-crimson/20 rounded">
                  <AlertCircle size={20} className="text-crimson shrink-0" />
                  <p className="text-[11px] text-zinc-400">
                    Wraith rejects questions that have a "correct" answer. Both Character A and Character B must be sympathetic and their positions must be grounded in the Story Pressure Signature.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 pb-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-2">Voice Register</label>
                      <textarea 
                        value={project.compass.voiceRegister}
                        onChange={(e) => updateProject({ compass: { ...project.compass, voiceRegister: e.target.value } })}
                        placeholder="Define the degree of irony, distance from interiority..."
                        className="w-full h-24 bg-zinc-900/40 border border-zinc-800 p-3 text-bone font-mono text-xs outline-none focus:border-crimson"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-2">Sentence Behavior</label>
                      <div className="grid grid-cols-2 gap-2 text-[9px] text-zinc-500">
                        <div className="space-y-1">
                          <span>Max Action</span>
                          <input 
                            type="number" 
                            value={project.compass.sentenceBehavior.maxLengthAction} 
                            onChange={(e) => updateProject({ 
                              compass: { 
                                ...project.compass, 
                                sentenceBehavior: { 
                                  ...project.compass.sentenceBehavior, 
                                  maxLengthAction: parseInt(e.target.value) 
                                } 
                              } 
                            })}
                            className="w-full bg-zinc-900 p-1 border border-zinc-800" 
                          />
                        </div>
                        <div className="space-y-1">
                          <span>Max Emotional</span>
                          <input 
                            type="number" 
                            value={project.compass.sentenceBehavior.maxLengthEmotional} 
                            onChange={(e) => updateProject({ 
                              compass: { 
                                ...project.compass, 
                                sentenceBehavior: { 
                                  ...project.compass.sentenceBehavior, 
                                  maxLengthEmotional: parseInt(e.target.value) 
                                } 
                              } 
                            })}
                            className="w-full bg-zinc-900 p-1 border border-zinc-800" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900/50 border border-zinc-800 relative">
                    <div className="absolute -top-3 left-4 bg-[#0a0a0b] px-2 text-[9px] text-zinc-500 uppercase tracking-tighter">Compass Feedback Loop</div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-zinc-400">Coordination Bias</span>
                        <span className="text-crimson">64%</span>
                      </div>
                      <div className="h-1 bg-zinc-800 w-full">
                        <div className="h-full bg-crimson w-[64%]" />
                      </div>
                      <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                        Prose will favor coordination over subordination to maintain a direct, unmediated register.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-between shrink-0">
        <button 
          onClick={() => step > 0 && setStep(step - 1)}
          className={`text-[10px] uppercase tracking-widest font-bold ${step === 0 ? 'opacity-0' : 'text-zinc-600 hover:text-bone'}`}
        >
          Back
        </button>
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
