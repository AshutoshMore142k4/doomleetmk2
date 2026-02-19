import { SignIn } from '@clerk/clerk-react';
import { RetroGrid } from '@/components/ui/hero-section-dark';

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <RetroGrid angle={65} cellSize={50} opacity={0.3} darkLineColor="hsl(270 70% 55% / 0.08)" />
      <div className="relative z-10">
        <SignIn
          routing="hash"
          fallbackRedirectUrl="/problems"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card/80 backdrop-blur-2xl border border-primary/15 shadow-lg shadow-primary/5",
            },
          }}
        />
      </div>
    </div>
  );
}
