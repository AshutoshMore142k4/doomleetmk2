import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Code2, CheckCircle2, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { problemsData, categories } from '@/lib/problems-data';
import { useMemo } from 'react';

export default function Index() {
  const stats = useMemo(() => {
    const easy = problemsData.filter(p => p.difficulty === 'Easy').length;
    const medium = problemsData.filter(p => p.difficulty === 'Medium').length;
    const hard = problemsData.filter(p => p.difficulty === 'Hard').length;
    return { easy, medium, hard, total: problemsData.length, categories: categories.length };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded bg-primary">
                <Code2 className="h-9 w-9 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Master Coding Interviews with NeetCode 150
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              A curated collection of the most important LeetCode problems, organized by pattern and difficulty. Each problem includes detailed explanations, approaches, and solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/problems">
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-semibold text-primary">{stats.total}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Problems</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-easy">{stats.easy}</p>
              <p className="text-sm text-muted-foreground mt-1">Easy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-medium">{stats.medium}</p>
              <p className="text-sm text-muted-foreground mt-1">Medium</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-hard">{stats.hard}</p>
              <p className="text-sm text-muted-foreground mt-1">Hard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="container px-4 py-16">
          <h2 className="text-2xl font-semibold text-center mb-12">Why NeetCode 150?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-secondary">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-2">Structured Learning</h3>
              <p className="text-sm text-muted-foreground">
                Problems organized by {stats.categories} key patterns. Master each pattern systematically.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-secondary">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-2">Detailed Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Each problem includes approach explanations, time/space complexity analysis, and clean code.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-secondary">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-medium mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Sign in to track your progress, mark problems as completed, and stay motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="border-b border-border">
        <div className="container px-4 py-16">
          <h2 className="text-2xl font-semibold text-center mb-4">Topics Covered</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            From fundamental data structures to advanced algorithms
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 text-sm rounded border border-border bg-card text-card-foreground"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="container px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-6">
              Begin your journey to mastering coding interviews today.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/problems">
                View All Problems
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for developers preparing for technical interviews
          </p>
        </div>
      </footer>
    </div>
  );
}
