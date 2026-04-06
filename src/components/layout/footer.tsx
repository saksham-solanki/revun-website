import Link from 'next/link'

const navigation = {
  platform: {
    title: 'Platform',
    links: [
      { label: 'Platform Overview', href: '/platform' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Compare', href: '/compare' },
      { label: 'Security', href: '/security' },
    ],
  },
  solutions: {
    title: 'Solutions',
    links: [
      { label: 'Self-Managing Owners', href: '/solutions/owners' },
      { label: 'PMCs', href: '/solutions/pmcs' },
      { label: 'Brokerages', href: '/solutions/brokerages' },
      { label: 'Leasing', href: '/solutions/leasing' },
      { label: 'Maintenance', href: '/solutions/maintenance' },
      { label: 'REITs', href: '/solutions/reits' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
      { label: 'Guides', href: '/guides' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'API Docs', href: '/docs/api' },
      { label: 'Status', href: '/status' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Legal', href: '/legal' },
    ],
  },
} as const

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-brand-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

const socialLinks = [
  { label: 'X (Twitter)', href: 'https://twitter.com/revun', icon: TwitterIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/revun', icon: LinkedInIcon },
  { label: 'GitHub', href: 'https://github.com/revun', icon: GitHubIcon },
]

export function Footer() {
  return (
    <footer className="bg-brand-indigo border-t border-white/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: brand + newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12 border-b border-white/10">
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <span className="font-display italic text-2xl text-white">
                Revun
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-brand-slate-400">
              Property management infrastructure for Canada and the United States.
            </p>
          </div>

          <div className="lg:flex lg:justify-end lg:items-start">
            <div className="max-w-sm w-full">
              <p className="text-sm font-semibold text-white">
                Stay up to date
              </p>
              <p className="mt-1 text-sm text-brand-slate-400">
                Product updates, insights, and industry news.
              </p>
              <form className="mt-4 flex gap-2" action="/api/contact" method="POST">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-sm text-white placeholder:text-brand-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-violet focus:border-transparent"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-brand-violet px-4 py-2 text-sm font-semibold text-white hover:bg-brand-violet-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-violet focus:ring-offset-2 focus:ring-offset-brand-indigo"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
          {Object.values(navigation).map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-slate-500">
            &copy; 2026 Revun. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-brand-slate-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-brand-slate-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-slate-500 hover:text-white transition-colors"
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
