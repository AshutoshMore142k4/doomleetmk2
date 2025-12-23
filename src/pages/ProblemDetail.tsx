import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { CodeBlock } from '@/components/CodeBlock';
import { problemsData } from '@/lib/problems-data';
import { ArrowLeft, ExternalLink, Clock, HardDrive, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo } from 'react';

export default function ProblemDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const problem = problemsData.find(p => p.slug === slug);
  
  const navigation = useMemo(() => {
    if (!problem) return { prev: null, next: null };
    const currentIndex = problemsData.findIndex(p => p.id === problem.id);
    return {
      prev: currentIndex > 0 ? problemsData[currentIndex - 1] : null,
      next: currentIndex < problemsData.length - 1 ? problemsData[currentIndex + 1] : null,
    };
  }, [problem]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold mb-2">Problem Not Found</h1>
            <p className="text-muted-foreground mb-4">The problem you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/problems">Back to Problems</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6">
        {/* Back Navigation */}
        <Link
          to="/problems"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Problems
        </Link>

        {/* Problem Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-muted-foreground">#{problem.leetcodeNumber}</span>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              <h1 className="text-2xl font-semibold mb-1">{problem.title}</h1>
              <p className="text-muted-foreground">{problem.category}</p>
            </div>
            <a
              href={`https://leetcode.com/problems/${problem.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View on LeetCode
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="description" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="approach">Approach</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            {/* Problem Description */}
            <section>
              <h2 className="text-lg font-medium mb-3">Problem</h2>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </section>

            {/* Test Cases */}
            <section>
              <h2 className="text-lg font-medium mb-3">Examples</h2>
              <div className="space-y-4">
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className="rounded border border-border bg-card p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Example {index + 1}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Input: </span>
                        <code className="text-sm font-mono">{testCase.input}</code>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Output: </span>
                        <code className="text-sm font-mono">{testCase.output}</code>
                      </div>
                      {testCase.explanation && (
                        <div>
                          <span className="text-sm text-muted-foreground">Explanation: </span>
                          <span className="text-sm">{testCase.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hints */}
            {problem.hints.length > 0 && (
              <section>
                <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-medium" />
                  Hints
                </h2>
                <ul className="space-y-2">
                  {problem.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary font-medium">{index + 1}.</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </TabsContent>

          <TabsContent value="approach" className="space-y-6">
            {/* Approach */}
            <section>
              <h2 className="text-lg font-medium mb-3">Approach</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {problem.approach}
              </p>
            </section>

            {/* Complexity */}
            <section>
              <h2 className="text-lg font-medium mb-3">Complexity Analysis</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-4 rounded border border-border bg-card">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Complexity</p>
                    <p className="font-mono font-medium">{problem.timeComplexity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded border border-border bg-card">
                  <HardDrive className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Space Complexity</p>
                    <p className="font-mono font-medium">{problem.spaceComplexity}</p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="solution" className="space-y-6">
            {/* Solution Code */}
            <section>
              <h2 className="text-lg font-medium mb-3">Solution (TypeScript)</h2>
              <CodeBlock code={problem.solutionCode} />
            </section>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          {navigation.prev ? (
            <Link
              to={`/problem/${navigation.prev.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{navigation.prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          
          {navigation.next ? (
            <Link
              to={`/problem/${navigation.next.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">{navigation.next.title}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
