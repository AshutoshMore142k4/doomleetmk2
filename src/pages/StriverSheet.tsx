import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { mergedStriverTopics } from '@/lib/strivers-sde-data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Code2, Star, Bookmark, Lightbulb, Eye } from 'lucide-react';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { CodeBlock } from '@/components/CodeBlock';

function StriverProblemCard({ problem }: { problem: import('@/lib/strivers-sde-data').StriverProblem }) {
  const [showCode, setShowCode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const toggleHint = (index: number) => {
    setRevealedHints(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="group/card relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-lg shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15 hover:bg-primary/[0.06]">
        <span className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-60 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
        <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />
        <span className="absolute inset-x-0 bottom-0 h-px opacity-20 group-hover/card:opacity-50 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />

        <div className="p-6 pr-14">
          <h2 className="text-xl font-semibold mb-3">{problem.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{problem.description}</p>

          {/* Approach */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Approach</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{problem.approach}</p>
          </section>

          {/* Complexity */}
          <div className="flex items-center gap-1 text-sm mb-6">
            <span className="text-muted-foreground">Time:</span>
            <span className="text-primary font-mono">{problem.timeComplexity}</span>
            <span className="text-muted-foreground mx-2">|</span>
            <span className="text-muted-foreground">Space:</span>
            <span className="text-primary font-mono">{problem.spaceComplexity}</span>
            {problem.leetcodeNumber && (
              <>
                <span className="text-muted-foreground mx-2">|</span>
                <span className="text-muted-foreground">LC #{problem.leetcodeNumber}</span>
              </>
            )}
          </div>

          {/* Code Section */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
            >
              <Code2 className="h-4 w-4" />
              {showCode ? 'Hide' : 'View'}
            </button>
            {showCode && <CodeBlock code={problem.solutionCode} />}
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="border-t border-border pt-4 mb-6 space-y-4">
              {/* Constraints */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Constraints</h4>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-primary font-mono">{problem.timeComplexity}</span>
                  <span className="text-muted-foreground mx-2">|</span>
                  <span className="text-muted-foreground">Space:</span>
                  <span className="text-primary font-mono">{problem.spaceComplexity}</span>
                </div>
              </div>

              {/* Hints - Tap to Reveal */}
              {problem.hints.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 text-primary" />
                    Hints
                  </h4>
                  <div className="space-y-2">
                    {problem.hints.slice(0, 2).map((hint, i) => (
                      <button
                        key={i}
                        onClick={() => toggleHint(i)}
                        className="w-full text-left"
                      >
                        {revealedHints.includes(i) ? (
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm text-foreground">
                            {hint}
                          </div>
                        ) : (
                          <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm text-muted-foreground flex items-center gap-2">
                            <Eye className="h-3.5 w-3.5" />
                            Tap to reveal Hint {i + 1}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Badges */}
          <div className="flex items-center gap-2 mt-6">
            <DifficultyBadge difficulty={problem.difficulty} />
            <span className="px-2.5 py-0.5 text-xs rounded bg-secondary text-secondary-foreground">
              {problem.topic}
            </span>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isStarred ? "bg-medium/20 text-medium" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Star className={cn("h-5 w-5", isStarred && "fill-current")} />
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showDetails ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isBookmarked ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showCode ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Code2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StriverSheet() {
  const [activeTopic, setActiveTopic] = useState(0);
  const topicRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToTopic = (index: number) => {
    setActiveTopic(index);
    topicRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const topics = mergedStriverTopics;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="sticky top-14 z-40 bg-background/70 backdrop-blur-2xl border-b border-primary/10">
        <div className="container px-4 py-3">
          <h1 className="text-lg font-semibold mb-2">Striver's SDE Sheet</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {topics.map((t, i) => (
              <button
                key={i}
                onClick={() => scrollToTopic(i)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-full border whitespace-nowrap transition-all shrink-0 backdrop-blur-md',
                  activeTopic === i
                    ? 'bg-primary/90 text-primary-foreground border-primary/60 shadow-md shadow-primary/20'
                    : 'bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary/70 hover:border-primary/30'
                )}
              >
                {t.name} ({t.problems.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container px-4 py-6">
        {topics.map((t, i) => (
          <div
            key={i}
            ref={el => topicRefs.current[i] = el}
            className="mb-12 scroll-mt-36"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold">{t.name}</h2>
              <span className="text-sm text-muted-foreground">({t.problems.length} problems)</span>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {t.problems.map(problem => (
                <StriverProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
