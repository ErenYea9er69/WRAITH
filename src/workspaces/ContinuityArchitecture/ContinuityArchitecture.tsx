import { useWraithStore } from '../../store/useWraithStore';
import { motion } from 'framer-motion';
import { GitBranch, CheckCircle2, AlertCircle, Bookmark, Activity } from 'lucide-react';

export const ContinuityArchitecture = () => {
  const { project } = useWraithStore();

  const promises = [
    { id: 'P_01', text: 'The protagonist is verified blind in the left eye.', status: 'Broken', chapter: '03' },
    { id: 'P_02', text: 'The "Wound" occured exactly 12 years ago.', status: 'Verified', chapter: '01' },
    { id: 'P_03', text: 'Institutional denial is the primary opposition.', status: 'Staged', chapter: '06' },
    { id: 'P_04', text: 'The sink was never repaired.', status: 'Pending', chapter: '09' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0b] p-8 overflow-y-auto font-mono">
      {/* Header */}
      <header className="mb-12 border border-zinc-900 bg-zinc-900/10 p-8 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-full">
            <GitBranch size={24} className="text-zinc-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-bone uppercase italic">Continuity Architecture</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Workspace Seven // Promise Registry & Fact Tracking // {project.isOriginComplete ? 'SYNC_ACTIVE' : 'IDLE'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Promise Registry */}
           <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-2">
                    <Bookmark size={14} /> Promise Registry
                 </h3>
                 <button className="text-[8px] text-zinc-700 uppercase font-bold hover:text-crimson transition-colors">
                    + Register Fact
                 </button>
              </div>
              
              <div className="space-y-3">
                 {promises.map((p, i) => (
                   <div key={i} className="bg-zinc-900/20 border border-zinc-900 p-4 group hover:bg-zinc-900/40 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[9px] text-zinc-600 font-bold uppercase">{p.id}</span>
                         <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border
                           ${p.status === 'Verified' ? 'text-green-600 border-green-900/30' : 
                             p.status === 'Broken' ? 'text-crimson border-crimson/30 animate-pulse' : 
                             p.status === 'Staged' ? 'text-blue-600 border-blue-900/30' : 'text-zinc-700 border-zinc-800'}`}>
                           {p.status}
                         </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed uppercase tracking-wider">{p.text}</p>
                      <div className="mt-3 flex items-center gap-2 text-[8px] text-zinc-700 font-bold uppercase">
                         <span>ESTABLISHED: CH_{p.chapter}</span>
                         <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                         <span>LOGIC_SYNC: {p.status === 'Broken' ? 'FAILED' : 'PASS'}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Logic Loop Detection */}
           <div className="space-y-6">
              <h3 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                 <AlertCircle size={14} /> Logic Loop Detection
              </h3>
              <div className="aspect-square bg-zinc-950/50 border border-zinc-900 rounded-full p-8 relative flex items-center justify-center overflow-hidden group">
                 {/* Visual Mock of Loop Scan */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                   className="absolute inset-0 border-[40px] border-zinc-900/20 rounded-full"
                 />
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                   className="absolute inset-8 border-[20px] border-zinc-900/10 rounded-full"
                 />
                 
                 <div className="z-10 text-center space-y-2">
                    <div className="text-[32px] font-bold text-bone tracking-tighter uppercase leading-none">
                       01 <span className="text-crimson italic">Loop</span>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest max-w-[150px] mx-auto">
                       Detected in CH_03 / CH_07 Correlation: <span className="text-zinc-400 italic">Temporal Offset</span>.
                    </p>
                 </div>
                 
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-900 animate-pulse" />
                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-900 animate-pulse" />
              </div>

              <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded">
                 <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={12} className="text-zinc-600" />
                    <span className="text-[9px] text-zinc-600 uppercase font-bold">Bible Synchronization</span>
                 </div>
                 <div className="text-[10px] text-bone uppercase tracking-widest font-mono">
                    94.2% CONSISTENCY FACTOR
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* Persistence Log */}
      <section className="mt-auto border-t border-zinc-900 pt-8">
         <div className="flex items-center gap-2 mb-4 text-zinc-600">
            <Activity size={14} />
            <span className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold font-mono">Fact Pulse Monitor</span>
         </div>
         <div className="flex gap-1 h-4">
            {[...Array(60)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: Math.random() > 0.5 ? 0.8 : 0.2 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className={`flex-1 ${i % 10 === 0 ? 'bg-crimson' : 'bg-zinc-800'} rounded-sm`}
              />
            ))}
         </div>
      </section>
    </div>
  );
};
