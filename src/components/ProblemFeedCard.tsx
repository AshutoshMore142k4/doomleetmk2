import { useState } from 'react';
import { DifficultyBadge } from './DifficultyBadge';
import { CodeBlock } from './CodeBlock';
import { Problem } from '@/lib/problems-data';
import { cn } from '@/lib/utils';
import { Star, Bookmark, Code2, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

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
        <div className="p-6 pr-14">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-3">{problem.title}</h2>
          
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
              {showCode ? `Hide ${functionName}()` : `View ${functionName}()`}
              {showCode ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {showCode && (
              <CodeBlock code={problem.solutionCode} />
            )}
          </div>

          {/* Footer Badges */}
          <div className="flex items-center gap-2 mt-6">
            <DifficultyBadge difficulty={problem.difficulty} />
            <span className="px-2.5 py-0.5 text-xs rounded bg-secondary text-secondary-foreground">
              {problem.category}
            </span>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3">
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
