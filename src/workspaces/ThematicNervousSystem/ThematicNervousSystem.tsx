import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { Tent, GitMerge, List, Zap } from 'lucide-react';

export const ThematicNervousSystem = () => {
  const { project } = useWraithStore();

  const contradictions = [
    { sideA: 'Institutional Security', sideB: 'Individual Truth', weight: 85 },
    { sideA: 'Somatic Comfort', sideB: 'Moral Duty', weight: 40 },
    { sideA: 'Legacy Preservation', sideB: 'Necessary Rupture', weight: 65 },
  ];

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full">
      {/* Header */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <Tent size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase">Thematic Nervous System</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Four // Central Contradiction // {project.wound.slice(0, 30)}...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-4">
              <h3 className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest flex items-center gap-2">
                 <GitMerge size={14} /> Central Contradiction Mapping
              </h3>
              <div className="space-y-6">
                 {contradictions.map((c, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[9px] text-zinc-400 uppercase font-mono italic">
                         <span>{c.sideA}</span>
                         <span>{c.sideB}</span>
                      </div>
                      <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${c.weight}%` }}
                           transition={{ duration: 1.5, delay: i * 0.2 }}
                           className="h-full bg-crimson shadow-[0_0_10px_rgba(153,0,0,0.5)]"
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-[#0c0c0d] border border-zinc-900 p-6 flex flex-col justify-center gap-3">
              <div className="text-[24px] font-bold text-bone tracking-tighter uppercase leading-none">
                 The theme is a <span className="text-crimson">Discipline</span>.
              </div>
              <p className="text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wider">
                 The system detects a drift toward <span className="text-zinc-300">Aphorism</span>. 
                 Ensure contradictions are embodied in specific somatic reactions rather than dialogue.
              </p>
           </div>
        </div>
      </header>

      {/* Staging Moments */}
      <section className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-2">
              <List size={16} className="text-zinc-500" />
              <h2 className="text-[12px] text-bone uppercase tracking-widest font-bold">Staging Moments Tracker</h2>
           </div>
           <button className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest hover:text-crimson transition-colors">
              + Add Staging Environment
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'M_01', title: 'The Complicit Handshake', state: 'Staged', chapter: '02' },
            { tag: 'M_02', title: 'The Silence at the Sink', state: 'Simulation Required', chapter: '05' },
            { tag: 'M_03', title: 'Institutional Denial', state: 'DRAFT_PENING', chapter: '08' },
          ].map((m, i) => (
            <div key={i} className="bg-zinc-900/10 border border-zinc-900 p-6 hover:border-crimson/30 transition-all cursor-pointer group">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] text-crimson font-mono font-bold tracking-tighter">{m.tag}</span>
                  <span className="text-[8px] text-zinc-700 font-bold uppercase">CH_{m.chapter}</span>
               </div>
               <h4 className="text-[13px] text-zinc-300 font-bold uppercase mb-4 group-hover:text-bone transition-colors">{m.title}</h4>
               <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${m.state === 'Staged' ? 'bg-green-600' : 'bg-amber-600 animate-pulse'}`} />
                  <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest">{m.state}</span>
               </div>
            </div>
          ))}
          <div className="border border-zinc-900 border-dashed rounded flex flex-col items-center justify-center p-8 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
             <Zap size={20} className="text-zinc-800 mb-2" />
             <span className="text-[9px] text-zinc-700 uppercase font-bold">Deploy AI Propagator</span>
          </div>
        </div>
      </section>
    </div>
  );
};
