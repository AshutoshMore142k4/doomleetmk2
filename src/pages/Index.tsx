import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { RetroGrid } from '@/components/ui/hero-section-dark';
import { NeonCard } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';
import { CheckCircle2, BookOpen, Zap, ArrowRight, Layers, Brain, Code2, Terminal, Sparkles } from 'lucide-react';
import { problemsData, categories } from '@/lib/problems-data';
import { mergedStriverTopics } from '@/lib/strivers-sde-data';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { usePageTitle } from '@/hooks/usePageTitle';


export default function Index() {
  usePageTitle();
  const stats = useMemo(() => {
    const easy = problemsData.filter((p) => p.difficulty === 'Easy').length;
    const medium = problemsData.filter((p) => p.difficulty === 'Medium').length;
    const hard = problemsData.filter((p) => p.difficulty === 'Hard').length;
    const striverTotal = mergedStriverTopics.reduce((acc, t) => acc + t.problems.length, 0);
    return { easy, medium, hard, total: problemsData.length, categories: categories.length, striverTotal };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <RetroGrid
          angle={65}
          cellSize={50}
          opacity={0.3}
          darkLineColor="hsl(270 70% 55% / 0.08)" />


        <div className="relative z-10 container px-4 pt-24 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Backed by badge */}
            <motion.a
              href="https://11startups.tech"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm hover:border-primary/40 hover:bg-primary/10 transition-colors">

              
              <span>Backed by</span>
              <span className="font-semibold text-primary">11startups.tech</span>
            </motion.a>


            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-[1.1]">

              Crack the code.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Land the job.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">

              NeetCode 150 + Striver's SDE Sheet — {stats.total + stats.striverTotal} problems with C++ solutions, organized by pattern and difficulty. Battle-tested templates, LC-to-pattern mapper, and side-by-side algorithm comparisons — everything you need in one place.
            </motion.p>

            <div className="mb-10" />

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3 sm:flex-row">

              <Link to="/problems">
                <NeonButton variant="solid" size="lg" className="gap-2 shadow-lg shadow-primary/25">
                  Start NeetCode 150
                </NeonButton>
              </Link>
              <Link to="/striver">
                <NeonButton size="lg" className="gap-2">
                  Striver's Sheet
                </NeonButton>
              </Link>
              <Link to="/templates">
                <NeonButton size="lg" className="gap-2">
                  Templates
                </NeonButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section aria-label="Platform statistics" className="border-b border-border/40 py-16">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
            { value: stats.total, label: 'NeetCode Problems' },
            { value: stats.striverTotal, label: 'Striver Problems' },
            { value: stats.categories, label: 'Topic Patterns' },
            { value: `${stats.easy + stats.medium + stats.hard}+`, label: 'C++ Solutions' }].
            map((stat, i) =>
            <NeonCard key={i} className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </NeonCard>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-label="Problem sets" className="border-b border-border/40 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Two Complete Problem Sets</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Everything you need to ace your technical interviews
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <NeonCard className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">NeetCode 150</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {stats.total} handpicked problems across {stats.categories} patterns. Scrollable feed with shuffle, filtering by difficulty, and instant code reveal.
              </p>
              <Link to="/problems">
                <NeonButton size="sm">
                  Explore NeetCode
                </NeonButton>
              </Link>
            </NeonCard>

            <NeonCard className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Striver's SDE Sheet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {stats.striverTotal} problems organized by {mergedStriverTopics.length} unified topics. Topic-wise scrolling with sticky navigation pills.
              </p>
              <Link to="/striver">
                <NeonButton size="sm">
                  Explore Striver
                </NeonButton>
              </Link>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section aria-label="Key features" className="border-b border-border/40 py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
            { icon: BookOpen, title: 'Structured Learning', desc: `Problems organized by ${stats.categories} key patterns. Master each pattern systematically.` },
            { icon: Zap, title: 'Detailed C++ Solutions', desc: 'Each problem includes syntax-highlighted C++ code with approach explanations and complexity analysis.' },
            { icon: CheckCircle2, title: 'Track Progress', desc: 'Sign in to track your progress, mark problems as completed, and stay motivated.' }].
            map((feature, i) =>
            <NeonCard key={i} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </NeonCard>
            )}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section aria-label="Topics covered" className="border-b border-border/40 py-16">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Topics Covered</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
            From fundamental data structures to advanced algorithms
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((category) =>
            <NeonButton key={category} size="sm" variant="ghost" neon={false} className="text-sm rounded-full border border-primary/15 bg-primary/[0.04] text-foreground hover:border-primary/30 hover:bg-primary/[0.08]">
                {category}
              </NeonButton>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section aria-label="Call to action" className="py-20">
        <div className="container px-4">
          <NeonCard className="max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">
              Begin your journey to mastering coding interviews today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/problems">
                <NeonButton variant="solid" size="lg" className="shadow-lg shadow-primary/25">
                  View All Problems
                </NeonButton>
              </Link>
              <Link to="/auth">
                <NeonButton size="lg" className="gap-2">
                  Create Account
                </NeonButton>
              </Link>
            </div>
          </NeonCard>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Built for developers preparing for technical interviews
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}