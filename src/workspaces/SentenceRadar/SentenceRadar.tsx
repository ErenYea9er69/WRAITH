import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { Activity, Beaker, FileText, AlertTriangle } from 'lucide-react';

export const SentenceRadar = () => {
  const { project } = useWraithStore();

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full font-mono">
      {/* Search/Input Panel */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Activity size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase">Sentence Radar</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              Workspace Three // Real-time Prose Diagnostic // {project.compass.voiceRegister || "Standard Registry"}
            </p>
          </div>
        </div>

        <div className="relative">
          <textarea 
            placeholder="Paste fragment for structural analysis..."
            className="w-full h-32 bg-zinc-900/30 border border-zinc-800 p-6 text-bone text-sm leading-loose focus:border-crimson outline-none transition-colors overflow-hidden"
          />
          <div className="absolute bottom-4 right-4 text-[9px] text-zinc-700 uppercase tracking-tighter">
            Waiting for input...
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Logic Density', value: `${project.structural?.logicConsistency || 0}%`, color: 'crimson', desc: 'Ratio of syllogism to image.' },
          { label: 'Coordination', value: `${project.compass.pacingRatios.dialogue}%`, color: 'zinc-400', desc: 'Compound sentence bias.' },
          { label: 'Subordination', value: `${project.compass.pacingRatios.interiority}%`, color: 'zinc-700', desc: 'Complex dependency depth.' },
          { label: 'Revelation Density', value: project.structural?.revelationDensity || '0.0 bits', color: 'zinc-700', desc: 'Information release rate.' },
        ].map((m, i) => (
          <div key={i} className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-sm hover:border-zinc-800 transition-colors cursor-default">
            <h4 className="text-[10px] text-zinc-600 font-bold uppercase mb-2 tracking-widest">{m.label}</h4>
            <div className={`text-2xl font-bold text-${m.color} mb-2`}>{m.value}</div>
            <p className="text-[9px] text-zinc-700 leading-tight uppercase">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Dialogue Facade Layer */}
      <section className="mb-12 bg-crimson/5 border border-crimson/20 p-8 rounded-sm">
        <div className="flex items-center gap-2 mb-6">
          <Beaker size={18} className="text-crimson" />
          <h3 className="text-[12px] text-bone uppercase tracking-widest font-bold">Dialogue Facade Layer // Subtext Diagnostic</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             <div className="text-[10px] text-zinc-500 uppercase tracking-tight">Active Discrepancy Detection</div>
             <div className="p-4 bg-zinc-900/40 border border-zinc-800 font-mono text-xs leading-relaxed">
                <span className="text-zinc-600">"I don't know what you're talking about, Ji-won. I was at the office all night."</span>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-crimson/10 border border-crimson/20 text-[10px] text-crimson uppercase font-bold"
                >
                  Subtext Alert: Direct contradiction with [Internal Truth: Evidence of Premeditation].
                </motion.div>
             </div>
          </div>
          
          <div className="bg-zinc-900/10 border border-zinc-900 p-6 flex flex-col justify-between">
             <div className="space-y-4">
                <div className="text-[9px] text-zinc-600 uppercase font-bold">Facade Transparency</div>
                <div className="text-4xl font-bold text-bone">84<span className="text-sm ml-1 text-zinc-700">%</span></div>
                <p className="text-[9px] text-zinc-600 leading-tight uppercase">High risk of premature discovery. Dialogue lacks necessary 'Emotional Buffer' or 'Evasive Redirect' signatures.</p>
             </div>
             <div className="h-2 bg-zinc-950 rounded-full overflow-hidden mt-6">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  className="h-full bg-crimson shadow-[0_0_8px_rgba(153,0,0,0.6)]"
                />
             </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coordination Map (Mock visualization) */}
        <section className="md:col-span-2 bg-zinc-900/5 border border-zinc-900 p-8">
           <div className="flex justify-between items-center mb-6">
             <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Clause Dependency Topology</div>
             <Beaker size={14} className="text-zinc-700" />
           </div>
           <div className="h-48 flex items-center justify-center gap-1 border-b border-zinc-900 pb-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                   <div className="w-0.5 bg-zinc-800 h-full relative">
                      <motion.div 
                        initial={{ top: '100%' }}
                        animate={{ top: `${Math.random() * 80}%` }}
                        className="absolute w-2 h-2 -left-1 bg-crimson rounded-full"
                      />
                   </div>
                   <span className="text-[8px] text-zinc-800">S_{i+1}</span>
                </div>
              ))}
           </div>
           <div className="mt-4 text-[9px] text-zinc-600 italic">
              Prose fragment displays high repetition of "and" conjunctions. Coordination bias is excessive for a 'Cold Register'.
           </div>
        </section>

        {/* Forbidden Patterns Feed */}
        <section className="bg-zinc-900/10 border border-zinc-900 p-6">
           <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={14} className="text-crimson" />
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Spectral Violations</h3>
           </div>
           <div className="space-y-4">
              {(project.thematic?.contradictions || []).map((v, i) => (
                <div key={i} className="flex justify-between items-center bg-[#0a0a0b] p-3 border border-zinc-900">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-bone uppercase tracking-tight">{v.sideA} vs {v.sideB}</span>
                      <span className="text-[8px] text-zinc-700 uppercase">WEIGHT: {v.weight}</span>
                   </div>
                   <div className="text-xl font-bold text-zinc-800 font-mono">{v.weight > 70 ? 'CRITICAL' : 'MID'}</div>
                </div>
              ))}
              {(!project.thematic?.contradictions || project.thematic.contradictions.length === 0) && (
                <div className="text-[9px] text-zinc-800 uppercase text-center py-4 border border-dashed border-zinc-900">No contradictions mapped</div>
              )}
           </div>
           <div className="mt-8">
              <div className="flex items-center gap-2 opacity-30">
                 <FileText size={12} className="text-zinc-500" />
                 <span className="text-[9px] text-zinc-700 uppercase">Export Metrics to Cortex</span>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};
