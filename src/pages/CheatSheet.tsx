import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { cheatSheetSections } from '@/lib/cheatsheet-data';
import { cn } from '@/lib/utils';
import { Code2, ScrollText } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { usePageTitle } from '@/hooks/usePageTitle';

function CheatEntry({ entry }: { entry: import('@/lib/cheatsheet-data').CheatSheetEntry }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
      <div className="px-4 py-3 sm:px-5 sm:py-4">
        <h3 className="text-sm sm:text-base font-semibold mb-2">{entry.title}</h3>
        <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed whitespace-pre-line break-words">
          {entry.content}
        </div>

        {entry.code && (
          <div className="mt-3 border-t border-border pt-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline mb-2"
            >
              <Code2 className="h-3.5 w-3.5" />
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
            {showCode && <CodeBlock code={entry.code} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheatSheet() {
  usePageTitle('Bonus Cheat Sheet');
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollHidden(y > 56 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update active section based on scroll position
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

  const sections = cheatSheetSections;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      {/* Sticky topic slider - hides on scroll like Striver page */}
      <div className={cn(
        "sticky top-14 z-40 bg-background/70 backdrop-blur-2xl border-b border-primary/10 transition-transform duration-300",
        scrollHidden ? '-translate-y-[calc(100%+3.5rem)]' : 'translate-y-0'
      )}>
        <div className="container px-4 py-3">
          <h1 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            Bonus Cheat Sheet
          </h1>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((s, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(i)}
                className={cn(
                  'px-3 py-1.5 text-xs rounded-full border whitespace-nowrap transition-all shrink-0 backdrop-blur-md',
                  activeSection === i
                    ? 'bg-primary/90 text-primary-foreground border-primary/60 shadow-md shadow-primary/20'
                    : 'bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary/70 hover:border-primary/30'
                )}
              >
                {s.name} ({s.entries.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container px-4 py-6">
        {sections.map((section, i) => (
          <div
            key={i}
            ref={el => { sectionRefs.current[i] = el; }}
            className="mb-12 scroll-mt-36"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold">{section.name}</h2>
              <span className="text-sm text-muted-foreground">
                ({section.entries.length} {section.entries.length === 1 ? 'entry' : 'entries'})
              </span>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {section.entries.map((entry, j) => (
                <CheatEntry key={j} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
