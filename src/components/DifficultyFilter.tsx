import { cn } from '@/lib/utils';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface DifficultyFilterProps {
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (difficulty: Difficulty | null) => void;
}

export function DifficultyFilter({ selectedDifficulty, onSelectDifficulty }: DifficultyFilterProps) {
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelectDifficulty(null)}
        className={cn(
          'px-3 py-1.5 text-sm rounded border transition-all duration-200',
          selectedDifficulty === null
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
        )}
      >
        All
      </button>
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onSelectDifficulty(difficulty)}
          className={cn(
            'px-3 py-1.5 text-sm rounded border transition-all duration-200',
            selectedDifficulty === difficulty
              ? difficulty === 'Easy'
                ? 'bg-easy text-primary-foreground border-easy'
                : difficulty === 'Medium'
                ? 'bg-medium text-primary-foreground border-medium'
                : 'bg-hard text-primary-foreground border-hard'
              : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
          )}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}
