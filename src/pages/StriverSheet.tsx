import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { striverTopics, StriverTopic } from '@/lib/strivers-sde-data';
import { ProblemFeedCard } from '@/components/ProblemFeedCard';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Code2, BookOpen } from 'lucide-react';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { CodeBlock } from '@/components/CodeBlock';

function StriverProblemCard({ problem }: { problem: import('@/lib/strivers-sde-data').StriverProblem }) {
  const [showCode, setShowCode] = useState(false);
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-lg ring-1 ring-foreground/[0.03]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold">{problem.title}</h3>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{problem.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Approach</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{problem.approach}</p>
        </div>

        <div className="flex items-center gap-1 text-sm mb-4">
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

        {/* Hints */}
        {problem.hints.length > 0 && (
          <div className="mb-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <BookOpen className="h-4 w-4" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
            {showHints && (
              <ul className="mt-2 space-y-1">
                {problem.hints.map((hint, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span>💡</span><span>{hint}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Code */}
        <div className="border-t border-border pt-3">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Code2 className="h-4 w-4" />
            {showCode ? 'Hide Solution' : 'View Solution (C++)'}
            {showCode ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showCode && (
            <div className="mt-3">
              <CodeBlock code={problem.solutionCode} />
            </div>
          )}
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

  const topic = striverTopics[activeTopic];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="sticky top-14 z-40 bg-background/70 backdrop-blur-xl border-b border-border/40">
        <div className="container px-4 py-3">
          <h1 className="text-lg font-semibold mb-2">Striver's SDE Sheet</h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {striverTopics.map((t, i) => (
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
        {striverTopics.map((t, i) => (
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
