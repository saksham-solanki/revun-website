import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

const title = 'Privacy Policy'
const description =
  'Learn how Revun collects, uses, and protects your personal information.'
const url = buildCanonicalUrl('/privacy')

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: buildCanonicalUrl('/'),
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Privacy Policy',
                item: url,
              },
            ],
          }),
        }}
      />

      <RevealOnScroll>
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue">
            Legal
          </p>
          <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: April 6, 2026
          </p>
        </header>
      </RevealOnScroll>

      <div className="prose prose-slate max-w-none [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[0.938rem] [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:text-[0.938rem] [&_ul]:leading-relaxed [&_ul]:text-muted-foreground [&_li]:text-muted-foreground [&_a]:text-brand-blue [&_a]:no-underline hover:[&_a]:underline">
        <p>
          Revun Inc. (&quot;Revun,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and related services (collectively, the &quot;Services&quot;).
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li>Account information: name, email address, phone number, and password.</li>
          <li>Property information: addresses, unit details, photos, and listing content.</li>
          <li>Financial information: payment method details, bank account information for rent collection, and billing history.</li>
          <li>Identity verification: government-issued ID, credit check authorization, and background check consent.</li>
          <li>Communications: messages, support requests, and feedback you send through the platform.</li>
        </ul>
        <p>
          We also automatically collect usage data such as IP address, browser type, device information, pages visited, and interaction patterns through cookies and similar technologies.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve the Services.</li>
          <li>Process transactions, including rent payments and subscription billing.</li>
          <li>Facilitate tenant screening, identity verification, and lease execution.</li>
          <li>Send transactional communications, such as payment confirmations and maintenance updates.</li>
          <li>Send marketing communications (with your consent, where required by law).</li>
          <li>Detect, prevent, and respond to fraud, abuse, and security incidents.</li>
          <li>Comply with legal obligations and enforce our Terms of Service.</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers who assist in operating our platform (payment processors, hosting providers, screening agencies).</li>
          <li>Property managers, landlords, or tenants as necessary to facilitate property management workflows.</li>
          <li>Legal authorities when required by law, regulation, or legal process.</li>
          <li>Business partners in connection with a merger, acquisition, or asset sale, with notice to affected users.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures, including encryption in transit (TLS 1.2+) and at rest (AES-256), access controls, and regular security audits. While we strive to protect your data, no system is completely secure. We encourage you to use strong passwords and enable two-factor authentication.
        </p>

        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies, pixels, and similar technologies to operate the Services, remember your preferences, analyze usage patterns, and deliver relevant content. You can manage cookie preferences through your browser settings. Some features may not function properly if cookies are disabled.
        </p>

        <h2>6. Your Rights and Choices</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Withdraw consent for marketing communications.</li>
          <li>Request a copy of your data in a portable format.</li>
          <li>Object to or restrict certain processing activities.</li>
          <li>File a complaint with your local data protection authority.</li>
        </ul>
        <p>
          Canadian residents have rights under PIPEDA and applicable provincial privacy legislation. To exercise any of these rights, contact us at privacy@revun.com.
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain your information for as long as your account is active or as needed to provide the Services. We may also retain certain information as required by law or for legitimate business purposes, such as resolving disputes and enforcing our agreements.
        </p>

        <h2>8. Children</h2>
        <p>
          The Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the &quot;Last updated&quot; date. Your continued use of the Services after changes take effect constitutes acceptance of the updated policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, contact us at:
        </p>
        <ul>
          <li>Email: privacy@revun.com</li>
          <li>Mail: Revun Inc., Toronto, Ontario, Canada</li>
        </ul>
      </div>
    </article>
  )
}
