const faqs = [
  {
    question: 'What is Revun?',
    answer:
      'Revun is a property management infrastructure platform for Canada and the United States. It replaces disconnected tools with a single operating system for leasing, payments, maintenance, screening, and more.',
  },
  {
    question: 'Who is Revun built for?',
    answer:
      'Revun serves self-managing property owners, property management companies, brokerages, leasing companies, maintenance companies, and REITs. Whether you manage one unit or one thousand, the platform adapts to your role.',
  },
  {
    question: 'How much does Revun cost?',
    answer:
      'Revun offers a free tier for self-managing owners. Growth starts at $29/unit/month, Professional at $49/unit/month, and Enterprise pricing is customized. All plans include a free trial with no credit card required.',
  },
  {
    question: 'Is Revun available in my province or state?',
    answer:
      'Revun currently operates across all Canadian provinces including Ontario, British Columbia, Alberta, Quebec, Nova Scotia, and Manitoba. US expansion is underway with initial coverage in key states.',
  },
  {
    question: 'What integrations does Revun support?',
    answer:
      'Revun integrates with 40+ tools including Stripe, QuickBooks, Xero, DocuSign, Twilio, Salesforce, HubSpot, Zapier, Google Workspace, Microsoft 365, Plaid, and Interac.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Sign up for a free account at revun.com. No credit card required. You can start managing properties immediately with our free tier, or book a demo to see the full platform in action.',
  },
]

export function HomepageFaq() {
  return (
    <section className="bg-brand-off-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-brand-graphite">
            Frequently asked <span className="text-accent">questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:shadow-card-hover"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                <span className="font-heading font-semibold text-brand-graphite text-[15px] pr-4">
                  {faq.question}
                </span>
                <svg
                  className="h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-200 group-open:rotate-45"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="10" y1="4" x2="10" y2="16" />
                  <line x1="4" y1="10" x2="16" y2="10" />
                </svg>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-[#555860] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
