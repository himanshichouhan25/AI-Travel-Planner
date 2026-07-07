const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg shadow-xl border border-white/50 dark:border-slate-800/80 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;