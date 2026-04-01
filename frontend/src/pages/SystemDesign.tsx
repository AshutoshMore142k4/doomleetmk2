import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { systemDesignSections, sdPracticeQuestions } from '@/lib/system-design-data';
import { cn } from '@/lib/utils';
import {
  ChevronDown, ChevronUp, Server, CheckCircle2, Lightbulb,
  ArrowRightLeft, Zap, BookOpen, FlaskConical, Database,
  Globe, List, MessageSquare, AlertTriangle, Users,
} from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAuth } from '@/hooks/useAuth';
import { SignInOverlay } from '@/components/SignInOverlay';
import type { SDTopic, SDPracticeQuestion, SDDetailedDesign } from '@/lib/system-design-data';

// ─────────────────────────────────────────────
// Topic Card
// ─────────────────────────────────────────────
function TopicCard({ topic }: { topic: SDTopic }) {
  const [open, setOpen] = useState(false);
  const [showFullGuide, setShowFullGuide] = useState(false);

  return (
    <div className="group/card relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-sm shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15 hover:bg-primary/[0.06]">
      {/* top shimmer */}
      <span className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-60 transition-all duration-500 bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
      {/* inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />
      {/* bottom shimmer */}
      <span className="absolute inset-x-0 bottom-0 h-px opacity-20 group-hover/card:opacity-50 transition-all duration-500 bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />

      {/* Clickable header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left p-5 pr-12 focus:outline-none"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-snug mb-1">{topic.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{topic.summary}</p>
          </div>
          <span className="shrink-0 mt-0.5 text-primary/60 group-hover/card:text-primary transition-colors">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </div>
      </button>

      {/* Expanded body */}
      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-primary/10 pt-4">

          {/* Explanation */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Explanation</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{topic.explanation}</p>
          </div>

          {/* Key Points */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Key Points</span>
            </div>
            <div className="space-y-1.5">
              {topic.keyPoints.map((kp, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="font-semibold text-foreground shrink-0">{kp.label}:</span>
                  <span className="text-muted-foreground">{kp.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* When to Use */}
          {topic.whenToUse && (
            <div className="bg-primary/[0.06] border border-primary/15 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">When to Use</span>
              </div>
              <p className="text-sm text-muted-foreground">{topic.whenToUse}</p>
            </div>
          )}

          {/* Trade-offs */}
          {topic.tradeoffs && (
            <div className="bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">Trade-offs</span>
              </div>
              <p className="text-sm text-muted-foreground">{topic.tradeoffs}</p>
            </div>
          )}

          {/* Real-world Example */}
          {topic.example && (
            <div className="bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Server className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">Real-World Example</span>
              </div>
              <p className="text-sm text-muted-foreground">{topic.example}</p>
            </div>
          )}

          {/* Full Study Guide */}
          {topic.detailedDesign && (
            <div>
              <button
                onClick={() => setShowFullGuide(v => !v)}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <List className="h-3.5 w-3.5" />
                {showFullGuide ? 'Collapse Full Design' : 'View Full Study Guide'}
              </button>
              {showFullGuide && <DetailedDesignView d={topic.detailedDesign} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const methodStyles: Record<string, string> = {
  GET:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  POST:   'bg-blue-500/10   text-blue-400   border-blue-500/20',
  PUT:    'bg-amber-500/10  text-amber-400  border-amber-500/20',
  PATCH:  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  DELETE: 'bg-rose-500/10   text-rose-400   border-rose-500/20',
};

const levelStyles: Record<string, string> = {
  'Mid-Level': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Senior':    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Staff':     'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <span className="text-primary">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-wide text-primary">{text}</span>
    </div>
  );
}

function DetailedDesignView({ d }: { d: SDDetailedDesign }) {
  const [openDeepDive, setOpenDeepDive] = useState<number | null>(null);

  return (
    <div className="space-y-8 border-t border-primary/10 pt-6 mt-1">

      {/* Introduction */}
      <section>
        <SectionLabel icon={<BookOpen className="h-3.5 w-3.5" />} text="Introduction" />
        <p className="text-sm text-muted-foreground leading-relaxed">{d.introduction}</p>
      </section>

      {/* Functional Requirements */}
      <section>
        <SectionLabel icon={<CheckCircle2 className="h-3.5 w-3.5" />} text="Functional Requirements" />
        <p className="text-xs text-muted-foreground mb-3 italic">We extract verbs from the problem statement to identify core operations:</p>
        <div className="space-y-2">
          {d.functionalRequirements.map((fr, i) => (
            <div key={i} className="bg-primary/[0.04] border border-primary/10 rounded-xl p-3">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary/70 italic">{fr.verb}</span>
                <span className="text-xs text-muted-foreground">→</span>
                <span className="text-xs font-semibold text-foreground">{fr.operation}</span>
              </div>
              <p className="text-xs text-muted-foreground">{fr.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scale Requirements */}
      <section>
        <SectionLabel icon={<Users className="h-3.5 w-3.5" />} text="Scale Requirements" />
        <ul className="space-y-1">
          {d.scaleRequirements.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
        {d.outOfScope && d.outOfScope.length > 0 && (
          <div className="mt-3 bg-primary/[0.04] border border-primary/10 rounded-xl p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Out of Scope</p>
            <ul className="space-y-1">
              {d.outOfScope.map((o, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Non-Functional Requirements */}
      <section>
        <SectionLabel icon={<Zap className="h-3.5 w-3.5" />} text="Non-Functional Requirements" />
        <p className="text-xs text-muted-foreground mb-3 italic">We extract adjectives and descriptive phrases to identify quality constraints:</p>
        <div className="space-y-2">
          {d.nonFunctionalRequirements.map((nfr, i) => (
            <div key={i} className="bg-primary/[0.04] border border-primary/10 rounded-xl p-3">
              <p className="text-sm font-semibold text-foreground mb-0.5">{nfr.title}</p>
              <p className="text-xs text-muted-foreground mb-1">{nfr.description}</p>
              <p className="text-xs text-primary/60 italic">{nfr.derived}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Model */}
      <section>
        <SectionLabel icon={<Database className="h-3.5 w-3.5" />} text="Data Model" />
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{d.dataModel.description}</p>
        <div className="space-y-4">
          {d.dataModel.entities.map((entity, i) => (
            <div key={i} className="border border-primary/15 rounded-xl overflow-hidden">
              <div className="bg-primary/[0.08] px-4 py-2.5 border-b border-primary/10">
                <p className="text-sm font-semibold text-foreground">{entity.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{entity.description}</p>
              </div>
              <div className="divide-y divide-primary/[0.06]">
                {entity.fields.map((f, j) => (
                  <div key={j} className="px-4 py-2 flex flex-wrap gap-x-3 gap-y-0.5 items-baseline">
                    <span className="text-xs font-mono font-semibold text-primary shrink-0">{f.name}</span>
                    <span className="text-xs text-muted-foreground/60 font-mono shrink-0">{f.type}</span>
                    <span className="text-xs text-muted-foreground">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-2.5">
          <p className="text-xs font-semibold text-muted-foreground mb-0.5">Relationships</p>
          <p className="text-xs text-muted-foreground">{d.dataModel.relationships}</p>
        </div>
      </section>

      {/* API Endpoints */}
      <section>
        <SectionLabel icon={<Globe className="h-3.5 w-3.5" />} text="API Endpoints" />
        <p className="text-xs text-muted-foreground mb-3 italic">Derived directly from functional requirements (verbs → HTTP methods):</p>
        <div className="space-y-3">
          {d.apiEndpoints.map((ep, i) => (
            <div key={i} className="border border-primary/15 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-primary/[0.04]">
                <span className={cn('text-xs font-bold font-mono px-2 py-0.5 rounded border', methodStyles[ep.method] ?? '')}>
                  {ep.method}
                </span>
                <span className="text-sm font-mono text-foreground">{ep.path}</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="text-sm text-muted-foreground">{ep.description}</p>
                {ep.requestNote && (
                  <div className="text-xs text-muted-foreground bg-primary/[0.04] rounded-lg px-3 py-2">
                    <span className="font-semibold text-foreground">Request: </span>{ep.requestNote}
                  </div>
                )}
                {ep.responseNote && (
                  <div className="text-xs text-muted-foreground bg-primary/[0.04] rounded-lg px-3 py-2">
                    <span className="font-semibold text-foreground">Response: </span>{ep.responseNote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High Level Design */}
      <section>
        <SectionLabel icon={<Server className="h-3.5 w-3.5" />} text="High-Level Design" />
        <div className="space-y-4">
          {d.highLevelDesign.map((hld, i) => (
            <div key={i} className="border border-primary/15 rounded-xl overflow-hidden">
              <div className="bg-primary/[0.08] px-4 py-3 border-b border-primary/10 flex items-center gap-2.5">
                <span className="h-6 w-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">{hld.step}</span>
                <p className="text-sm font-semibold text-foreground">{hld.title}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{hld.description}</p>
                <div className="space-y-2">
                  {hld.bullets.map((b, j) => (
                    <div key={j} className="flex gap-2 text-sm">
                      <span className="font-semibold text-foreground shrink-0 min-w-[8rem]">{b.label}</span>
                      <span className="text-muted-foreground">{b.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive Questions */}
      <section>
        <SectionLabel icon={<MessageSquare className="h-3.5 w-3.5" />} text="Deep Dive Questions" />
        <div className="space-y-2">
          {d.deepDives.map((dd, i) => (
            <div key={i} className="border border-primary/15 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenDeepDive(openDeepDive === i ? null : i)}
                className="w-full text-left px-4 py-3 flex items-start justify-between gap-3"
                aria-expanded={openDeepDive === i}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', levelStyles[dd.level] ?? '')}>
                      {dd.level}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">{dd.question}</p>
                </div>
                <span className="shrink-0 mt-1 text-primary/60">
                  {openDeepDive === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>
              {openDeepDive === i && (
                <div className="px-4 pb-4 space-y-3 border-t border-primary/10 pt-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{dd.answer}</p>
                  {dd.options && (
                    <div className="space-y-2">
                      {dd.options.map((opt, j) => (
                        <div key={j} className={cn(
                          'rounded-xl border px-3 py-2.5',
                          opt.chosen
                            ? 'bg-primary/[0.08] border-primary/30'
                            : 'bg-primary/[0.03] border-primary/10',
                        )}>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-xs font-semibold text-foreground">{opt.title}</p>
                            {opt.chosen && (
                              <span className="text-xs font-medium text-primary border border-primary/30 bg-primary/10 px-1.5 py-0.5 rounded-full">Chosen</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{opt.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Staff Topics */}
      {d.staffTopics && d.staffTopics.length > 0 && (
        <section>
          <SectionLabel icon={<AlertTriangle className="h-3.5 w-3.5" />} text="Staff-Level Discussion Topics" />
          <p className="text-xs text-muted-foreground mb-3 italic">Open-ended architectural questions without prescriptive solutions — designed for staff+ conversations on systems thinking and trade-off analysis.</p>
          <div className="space-y-2">
            {d.staffTopics.map((st, i) => (
              <div key={i} className="bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-foreground mb-1">{st.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Practice Question Card
// ─────────────────────────────────────────────
const difficultyStyles: Record<SDPracticeQuestion['difficulty'], string> = {
  Easy:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  Hard:   'bg-rose-500/10   text-rose-400   border-rose-500/20',
};

function PracticeCard({ q }: { q: SDPracticeQuestion }) {
  const [showHint, setShowHint] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [showFullGuide, setShowFullGuide] = useState(false);

  return (
    <div className="group/card relative bg-primary/[0.04] backdrop-blur-2xl border border-primary/15 rounded-2xl overflow-hidden shadow-sm shadow-primary/5 ring-1 ring-primary/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-primary/15 hover:bg-primary/[0.06]">
      <span className="absolute inset-x-0 top-0 h-px opacity-0 group-hover/card:opacity-60 transition-all duration-500 bg-gradient-to-r w-3/4 mx-auto from-transparent via-primary to-transparent" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.03] pointer-events-none" />
      <div className="absolute inset-[1px] rounded-2xl border border-primary/[0.05] pointer-events-none" />

      <div className="p-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold leading-snug">{q.title}</h3>
          <span className={cn('shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border', difficultyStyles[q.difficulty])}>
            {q.difficulty}
          </span>
        </div>

        {/* Components */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {q.components.map((c, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-primary/[0.08] border border-primary/15 text-muted-foreground">
              {c}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {/* Hint */}
          <button
            onClick={() => setShowHint(v => !v)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && (
            <div className="bg-primary/[0.06] border border-primary/15 rounded-xl px-4 py-3 text-sm text-muted-foreground">
              {q.hint}
            </div>
          )}

          {/* Quick Approach */}
          <button
            onClick={() => setShowApproach(v => !v)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Server className="h-3.5 w-3.5" />
            {showApproach ? 'Hide Quick Approach' : 'Quick Approach'}
          </button>
          {showApproach && (
            <div className="bg-primary/[0.04] border border-primary/10 rounded-xl px-4 py-3 text-sm text-muted-foreground leading-relaxed">
              {q.approach}
            </div>
          )}

          {/* Full Study Guide button — only when detailed design exists */}
          {q.detailedDesign && (
            <button
              onClick={() => setShowFullGuide(v => !v)}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <List className="h-3.5 w-3.5" />
              {showFullGuide ? 'Collapse Full Design' : 'View Full Study Guide'}
            </button>
          )}
        </div>

        {/* Detailed Design */}
        {showFullGuide && q.detailedDesign && (
          <DetailedDesignView d={q.detailedDesign} />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function SystemDesign() {
  usePageTitle('System Design');
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);

  const isLocked = !loading && !user;
  const FREE_SECTIONS = 3;

  // Hide sticky bar on scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollHidden(y > 56 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section by scroll position
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Visible section data — all SD sections + practice
  const allSections = systemDesignSections;
  const visibleSections = isLocked ? allSections.slice(0, FREE_SECTIONS) : allSections;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* ── Sticky tab bar ── */}
      <div className={cn(
        'sticky top-14 z-40 bg-background/70 backdrop-blur-2xl border-b border-primary/10 transition-transform duration-300',
        scrollHidden ? '-translate-y-[calc(100%+3.5rem)]' : 'translate-y-0',
      )}>
        <div className="container px-4 py-3">
          <h1 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            System Design
          </h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {allSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(i)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-full border whitespace-nowrap transition-all shrink-0 backdrop-blur-md',
                  activeSection === i
                    ? 'bg-primary/90 text-primary-foreground border-primary/60 shadow-md shadow-primary/20'
                    : 'bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary/70 hover:border-primary/30',
                  isLocked && i >= FREE_SECTIONS ? 'opacity-50 cursor-not-allowed' : '',
                )}
                disabled={isLocked && i >= FREE_SECTIONS}
              >
                {s.name} ({s.topics.length})
              </button>
            ))}
            {/* Practice tab */}
            <button
              onClick={() => {
                const lastIdx = allSections.length;
                sectionRefs.current[lastIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveSection(lastIdx);
              }}
              className={cn(
                'px-3 py-1.5 text-xs rounded-full border whitespace-nowrap transition-all shrink-0 backdrop-blur-md',
                activeSection === allSections.length
                  ? 'bg-primary/90 text-primary-foreground border-primary/60 shadow-md shadow-primary/20'
                  : 'bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary/70 hover:border-primary/30',
                isLocked ? 'opacity-50 cursor-not-allowed' : '',
              )}
              disabled={isLocked}
            >
              Practice ({sdPracticeQuestions.length})
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="container px-4 py-6">

        {/* ── Sections ── */}
        {visibleSections.map((section, i) => (
          <div
            key={section.id}
            ref={el => { sectionRefs.current[i] = el; }}
            className="mb-14 scroll-mt-36"
          >
            {/* Section header */}
            <div className="flex items-start gap-3 mb-1">
              <h2 className="text-xl font-bold">{section.name}</h2>
              <span className="text-sm text-muted-foreground mt-1">
                ({section.topics.length} {section.topics.length === 1 ? 'topic' : 'topics'})
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl">{section.description}</p>

            <div className="space-y-3 max-w-2xl mx-auto">
              {section.topics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        ))}

        {/* ── Auth gate teaser ── */}
        {isLocked && allSections.length > FREE_SECTIONS && (
          <div className="relative mb-14">
            <div className="blur-md select-none pointer-events-none">
              {allSections.slice(FREE_SECTIONS, FREE_SECTIONS + 1).map(section => (
                <div key={section.id} className="scroll-mt-36">
                  <div className="flex items-start gap-3 mb-1">
                    <h2 className="text-xl font-bold">{section.name}</h2>
                    <span className="text-sm text-muted-foreground mt-1">
                      ({section.topics.length} topics)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{section.description}</p>
                  <div className="space-y-3 max-w-2xl mx-auto">
                    {section.topics.slice(0, 3).map(topic => (
                      <div key={topic.id} className="rounded-2xl border border-primary/15 bg-primary/[0.04] px-5 py-4">
                        <h3 className="text-base font-semibold">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{topic.summary}</p>
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

        {/* ── Practice Section ── */}
        {!isLocked && (
          <div
            ref={el => { sectionRefs.current[allSections.length] = el; }}
            className="mb-14 scroll-mt-36"
          >
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Practice Session
              </h2>
              <span className="text-sm text-muted-foreground">
                ({sdPracticeQuestions.length} questions)
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
              Classic system design interview questions. Attempt the design yourself first, then reveal the hint and approach.
            </p>
            <div className="space-y-3 max-w-2xl mx-auto">
              {sdPracticeQuestions.map(q => (
                <PracticeCard key={q.id} q={q} />
              ))}
            </div>
          </div>
        )}

        {/* Practice teaser when locked */}
        {isLocked && (
          <div className="relative mb-14">
            <div className="blur-md select-none pointer-events-none">
              <div className="scroll-mt-36">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    Practice Session
                  </h2>
                  <span className="text-sm text-muted-foreground">({sdPracticeQuestions.length} questions)</span>
                </div>
                <div className="space-y-3 max-w-2xl mx-auto mt-4">
                  {sdPracticeQuestions.slice(0, 3).map(q => (
                    <div key={q.id} className="rounded-2xl border border-primary/15 bg-primary/[0.04] px-5 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base font-semibold">{q.title}</h3>
                        <span className={cn('shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full border', difficultyStyles[q.difficulty])}>
                          {q.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SignInOverlay />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
