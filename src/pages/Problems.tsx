import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProblemFeedCard } from '@/components/ProblemFeedCard';
import { problemsData } from '@/lib/problems-data';
import { Shuffle, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

// Shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Problems() {
  const [shuffledProblems, setShuffledProblems] = useState(() => shuffleArray(problemsData));
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const reshuffle = () => {
    setShuffledProblems(shuffleArray(problemsData));
  };

  const filteredProblems = useMemo(() => {
    if (!selectedDifficulty) return shuffledProblems;
    return shuffledProblems.filter(p => p.difficulty === selectedDifficulty);
  }, [shuffledProblems, selectedDifficulty]);

  const stats = useMemo(() => {
    const easy = problemsData.filter(p => p.difficulty === 'Easy').length;
    const medium = problemsData.filter(p => p.difficulty === 'Medium').length;
    const hard = problemsData.filter(p => p.difficulty === 'Hard').length;
    return { easy, medium, hard, total: problemsData.length };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Sticky Controls */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Feed</h1>
              <span className="text-sm text-muted-foreground">
                {filteredProblems.length} problems
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "gap-2",
                  showFilters && "bg-secondary"
                )}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={reshuffle}
                className="gap-2"
              >
                <Shuffle className="h-4 w-4" />
                <span className="hidden sm:inline">Shuffle</span>
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="pt-3 pb-1 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={cn(
                  'px-3 py-1 text-sm rounded border transition-all',
                  selectedDifficulty === null
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
                )}
              >
                All
              </button>
              
              <button
                onClick={() => setSelectedDifficulty('Easy')}
                className={cn(
                  'px-3 py-1 text-sm rounded border transition-all',
                  selectedDifficulty === 'Easy'
                    ? 'bg-easy text-primary-foreground border-easy'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-easy/50'
                )}
              >
                Easy ({stats.easy})
              </button>
              
              <button
                onClick={() => setSelectedDifficulty('Medium')}
                className={cn(
                  'px-3 py-1 text-sm rounded border transition-all',
                  selectedDifficulty === 'Medium'
                    ? 'bg-medium text-primary-foreground border-medium'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-medium/50'
                )}
              >
                Medium ({stats.medium})
              </button>
              
              <button
                onClick={() => setSelectedDifficulty('Hard')}
                className={cn(
                  'px-3 py-1 text-sm rounded border transition-all',
                  selectedDifficulty === 'Hard'
                    ? 'bg-hard text-primary-foreground border-hard'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-hard/50'
                )}
              >
                Hard ({stats.hard})
              </button>

              {selectedDifficulty && (
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Feed */}
      <main className="container px-4 py-6">
        <div className="space-y-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemFeedCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No problems found</p>
              <Button 
                variant="link" 
                onClick={() => setSelectedDifficulty(null)}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {filteredProblems.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              You've seen all {filteredProblems.length} problems
            </p>
            <Button variant="secondary" onClick={reshuffle} className="gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle & Start Over
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
