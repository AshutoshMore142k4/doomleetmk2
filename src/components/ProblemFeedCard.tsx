import { useState } from 'react';
import { DifficultyBadge } from './DifficultyBadge';
import { CodeBlock } from './CodeBlock';
import { Problem } from '@/lib/problems-data';
import { getConstraints } from '@/lib/constraints-data';
import { cn } from '@/lib/utils';
import { Star, Bookmark, Code2, ChevronDown, ChevronUp, Lightbulb, Eye } from 'lucide-react';

interface ProblemFeedCardProps {
  problem: Problem;
}

// Helper to parse and highlight inline code in text
function HighlightedText({ text }: { text: string }) {
  // Match code wrapped in backticks or specific patterns
  const parts = text.split(/(`[^`]+`)/g);
  
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-secondary text-primary font-mono text-sm">
              {part.slice(1, -1)}
            </code>
          );
        }
        // Also highlight specific keywords
        const highlighted = part.split(/(\b(?:true|false|null|undefined|return|if|else|for|while)\b)/g);
        return highlighted.map((word, j) => {
          if (['true', 'false', 'null', 'undefined', 'return', 'if', 'else', 'for', 'while'].includes(word)) {
            return (
              <code key={`${i}-${j}`} className="px-1 py-0.5 rounded bg-secondary text-primary font-mono text-sm">
                {word}
              </code>
            );
          }
          return <span key={`${i}-${j}`}>{word}</span>;
        });
      })}
    </>
  );
}

// Parse approach text into algorithm steps
function parseAlgorithmSteps(approach: string): string[] {
  // Split by periods or numbered patterns
  const sentences = approach
    .split(/(?:\.\s+|\n)/)
    .filter(s => s.trim().length > 0)
    .map(s => s.trim());
  
  return sentences;
}

// Generate key insights from hints and approach
function generateInsights(problem: Problem): string[] {
  const insights: string[] = [];
  
  // Add hints as insights
  problem.hints.forEach(hint => {
    insights.push(hint);
  });
  
  // Add complexity insight
  if (problem.timeComplexity && problem.spaceComplexity) {
    insights.push(`Time complexity is ${problem.timeComplexity}, Space is ${problem.spaceComplexity}`);
  }
  
  return insights.slice(0, 3);
}

export function ProblemFeedCard({ problem }: ProblemFeedCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const toggleHint = (index: number) => {
    setRevealedHints(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  const algorithmSteps = parseAlgorithmSteps(problem.approach);
  const keyInsights = generateInsights(problem);
  const functionName = problem.solutionCode.match(/(?:int|void|bool|string|double|vector|ListNode|TreeNode|Node|long long|float|char|unsigned|auto|pair)\s*[<\[\]&*\s,\w>]*\s+(\w+)\s*\(/)?.[1] || problem.solutionCode.match(/class\s+(\w+)/)?.[1] || 'solution';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="group/card relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-lg shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15 hover:bg-primary/[0.06]">
        {/* Top neon line */}
        <span className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-60 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
        <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />
        {/* Bottom neon line */}
        <span className="absolute inset-x-0 bottom-0 h-px opacity-20 group-hover/card:opacity-50 transition-all duration-500 ease-in-out bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
        {/* Main Content */}
        <div className="p-4 sm:p-6 sm:pr-14">
          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{problem.title}</h2>
          
          {/* Description with highlighted terms */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            <HighlightedText text={problem.description} />
          </p>

          {/* Algorithm Section */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Algorithm</h3>
            <ol className="space-y-2">
              {algorithmSteps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="text-muted-foreground shrink-0">{index + 1}.</span>
                  <span className="text-muted-foreground">
                    <HighlightedText text={step} />
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Key Insights Section */}
          {keyInsights.length > 0 && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Key Insights</h3>
              <ul className="space-y-2">
                {keyInsights.map((insight, index) => (
                  <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-muted-foreground">•</span>
                    <span><HighlightedText text={insight} /></span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Complexity */}
          <div className="flex items-center gap-1 text-sm mb-6">
            <span className="text-muted-foreground">Time:</span>
            <span className="text-primary font-mono">{problem.timeComplexity}</span>
            <span className="text-muted-foreground mx-2">|</span>
            <span className="text-muted-foreground">Space:</span>
            <span className="text-primary font-mono">{problem.spaceComplexity}</span>
          </div>

          {/* Code Section (Expandable) */}
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
            >
              <Code2 className="h-4 w-4" />
              {showCode ? 'Hide' : 'View'}
            </button>
            
            {showCode && (
              <CodeBlock code={problem.solutionCode} />
            )}
          </div>

          {/* Expandable Question Details */}
          {showDetails && (
            <div className="border-t border-border pt-4 mb-6 space-y-4">
              {/* Test Cases */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Test Cases</h4>
                <div className="space-y-2">
                  {problem.testCases.slice(0, 3).map((tc, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-3 text-xs font-mono space-y-1">
                      <div><span className="text-muted-foreground">Input: </span><span className="text-foreground">{tc.input}</span></div>
                      <div><span className="text-muted-foreground">Output: </span><span className="text-primary">{tc.output}</span></div>
                      {tc.explanation && (
                        <div className="text-muted-foreground italic">↳ {tc.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Constraints */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Constraints</h4>
                <ul className="space-y-1">
                  {getConstraints(problem).map((c, i) => (
                    <li key={i} className="text-xs font-mono text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <code className="px-1.5 py-0.5 rounded bg-secondary/50">{c}</code>
                    </li>
                  ))}
                </ul>
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
              {problem.category}
            </span>
          </div>
        </div>

        {/* Mobile Action Buttons - horizontal bar at bottom */}
        <div className="flex sm:hidden items-center justify-around border-t border-border px-4 py-2">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isStarred ? "text-medium" : "text-muted-foreground"
            )}
          >
            <Star className={cn("h-5 w-5", isStarred && "fill-current")} />
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showDetails ? "text-primary" : "text-muted-foreground"
            )}
          >
            {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isBookmarked ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showCode ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Code2 className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Floating Action Buttons - vertical sidebar */}
        <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-3">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isStarred 
                ? "bg-medium/20 text-medium" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Star className={cn("h-5 w-5", isStarred && "fill-current")} />
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showDetails 
                ? "bg-primary/20 text-primary" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2 rounded-full transition-colors",
              isBookmarked 
                ? "bg-primary/20 text-primary" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showCode 
                ? "bg-primary/20 text-primary" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Code2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
