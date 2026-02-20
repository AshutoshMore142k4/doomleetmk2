import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { problemMappings } from '@/lib/problem-mapper-data';
import { Search, ExternalLink, ArrowRight, Hash, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { SignInOverlay } from '@/components/SignInOverlay';

const difficultyColor = {
  Easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function ProblemMapper() {
  usePageTitle('Problem Mapper');
  const { user, loading } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const isLocked = !loading && !user;
  const FREE_RESULTS = 10;

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    problemMappings.forEach(p => {
      cats.set(p.templateCategory, (cats.get(p.templateCategory) || 0) + 1);
    });
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    let results = problemMappings;

    if (selectedCategory) {
      results = results.filter(p => p.templateCategory === selectedCategory);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const num = parseInt(q);
      results = results.filter(p =>
        (!isNaN(num) && p.lcNumber === num) ||
        p.title.toLowerCase().includes(q) ||
        p.templateName.toLowerCase().includes(q) ||
        p.hint.toLowerCase().includes(q) ||
        p.lcNumber.toString().includes(q)
      );
    }

    return results.sort((a, b) => a.lcNumber - b.lcNumber);
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <div className="container max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-primary" />
            Problem Mapper
          </h1>
          <p className="text-muted-foreground">
            Search by LeetCode number or name → instantly find which template to use.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by LC# (e.g. 200) or problem name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card/50 pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
              !selectedCategory
                ? 'bg-primary/15 border-primary/30 text-primary'
                : 'bg-card border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30'
            )}
          >
            All ({problemMappings.length})
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
                selectedCategory === cat
                  ? 'bg-primary/15 border-primary/30 text-primary'
                  : 'bg-card border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30'
              )}
            >
              {cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} ({count})
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          {filtered.length} problem{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Results */}
        <div className="space-y-2">
          {filtered.slice(0, isLocked ? FREE_RESULTS : filtered.length).map(problem => (
            <div
              key={`${problem.lcNumber}-${problem.templateCategory}`}
              className="rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-colors px-4 py-3 flex items-center gap-3"
            >
              {/* LC Number */}
              <div className="flex items-center gap-1 shrink-0 w-16">
                <Hash className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-sm font-mono font-semibold text-foreground">
                  {problem.lcNumber}
                </span>
              </div>

              {/* Problem info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium truncate">{problem.title}</span>
                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0', difficultyColor[problem.difficulty])}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{problem.hint}</p>
              </div>

              {/* Template link */}
              <Link
                to={`/templates#${problem.templateCategory}`}
                className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <ArrowRight className="h-3 w-3" />
                <span className="hidden sm:inline">{problem.templateName}</span>
                <span className="sm:hidden">View</span>
              </Link>

              {/* LeetCode link */}
              <a
                href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ +/g, '-')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 h-7 w-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                title="Open on LeetCode"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No problems found for "{query}"</p>
              <p className="text-xs mt-1 opacity-60">Try a LeetCode number or problem name</p>
            </div>
          )}

          {/* Blurred teaser + sign-in overlay */}
          {isLocked && filtered.length > FREE_RESULTS && (
            <div className="relative mt-4">
              <div className="blur-md select-none pointer-events-none space-y-2">
                {filtered.slice(FREE_RESULTS, FREE_RESULTS + 4).map((problem, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card/50 px-4 py-3 flex items-center gap-3"
                  >
                    <div className="flex items-center gap-1 shrink-0 w-16">
                      <Hash className="h-3 w-3 text-muted-foreground/50" />
                      <span className="text-sm font-mono font-semibold">{problem.lcNumber}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium">{problem.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <SignInOverlay />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
