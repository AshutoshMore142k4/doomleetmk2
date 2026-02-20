import { useState } from 'react';
import { Header } from '@/components/Header';
import { comparisonGroups, DecisionNode } from '@/lib/comparison-data';
import { GitCompare, ArrowRight, RotateCcw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePageTitle } from '@/hooks/usePageTitle';

type TreePath = { question: string; answer: string }[];

function DecisionTreeWalker({ tree, onReset }: { tree: DecisionNode; onReset: () => void }) {
  const [path, setPath] = useState<TreePath>([]);
  const [current, setCurrent] = useState<DecisionNode | string>(tree);

  const handleChoice = (answer: string, next: DecisionNode | string) => {
    if (typeof current === 'string') return;
    setPath(prev => [...prev, { question: current.question, answer }]);
    setCurrent(next);
  };

  const reset = () => {
    setPath([]);
    setCurrent(tree);
    onReset();
  };

  const isLeaf = typeof current === 'string';

  return (
    <div className="space-y-3">
      {/* Breadcrumb of past choices */}
      {path.map((step, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground opacity-60">
          <span className="shrink-0 mt-0.5">Q:</span>
          <span>{step.question}</span>
          <ArrowRight className="h-3 w-3 shrink-0 mt-0.5" />
          <span className="text-primary font-medium">{step.answer}</span>
        </div>
      ))}

      {isLeaf ? (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Use this algorithm:</p>
              <p className="text-lg font-semibold text-primary">{current}</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Restart
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <p className="text-sm font-medium mb-3">{current.question}</p>
          <div className="flex flex-wrap gap-2">
            {current.options ? (
              current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt.label, opt.next)}
                  className="px-4 py-2 rounded-lg border border-border bg-secondary/50 text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
                >
                  {opt.label}
                </button>
              ))
            ) : (
              <>
                {current.yes && (
                  <button
                    onClick={() => handleChoice('Yes', current.yes!)}
                    className="px-4 py-2 rounded-lg border border-green-500/20 bg-green-500/5 text-sm font-medium text-green-400 hover:bg-green-500/15 transition-all"
                  >
                    Yes
                  </button>
                )}
                {current.no && (
                  <button
                    onClick={() => handleChoice('No', current.no!)}
                    className="px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-medium text-red-400 hover:bg-red-500/15 transition-all"
                  >
                    No
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Compare() {
  usePageTitle('Compare Algorithms');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ 'shortest-path': true });
  const [resetKeys, setResetKeys] = useState<Record<string, number>>({});

  const toggleGroup = (slug: string) => {
    setExpandedGroups(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <GitCompare className="h-7 w-7 text-primary" />
            Compare Algorithms
          </h1>
          <p className="text-muted-foreground">
            Interactive decision trees to pick the right algorithm. Answer questions → get the answer.
          </p>
        </div>

        <div className="space-y-4">
          {comparisonGroups.map(group => {
            const isExpanded = expandedGroups[group.slug];
            return (
              <div key={group.slug} className="rounded-xl border border-border bg-card/50 overflow-hidden">
                <button
                  onClick={() => toggleGroup(group.slug)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/[0.04] transition-colors"
                >
                  <div>
                    <h2 className="text-base font-semibold">{group.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-5">
                    {/* Comparison table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Algorithm</th>
                            <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Best For</th>
                            <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Time</th>
                            <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Space</th>
                            <th className="text-left py-2 font-semibold text-muted-foreground">Limitation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.algorithms.map(algo => (
                            <tr key={algo.name} className="border-b border-border/50 last:border-0">
                              <td className="py-2 pr-3 font-medium text-primary">{algo.name}</td>
                              <td className="py-2 pr-3 text-muted-foreground">{algo.bestFor}</td>
                              <td className="py-2 pr-3 font-mono text-foreground/80">{algo.time}</td>
                              <td className="py-2 pr-3 font-mono text-foreground/80">{algo.space}</td>
                              <td className="py-2 text-muted-foreground/70">{algo.limitation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Decision tree */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Decision Tree — answer step by step
                      </h3>
                      <DecisionTreeWalker
                        key={resetKeys[group.slug] || 0}
                        tree={group.decisionTree}
                        onReset={() =>
                          setResetKeys(prev => ({
                            ...prev,
                            [group.slug]: (prev[group.slug] || 0) + 1,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
