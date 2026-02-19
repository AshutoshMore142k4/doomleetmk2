import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { NeonButton } from '@/components/ui/neon-button';

export function SignInOverlay() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="max-w-sm w-full mx-4 rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-2">Sign in to Unlock</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Create a free account to access all problems, templates, and track your progress.
        </p>
        <Link to="/auth">
          <NeonButton variant="solid" size="lg" className="w-full shadow-lg shadow-primary/25">
            Sign In / Sign Up
          </NeonButton>
        </Link>
      </div>
    </div>
  );
}
