import { useWraithStore } from '../../store/useWraithStore';
import { User, Shield, Zap, Info } from 'lucide-react';

export const PsycheEngine = () => {
  const { project } = useWraithStore();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] p-8 overflow-y-auto">
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
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 border-l-2 border-l-crimson">
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

      {/* Living State Feed (Phase 3) */}
      <section className="opacity-20 pointer-events-none grayscale blur-[1px]">
         <div className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold mb-4">
          Living State // Mask Load Readings [LOCKED]
        </div>
        <div className="h-64 bg-zinc-900/5 border border-zinc-900 border-dashed rounded flex items-center justify-center">
           <span className="text-xs text-zinc-800 uppercase font-bold tracking-[0.5em]">Phase 3 // Living State Engine</span>
        </div>
      </section>
    </div>
  );
};
