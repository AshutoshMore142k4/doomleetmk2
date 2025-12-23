import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProblemCard } from '@/components/ProblemCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { DifficultyFilter } from '@/components/DifficultyFilter';
import { problemsData } from '@/lib/problems-data';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProblems = useMemo(() => {
    return problemsData.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || problem.category === selectedCategory;
      const matchesDifficulty = !selectedDifficulty || problem.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const stats = useMemo(() => {
    const easy = problemsData.filter(p => p.difficulty === 'Easy').length;
    const medium = problemsData.filter(p => p.difficulty === 'Medium').length;
    const hard = problemsData.filter(p => p.difficulty === 'Hard').length;
    return { easy, medium, hard, total: problemsData.length };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Stats */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">NeetCode 150</h1>
          <p className="text-muted-foreground mb-4">
            Master these problems to ace your coding interviews
          </p>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-easy" />
              <span className="text-muted-foreground">Easy: {stats.easy}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-medium" />
              <span className="text-muted-foreground">Medium: {stats.medium}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-hard" />
              <span className="text-muted-foreground">Hard: {stats.hard}</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <Collapsible open={showFilters} onOpenChange={setShowFilters}>
            <CollapsibleContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Difficulty</h3>
                <DifficultyFilter
                  selectedDifficulty={selectedDifficulty}
                  onSelectDifficulty={setSelectedDifficulty}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Category</h3>
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Problem List */}
        <div className="space-y-2">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, idx) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={problem.orderIndex}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No problems found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredProblems.length} of {stats.total} problems
        </div>
      </main>
    </div>
  );
}
