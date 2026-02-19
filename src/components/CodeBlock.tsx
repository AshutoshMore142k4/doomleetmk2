import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/hooks/useTheme';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'cpp', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const codeTheme = theme === 'dark' ? themes.vsDark : themes.vsLight;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative group', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 z-10"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-easy" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <Highlight theme={codeTheme} code={code.trim()} language={language}>
        {({ className: hlClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(hlClassName, 'overflow-x-auto rounded border border-border p-4 text-sm')}
            style={{ ...style, backgroundColor: 'hsl(var(--secondary) / 0.5)' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-muted-foreground/50 text-right mr-4 select-none text-xs">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
