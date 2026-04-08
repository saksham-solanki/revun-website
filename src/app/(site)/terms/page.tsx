import type { Metadata } from 'next'
import { buildCanonicalUrl } from '@/lib/utils'

const title = 'Terms of Service'
const description =
  'Read the terms and conditions that govern your use of the Revun platform.'
const url = buildCanonicalUrl('/terms')

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

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-36 pb-24">
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
                name: 'Terms of Service',
                item: url,
              },
            ],
          }),
        }}
      />

      <header className="mb-12">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-blue">
          Legal
        </p>
        <h1 className="font-heading font-extrabold text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: April 6, 2026
        </p>
      </header>

      <div className="prose prose-slate max-w-none dark:prose-invert [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-[0.938rem] [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:text-[0.938rem] [&_ul]:leading-relaxed [&_ul]:text-muted-foreground [&_li]:text-muted-foreground [&_a]:text-brand-blue [&_a]:no-underline hover:[&_a]:underline">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Revun platform, website, and related services (collectively, the &quot;Services&quot;) provided by Revun Inc. (&quot;Revun,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By creating an account or using the Services, you agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Services, you confirm that you are at least 18 years of age and have the legal capacity to enter into a binding agreement. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
        </p>

        <h2>2. Description of Services</h2>
        <p>
          Revun provides a property management platform that includes tools for listing properties, scheduling showings, screening tenants, executing leases, collecting rent, managing maintenance, and related workflows. The Services are offered through self-serve plans for individual owners and operator plans for property management companies, brokerages, and service providers.
        </p>
        <p>
          Revun is a technology platform. We are not a property management company, real estate brokerage, financial institution, or legal advisor. Use of the Services does not create an agency, fiduciary, or professional-client relationship between you and Revun.
        </p>

        <h2>3. Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate and complete information when creating your account and keep it up to date. Notify us immediately if you suspect unauthorized access to your account.
        </p>

        <h2>4. Billing and Payments</h2>
        <p>
          Paid features are billed according to the pricing plan you select. Prices are listed in Canadian dollars (CAD) unless otherwise specified. All fees are non-refundable except where required by applicable law or as explicitly stated in our refund policy.
        </p>
        <p>
          We may change pricing with at least 30 days notice. Continued use of the Services after a price change constitutes acceptance of the new pricing. If you do not agree, you may cancel your subscription before the new pricing takes effect.
        </p>

        <h2>5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Services for any unlawful purpose or in violation of any applicable laws or regulations.</li>
          <li>Submit false, misleading, or fraudulent information, including property listings.</li>
          <li>Interfere with or disrupt the Services, servers, or networks connected to the Services.</li>
          <li>Attempt to gain unauthorized access to any part of the Services or other systems.</li>
          <li>Use the Services to send spam, unsolicited communications, or harassment.</li>
          <li>Scrape, crawl, or otherwise extract data from the Services without written permission.</li>
          <li>Reverse-engineer, decompile, or attempt to derive the source code of the Services.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms without prior notice.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          The Services, including all software, designs, text, graphics, logos, and other content, are owned by Revun or our licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works from the Services except as expressly permitted.
        </p>
        <p>
          You retain ownership of content you upload to the Services (property photos, documents, etc.). By uploading content, you grant Revun a non-exclusive, worldwide license to use, display, and process that content solely to provide and improve the Services.
        </p>

        <h2>7. Termination</h2>
        <p>
          You may cancel your account at any time through the platform settings or by contacting support. We may suspend or terminate your access if you breach these Terms, fail to pay fees, or if required by law.
        </p>
        <p>
          Upon termination, your right to use the Services ceases immediately. We will make your data available for export for 30 days following termination, after which it may be deleted in accordance with our data retention policies.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Revun shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities arising from your use of the Services.
        </p>
        <p>
          Our total aggregate liability for all claims arising from or related to the Services shall not exceed the amount you paid to Revun in the twelve (12) months preceding the claim.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          The Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts of Ontario, Canada.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Material changes will be communicated via email or through the platform with at least 30 days notice. Continued use of the Services after changes take effect constitutes acceptance of the revised Terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions about these Terms, contact us at:
        </p>
        <ul>
          <li>Email: legal@revun.com</li>
          <li>Mail: Revun Inc., Toronto, Ontario, Canada</li>
        </ul>
      </div>
    </article>
  )
}
