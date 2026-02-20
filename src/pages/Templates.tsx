import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CodeBlock } from '@/components/CodeBlock';
import { templatesData } from '@/lib/templates-data';
import { ChevronDown, ChevronUp, Lightbulb, Zap, BookOpen, Clock, HardDrive, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { SignInOverlay } from '@/components/SignInOverlay';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useTemplateProgress, TemplateStatus } from '@/hooks/useTemplateProgress';

export default function Templates() {
  usePageTitle('Algorithm Templates');
  const { user, loading } = useAuth();
  const [expandedTemplates, setExpandedTemplates] = useState<Record<string, boolean>>({});
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { getStatus, cycleStatus, stats } = useTemplateProgress();

  const statusConfig: Record<TemplateStatus, { icon: typeof Circle; label: string; color: string; bg: string }> = {
    none: { icon: Circle, label: 'Not started', color: 'text-muted-foreground/40', bg: 'hover:bg-muted/50' },
    learned: { icon: CheckCircle2, label: 'Learned', color: 'text-green-400', bg: 'bg-green-500/10' },
    'needs-review': { icon: AlertCircle, label: 'Needs review', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 56 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTemplate = (key: string) => {
    setExpandedTemplates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToCategory = (slug: string) => {
    categoryRefs.current[slug]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isLocked = !loading && !user;
  const FREE_CATEGORIES = 1; // Show first category freely

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="container max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">C++ Templates</h1>
          <p className="text-muted-foreground">Battle-tested patterns for LeetCode. Tap any template to expand code, tips & when to use.</p>
        </div>

        {/* Progress stats bar */}
        {(stats.learned > 0 || stats.needsReview > 0) && (
          <div className="flex items-center gap-4 mb-4 px-3 py-2 rounded-xl border border-border bg-card/50 text-xs">
            <div className="flex items-center gap-1.5 text-green-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="font-medium">{stats.learned}</span>
              <span className="text-muted-foreground">learned</span>
            </div>
            <div className="flex items-center gap-1.5 text-yellow-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span className="font-medium">{stats.needsReview}</span>
              <span className="text-muted-foreground">to review</span>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className={`flex flex-wrap gap-2 mb-8 sticky z-40 bg-background/80 backdrop-blur-xl py-3 -mx-4 px-4 transition-all duration-300 ${hidden ? 'top-0 -translate-y-full' : 'top-14 translate-y-0'}`}>
          {templatesData.map(cat => (
            <button
              key={cat.slug}
              onClick={() => scrollToCategory(cat.slug)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {templatesData.slice(0, isLocked ? FREE_CATEGORIES : templatesData.length).map(category => (
            <div
              key={category.slug}
              ref={el => { categoryRefs.current[category.slug] = el; }}
              className="scroll-mt-32"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {category.name}
              </h2>

              <div className="space-y-3">
                {category.templates.map((template, tIdx) => {
                  const key = `${category.slug}-${tIdx}`;
                  const isExpanded = expandedTemplates[key];

                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-border bg-card/50 overflow-hidden"
                    >
                      <div className="flex items-center">
                        {/* Status toggle button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); cycleStatus(key); }}
                          className={cn(
                            'shrink-0 flex items-center justify-center w-9 h-full border-r border-border/50 transition-colors',
                            statusConfig[getStatus(key)].bg
                          )}
                          title={`Status: ${statusConfig[getStatus(key)].label} (click to change)`}
                        >
                          {(() => {
                            const StatusIcon = statusConfig[getStatus(key)].icon;
                            return <StatusIcon className={cn('h-4 w-4', statusConfig[getStatus(key)].color)} />;
                          })()}
                        </button>

                        <button
                          onClick={() => toggleTemplate(key)}
                          className="flex-1 flex items-center justify-between px-4 py-3 text-left hover:bg-primary/[0.04] transition-colors"
                        >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-medium text-sm">{template.title}</span>
                          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/[0.06] border border-primary/10">
                              <Clock className="h-3 w-3 text-primary" />
                              {template.timeComplexity}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/50 border border-border">
                              <HardDrive className="h-3 w-3" />
                              {template.spaceComplexity}
                            </span>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4">
                          <div className="flex sm:hidden items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/[0.06] border border-primary/10">
                              <Clock className="h-3 w-3 text-primary" />
                              {template.timeComplexity}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/50 border border-border">
                              <HardDrive className="h-3 w-3" />
                              {template.spaceComplexity}
                            </span>
                          </div>
                          <CodeBlock code={template.code} language="cpp" />
                          <div className="rounded-lg border border-primary/10 bg-primary/[0.03] p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                              <Zap className="h-3.5 w-3.5" />
                              When to Use
                            </h4>
                            <ul className="space-y-1">
                              {template.whenToUse.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-lg border border-border bg-secondary/30 p-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2 flex items-center gap-1.5">
                              <Lightbulb className="h-3.5 w-3.5" />
                              Tips & Tricks
                            </h4>
                            <ul className="space-y-1">
                              {template.tips.map((tip, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-foreground/50 mt-1">→</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Blurred teaser + sign-in overlay */}
          {isLocked && templatesData.length > FREE_CATEGORIES && (
            <div className="relative">
              <div className="blur-md select-none pointer-events-none space-y-10">
                {templatesData.slice(FREE_CATEGORIES, FREE_CATEGORIES + 1).map(category => (
                  <div key={category.slug}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      {category.name}
                    </h2>
                    <div className="space-y-3">
                      {category.templates.slice(0, 3).map((template, tIdx) => (
                        <div key={tIdx} className="rounded-xl border border-border bg-card/50 px-4 py-3">
                          <span className="font-medium text-sm">{template.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <SignInOverlay />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
