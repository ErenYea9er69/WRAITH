import { useWraithStore } from '../../store/useWraithStore';
import { User, Shield, Zap, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const PsycheEngine = () => {
  const { project } = useWraithStore();
  const hasWound = project.wound.trim().length > 0;

  return (
    <div className="flex flex-col bg-[#0a0a0b] p-8 min-h-full workspace-content-padding">
      {/* Permanent Architecture Header */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-crimson/10 border border-crimson/20 rounded-full">
            <User size={24} className="text-crimson" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase">Psyche Engine</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace One // Permanent Architecture // Character 01
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formative Rupture */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-zinc-500" />
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">The Formative Rupture</h3>
            </div>
            <div className={`p-4 bg-zinc-900/40 border border-zinc-800 border-l-2 transition-all duration-500 ${hasWound ? 'border-l-crimson' : 'border-l-zinc-800 opacity-40'}`}>
              <p className="text-xs text-bone leading-relaxed italic pr-4">
                "The event that preceded the story and permanently altered the character's relationship with trust, power, guilt, or attachment."
              </p>
            </div>
            <textarea 
              placeholder="Describe the Rupture in one precision sentence..."
              className="w-full h-24 bg-zinc-900/20 border border-zinc-800 p-4 text-bone font-mono text-xs focus:border-crimson outline-none transition-colors"
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 border border-zinc-900 bg-zinc-900/10 text-[9px] uppercase tracking-tighter text-zinc-600">
                Trigger: <span className="text-zinc-400">Situation Category</span>
              </div>
              <div className="p-2 border border-zinc-900 bg-zinc-900/10 text-[9px] uppercase tracking-tighter text-zinc-600">
                Certainty: <span className="text-zinc-400">False Premise</span>
              </div>
              <div className="p-2 border border-zinc-900 bg-zinc-900/10 text-[9px] uppercase tracking-tighter text-zinc-600">
                Resource: <span className="text-zinc-400">Default Response</span>
              </div>
            </div>
          </section>

          {/* Behavioral Signature Set */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-zinc-500" />
              <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Behavioral Signature Set</h3>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="group p-3 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 transition-colors flex justify-between items-center cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-600 font-bold uppercase transition-colors group-hover:text-zinc-500">Signature {i}</span>
                    <span className="text-[11px] text-zinc-800 italic uppercase">Unscheduled</span>
                  </div>
                  <div className="text-[10px] text-zinc-900 group-hover:text-zinc-700 transition-colors uppercase font-bold tracking-tighter">
                    Deploy
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 bg-zinc-900/10 rounded">
               <Info size={14} className="text-zinc-700 shrink-0" />
               <p className="text-[9px] text-zinc-600 leading-tight uppercase tracking-tight">
                 Signatures are scheduled by the writer across the chapter sequence, not deployed randomly.
               </p>
            </div>
          </section>
        </div>
      </header>

      {/* Living State Feed */}
      <section className="mt-8 border-t border-zinc-900 pt-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
            Living State // Mask Load Readings
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-[9px] text-zinc-600 uppercase">System Frequency: <span className="text-bone">{hasWound ? '4.2Hz' : '0.0Hz'}</span></div>
            <div className={`px-2 py-0.5 border text-[8px] font-bold uppercase tracking-tighter transition-colors ${hasWound ? 'bg-crimson/10 border-crimson/20 text-crimson' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
              {hasWound ? 'Live Monitor' : 'Standby'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
          {/* Mask Load Gauge */}
          <div className={`lg:col-span-2 bg-zinc-900/10 border border-zinc-900 rounded p-8 flex flex-col relative overflow-hidden group transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
            <div className="flex justify-between mb-8">
              <div className="space-y-1">
                <h4 className="text-[11px] text-zinc-400 font-bold uppercase">Aggregated Mask Load</h4>
                <p className="text-[9px] text-zinc-600 italic">Discrepancy between exterior manifestation and interior truth.</p>
              </div>
              <div className={`text-3xl font-bold font-mono transition-colors ${hasWound ? 'text-crimson' : 'text-zinc-800'}`}>
                {hasWound ? '72' : '00'}<span className="text-xs text-zinc-700 ml-1">%</span>
              </div>
            </div>

            <div className="flex-1 flex items-end gap-1">
              {hasWound ? [...Array(40)].map((_, i) => {
                const height = Math.random() * 80 + 20;
                const isActive = i < 28; // ~70%
                return (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.02 }}
                    className={`flex-1 ${isActive ? 'bg-crimson/40 hover:bg-crimson' : 'bg-zinc-900'} transition-colors duration-300 cursor-help`}
                  />
                );
              }) : (
                <div className="w-full text-center text-[10px] text-zinc-800 font-mono tracking-widest mb-12 uppercase">Awaiting Psychic Signal</div>
              )}
            </div>
            
            {hasWound && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-[#0a0a0b] border border-crimson p-3 shadow-2xl">
                  <span className="text-[10px] text-crimson font-bold uppercase block mb-1">Drift Alert</span>
                  <p className="text-[9px] text-zinc-500 leading-tight">Protagonist is maintaining a 'Complicit Witness' mask despite 'Bureaucratic Harm' pressure.</p>
                </div>
              </div>
            )}
          </div>

          {/* Signature Deployment Feed */}
          <div className={`bg-zinc-900/10 border border-zinc-900 rounded p-6 flex flex-col transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-6">Signature Log</div>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {hasWound ? [
                { time: '14:22', sig: 'Evasive Redirect', status: 'Active', color: 'crimson' },
                { time: '12:05', sig: 'Bureaucratic Deference', status: 'Logged', color: 'zinc-700' },
                { time: '09:40', sig: 'Somatic Suppression', status: 'Logged', color: 'zinc-700' },
                { time: '04:15', sig: 'Mimetic Compliance', status: 'Logged', color: 'zinc-700' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start text-[10px] border-b border-zinc-900 pb-3 last:border-0">
                  <span className="text-zinc-700 font-mono tracking-tighter">{log.time}</span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-400 font-bold uppercase tracking-tight">{log.sig}</span>
                      <span className={`text-${log.color} text-[8px] font-bold uppercase`}>{log.status}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="h-full flex items-center justify-center text-[9px] text-zinc-800 font-mono uppercase">Log Empty</div>
              )}
            </div>
            <button className="mt-6 w-full py-2 bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-500 uppercase tracking-widest font-bold hover:bg-zinc-800 hover:text-bone transition-all disabled:opacity-20 disabled:cursor-not-allowed" disabled={!hasWound}>
              Initialize New Signature
            </button>
          </div>
        </div>
      </section>

      {/* Character Arc Projection */}
      <section className={`mt-12 border-t border-zinc-900 pt-12 transition-opacity duration-1000 ${hasWound ? 'opacity-100' : 'opacity-20'}`}>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={14} className="text-crimson" />
          <h3 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Character Arc Projection // Evolution tracking</h3>
        </div>
        
        <div className="bg-zinc-900/10 border border-zinc-900 p-8 relative rounded-sm group overflow-hidden">
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-1">
              <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest block">Trajectory: [Naive] → [Psychopath]</span>
              <p className="text-[11px] text-bone uppercase tracking-tight">Emotional Sincerity vs. Behavioral Dread</p>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <span className="text-[8px] text-zinc-600 uppercase">Sincerity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-crimson" />
                <span className="text-[8px] text-crimson uppercase">Dread</span>
              </div>
            </div>
          </div>

          <div className="h-48 relative px-4">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              {/* Sincerity Line */}
              <motion.path
                d="M0,50 L100,60 L200,80 L300,120 L400,150 L500,180 L600,190 L700,200 L800,200 L1000,200"
                fill="none"
                stroke="#52525b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: hasWound ? 1 : 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              {/* Dread Line */}
              <motion.path
                d="M0,180 L100,170 L200,150 L300,100 L400,60 L500,40 L600,30 L700,20 L800,10 L1000,5"
                fill="none"
                stroke="#990000"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: hasWound ? 1 : 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
            </svg>
            
            {/* Labels */}
            <div className="absolute left-0 bottom-0 text-[8px] text-zinc-800 uppercase tracking-tighter">Genesis</div>
            <div className="absolute right-0 bottom-0 text-[8px] text-zinc-800 uppercase tracking-tighter text-right">Climax</div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Baseline', value: 'SINCERE', color: 'zinc-500' },
              { label: 'Rupture Peak', value: 'CH_03', color: 'zinc-400' },
              { label: 'Moral Erosion', value: '62%', color: 'crimson' },
              { label: 'Unmasking', value: 'PROBABLE', color: 'crimson' },
            ].map((m, i) => (
              <div key={i} className="border-l border-zinc-900 pl-4 py-1">
                <span className="text-[8px] text-zinc-700 uppercase block font-bold mb-1 tracking-tighter">{m.label}</span>
                <span className={`text-[11px] text-${m.color} uppercase font-bold tracking-widest`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
