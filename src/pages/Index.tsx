import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/ui/hero-section-dark';
import { Code2, CheckCircle2, BookOpen, Zap, ArrowRight, Layers, Brain } from 'lucide-react';
import { problemsData, categories } from '@/lib/problems-data';
import { mergedStriverTopics } from '@/lib/strivers-sde-data';
import { useMemo } from 'react';

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-lg shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-300 hover:border-primary/25 hover:shadow-primary/10 hover:bg-primary/[0.06] ${className ?? ''}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Index() {
  const stats = useMemo(() => {
    const easy = problemsData.filter(p => p.difficulty === 'Easy').length;
    const medium = problemsData.filter(p => p.difficulty === 'Medium').length;
    const hard = problemsData.filter(p => p.difficulty === 'Hard').length;
    const striverTotal = mergedStriverTopics.reduce((acc, t) => acc + t.problems.length, 0);
    return { easy, medium, hard, total: problemsData.length, categories: categories.length, striverTotal };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="DSA Interview Prep"
        subtitle={{
          regular: "Master coding interviews with ",
          gradient: "NeetCode 150 & Striver's SDE Sheet",
        }}
        description="A curated collection of the most important LeetCode problems, organized by pattern and difficulty. Each problem includes detailed C++ solutions, approaches, and complexity analysis."
        ctaText="Start Practicing"
        ctaHref="/problems"
        secondaryCtaText="Striver's Sheet"
        secondaryCtaHref="/striver"
        gridOptions={{
          angle: 65,
          opacity: 0.3,
          cellSize: 50,
          darkLineColor: "hsl(270 70% 55% / 0.08)",
        }}
      />

      {/* Stats Section */}
      <section className="border-b border-border/40 py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: stats.total, label: 'NeetCode Problems', color: 'text-primary' },
              { value: stats.striverTotal, label: 'Striver Problems', color: 'text-primary' },
              { value: stats.categories, label: 'Topic Patterns', color: 'text-primary' },
              { value: `${stats.easy + stats.medium + stats.hard}+`, label: 'C++ Solutions', color: 'text-primary' },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border/40 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Two Complete Problem Sets</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Everything you need to ace your technical interviews
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">NeetCode 150</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {stats.total} handpicked problems across {stats.categories} patterns. Scrollable feed with shuffle, filtering by difficulty, and instant code reveal.
              </p>
              <Button asChild size="sm" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
                <Link to="/problems">
                  Explore NeetCode <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Striver's SDE Sheet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {stats.striverTotal} problems organized by {mergedStriverTopics.length} unified topics. Topic-wise scrolling with sticky navigation pills.
              </p>
              <Button asChild size="sm" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
                <Link to="/striver">
                  Explore Striver <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border/40 py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, title: 'Structured Learning', desc: `Problems organized by ${stats.categories} key patterns. Master each pattern systematically.` },
              { icon: Zap, title: 'Detailed C++ Solutions', desc: 'Each problem includes syntax-highlighted C++ code with approach explanations and complexity analysis.' },
              { icon: CheckCircle2, title: 'Track Progress', desc: 'Sign in to track your progress, mark problems as completed, and stay motivated.' },
            ].map((feature, i) => (
              <GlassCard key={i} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="border-b border-border/40 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Topics Covered</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            From fundamental data structures to advanced algorithms
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 text-sm rounded-full border border-primary/15 bg-primary/[0.04] text-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/[0.08]"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <GlassCard className="max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">
              Begin your journey to mastering coding interviews today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
                <Link to="/problems">
                  View All Problems
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 border-primary/20 hover:bg-primary/10">
                <Link to="/auth">Create Account</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for developers preparing for technical interviews
          </p>
        </div>
      </footer>
    </div>
  );
}
