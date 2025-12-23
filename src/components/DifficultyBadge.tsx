import { cn } from '@/lib/utils';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded',
        difficulty === 'Easy' && 'bg-easy/10 text-easy',
        difficulty === 'Medium' && 'bg-medium/10 text-medium',
        difficulty === 'Hard' && 'bg-hard/10 text-hard',
        className
      )}
    >
      {difficulty}
    </span>
  );
}
