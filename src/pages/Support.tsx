import { Header } from '@/components/Header';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, MessageSquare, Bug, Lightbulb, HelpCircle } from 'lucide-react';
import { NeonCard } from '@/components/ui/neon-card';
import { NeonButton } from '@/components/ui/neon-button';

const supportChannels = [
  {
    icon: Github,
    title: 'GitHub Issues',
    description: 'Found a bug or want to request a feature? Open an issue on our GitHub repo.',
    action: 'Open GitHub',
    href: 'https://github.com/AshutoshMore142k4/doomleetmk2/issues',
    external: true,
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'For account issues, privacy requests, or general inquiries.',
    action: 'Send Email',
    href: 'mailto:sec1aids@gmail.com',
    external: true,
  },
];

const faqItems = [
  {
    icon: HelpCircle,
    question: 'Is GrindLeet free to use?',
    answer:
      'Yes! The core features — NeetCode 150, Striver SDE Sheet, Problem Mapper, and Compare — are completely free. Some template categories require a free sign-in to access.',
  },
  {
    icon: Bug,
    question: 'I found an incorrect solution or a bug. How do I report it?',
    answer:
      'Please open a GitHub issue with the problem number and a description of the error. We review and fix reported issues promptly.',
  },
  {
    icon: Lightbulb,
    question: 'Can I suggest a new feature or template?',
    answer:
      'Absolutely! Open a feature-request issue on GitHub or email us. We love community feedback and prioritize popular requests.',
  },
  {
    icon: MessageSquare,
    question: 'How is my progress data stored?',
    answer:
      'Template progress (learned / needs-review) is stored in your browser\'s local storage. It stays on your device and is never sent to our servers.',
  },
  {
    icon: HelpCircle,
    question: 'How do I delete my account?',
    answer:
      'Send us an email from the address associated with your account, and we\'ll process the deletion within 48 hours.',
  },
];

export default function Support() {
  usePageTitle('Support');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container max-w-3xl px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground mb-10">
          Need help? We're here for you. Choose the channel that works best.
        </p>

        {/* Support channels */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {supportChannels.map((ch) => (
            <NeonCard key={ch.title} className="p-6 flex flex-col gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <ch.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{ch.title}</h3>
                <p className="text-sm text-muted-foreground">{ch.description}</p>
              </div>
              <a href={ch.href} target={ch.external ? '_blank' : undefined} rel="noopener noreferrer">
                <NeonButton size="sm">{ch.action}</NeonButton>
              </a>
            </NeonCard>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card/50 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 rounded-xl border border-border bg-card/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for? Check our{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            or reach out directly via email.
          </p>
        </div>
      </main>
    </div>
  );
}
