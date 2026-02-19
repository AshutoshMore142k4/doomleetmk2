import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
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
            baseTheme: dark,
            elements: {
              rootBox: "mx-auto",
              card: "bg-[hsl(240,10%,8%)] border border-[hsl(270,50%,50%,0.15)] shadow-2xl shadow-purple-500/10 rounded-2xl",
              headerTitle: "text-foreground font-bold",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "bg-[hsl(240,10%,14%)] border-[hsl(270,50%,50%,0.15)] hover:bg-[hsl(240,10%,18%)] text-foreground",
              socialButtonsBlockButtonText: "text-foreground font-medium",
              dividerLine: "bg-[hsl(270,50%,50%,0.15)]",
              dividerText: "text-muted-foreground",
              formFieldLabel: "text-muted-foreground",
              formFieldInput: "bg-[hsl(240,10%,12%)] border-[hsl(270,50%,50%,0.12)] text-foreground focus:border-[hsl(270,50%,60%,0.4)] focus:ring-[hsl(270,50%,60%,0.2)]",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25",
              footerActionLink: "text-primary hover:text-primary/80",
              footerActionText: "text-muted-foreground",
              identityPreviewEditButton: "text-primary",
              formFieldAction: "text-primary",
              otpCodeFieldInput: "bg-[hsl(240,10%,12%)] border-[hsl(270,50%,50%,0.12)] text-foreground",
              badge: "bg-[hsl(240,10%,14%)] text-muted-foreground border-[hsl(270,50%,50%,0.15)]",
              footer: "hidden",
            },
            variables: {
              colorPrimary: "hsl(270, 70%, 55%)",
              colorBackground: "hsl(240, 10%, 8%)",
              colorText: "hsl(0, 0%, 95%)",
              colorTextSecondary: "hsl(240, 5%, 65%)",
              colorInputBackground: "hsl(240, 10%, 12%)",
              colorInputText: "hsl(0, 0%, 95%)",
              borderRadius: "0.75rem",
            },
          }}
        />
      </div>
    </div>
  );
}
