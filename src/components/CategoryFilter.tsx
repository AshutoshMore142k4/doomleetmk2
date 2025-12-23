import { cn } from '@/lib/utils';
import { categories } from '@/lib/problems-data';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'px-3 py-1.5 text-sm rounded border transition-all duration-200',
          selectedCategory === null
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            'px-3 py-1.5 text-sm rounded border transition-all duration-200',
            selectedCategory === category
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
