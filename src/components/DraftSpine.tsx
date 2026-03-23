import { useWraithStore } from '../store/useWraithStore';

export const DraftSpine = () => {
  const { project } = useWraithStore();

  if (!project.isOriginComplete) return null;

  return (
    <footer className="draft-spine h-12 flex items-center overflow-x-auto gap-1 border-t border-zinc-800 bg-[#080809]">
      <div className="px-4 border-r border-zinc-800 h-full flex items-center text-[10px] text-zinc-500 uppercase font-bold tracking-widest bg-zinc-900/40">
        Draft Spine
      </div>
      
      {/* Mock Chapter Slices */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div 
          key={i} 
          className="h-8 min-w-[32px] bg-zinc-900 border border-zinc-800 relative group cursor-pointer hover:bg-zinc-800 transition-colors"
          title={`Chapter ${i}`}
        >
          {/* Pressure Bands */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-crimson opacity-40 group-hover:opacity-100 transition-opacity" style={{ height: `${Math.random() * 80 + 20}%` }} />
          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-zinc-600 group-hover:text-bone z-10 transition-colors">
            {i}
          </div>
        </div>
      ))}
      <div className="h-8 min-w-[32px] bg-zinc-900/20 border border-dashed border-zinc-800 flex items-center justify-center text-zinc-700 cursor-pointer hover:bg-zinc-800/30 transition-colors">
        +
      </div>
    </footer>
  );
};
