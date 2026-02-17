import { cn } from '@/lib/utils';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export function NeonCard({ children, className }: NeonCardProps) {
  return (
    <div
      className={cn(
        "group/card relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-lg shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15 hover:bg-primary/[0.06]",
        className
      )}
    >
      {/* Top neon line */}
      <span className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-60 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
      {/* Inner glow gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />
      {/* Content */}
      <div className="relative">{children}</div>
      {/* Bottom neon line */}
      <span className="absolute inset-x-0 bottom-0 h-px opacity-20 group-hover/card:opacity-50 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
    </div>
  );
}
