import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'typescript', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

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
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-easy" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <pre className="overflow-x-auto rounded border border-border bg-secondary/50 p-4 text-sm">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
