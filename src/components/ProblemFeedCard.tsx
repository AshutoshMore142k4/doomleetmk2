import { useState } from 'react';
import { DifficultyBadge } from './DifficultyBadge';
import { CodeBlock } from './CodeBlock';
import { Problem } from '@/lib/problems-data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Clock, HardDrive, Lightbulb, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProblemFeedCardProps {
  problem: Problem;
}

export function ProblemFeedCard({ problem }: ProblemFeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={cn(
        "border border-border bg-card rounded overflow-hidden transition-all duration-300",
        isExpanded && "ring-1 ring-primary/30"
      )}>
        {/* Header - Always visible */}
        <div 
          className="p-5 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">#{problem.leetcodeNumber}</span>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
            <a
              href={`https://leetcode.com/problems/${problem.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <h2 className="text-lg font-semibold mb-2">{problem.title}</h2>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {problem.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded">
              {problem.category}
            </span>
            <button 
              className="flex items-center gap-1 text-sm text-primary hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <>
                  <span>Hide Solution</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show Solution</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-border">
            <Tabs defaultValue="examples" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="examples" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Examples
                </TabsTrigger>
                <TabsTrigger 
                  value="hints"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Hints
                </TabsTrigger>
                <TabsTrigger 
                  value="approach"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Approach
                </TabsTrigger>
                <TabsTrigger 
                  value="solution"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                >
                  Solution
                </TabsTrigger>
              </TabsList>

              <div className="p-5">
                <TabsContent value="examples" className="mt-0 space-y-4">
                  {problem.testCases.map((testCase, index) => (
                    <div key={index} className="rounded border border-border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Example {index + 1}</p>
                      <div className="space-y-1.5 text-sm">
                        <div>
                          <span className="text-muted-foreground">Input: </span>
                          <code className="font-mono text-foreground">{testCase.input}</code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Output: </span>
                          <code className="font-mono text-foreground">{testCase.output}</code>
                        </div>
                        {testCase.explanation && (
                          <div className="text-muted-foreground text-xs mt-2">
                            {testCase.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="hints" className="mt-0">
                  {problem.hints.length > 0 ? (
                    <div className="space-y-3">
                      {problem.hints.map((hint, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded bg-secondary/30 border border-border">
                          <Lightbulb className="h-4 w-4 text-medium shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{hint}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No hints available for this problem.</p>
                  )}
                </TabsContent>

                <TabsContent value="approach" className="mt-0 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {problem.approach}
                  </p>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 rounded border border-border bg-secondary/30">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="text-sm font-mono">{problem.timeComplexity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded border border-border bg-secondary/30">
                      <HardDrive className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Space</p>
                        <p className="text-sm font-mono">{problem.spaceComplexity}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="mt-0">
                  <CodeBlock code={problem.solutionCode} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
