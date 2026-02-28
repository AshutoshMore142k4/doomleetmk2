import { Header } from '@/components/Header';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy');

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

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: February 21, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              GrindLeet is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your
              information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Account Information:</strong> When you sign up,
                we collect your name and email address through our authentication provider (Clerk).
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> We may collect anonymous
                usage statistics such as pages visited and features used to improve the platform.
              </li>
              <li>
                <strong className="text-foreground">Local Storage:</strong> We store your template
                progress (learned/needs-review status) locally in your browser. This data never
                leaves your device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To authenticate your identity and manage your account</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about updates or changes to the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share data with trusted service providers (Clerk for authentication,
              Supabase for data storage, Vercel for hosting) solely to operate our platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies &amp; Local Storage</h2>
            <p>
              We use essential cookies for authentication and session management.
              We also use browser local storage to persist your template progress
              preferences. You can clear this data at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data.
              All data is transmitted over HTTPS. However, no method of electronic
              transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for data processing at any time</li>
              <li>Export your data in a portable format</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under the age of 13. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new policy on this page and updating the "Last
              updated" date above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out via
              our{' '}
              <Link to="/support" className="text-primary hover:underline">
                Support page
              </Link>
              {' '}or email us directly at{' '}
              <a href="mailto:sec1aids@gmail.com" className="text-primary hover:underline">
                sec1aids@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
