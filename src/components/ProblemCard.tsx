import { Link } from 'react-router-dom';
import { DifficultyBadge } from './DifficultyBadge';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Problem } from '@/lib/problems-data';
import { cn } from '@/lib/utils';

interface ProblemCardProps {
  problem: Problem;
  isCompleted?: boolean;
  index: number;
}

export function ProblemCard({ problem, isCompleted, index }: ProblemCardProps) {
  return (
    <Link
      to={`/problem/${problem.slug}`}
      className="group block"
    >
      <div className={cn(
        "flex items-center gap-4 p-4 rounded border border-border bg-card transition-all duration-200",
        "hover:border-primary/50 hover:bg-card/80"
      )}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-secondary text-sm font-medium text-secondary-foreground">
          {index}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-card-foreground truncate group-hover:text-primary transition-colors">
              {problem.title}
            </h3>
            {isCompleted && (
              <CheckCircle2 className="h-4 w-4 text-easy shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {problem.category}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <DifficultyBadge difficulty={problem.difficulty} />
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}
