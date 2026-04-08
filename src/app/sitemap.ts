import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

const url = (path: string) => `${SITE_URL}${path}`;
const d = new Date('2026-04-08');

/* Helper to generate entries from slug arrays */
function pages(
  prefix: string,
  slugs: string[],
  opts: { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number },
): MetadataRoute.Sitemap {
  return slugs.map((s) => ({
    url: url(`${prefix}${s}/`),
    lastModified: d,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── Core ───────────────────────────────────────────────────────
    { url: url('/'), lastModified: d, changeFrequency: 'weekly', priority: 1.0 },
    { url: url('/platform/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pricing/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/about/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/resources/'), lastModified: d, changeFrequency: 'weekly', priority: 0.7 },

    // ─── Entity / Branded ───────────────────────────────────────────
    { url: url('/what-is-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/powered-by-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/how-revun-works/'), lastModified: d, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/download/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },

    // ─── Solutions ──────────────────────────────────────────────────
    { url: url('/solutions/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    ...pages('/solutions/', [
      'self-managing-owners', 'property-management-companies', 'brokerages',
      'leasing-companies', 'maintenance-companies', 'reits',
    ], { changeFrequency: 'monthly', priority: 0.8 }),

    // ─── Industries ─────────────────────────────────────────────────
    { url: url('/industries/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/industries/', [
      'reits-and-asset-managers', 'single-family-operators', 'multifamily-operators',
      'student-housing', 'senior-living', 'vacation-rentals', 'commercial-property',
      'affordable-housing', 'military-housing', 'mixed-use',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Self-Manage ────────────────────────────────────────────────
    { url: url('/self-manage/'), lastModified: d, changeFrequency: 'weekly', priority: 0.9 },
    ...pages('/self-manage/', [
      'pricing', 'how-it-works', 'add-ons', 'get-started', 'faq',
      'first-time-landlord', 'condo-landlord', 'house-landlord',
      'furnished-rental', 'relocation-landlord', 'small-portfolio', 'investor-owner',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Use Cases ──────────────────────────────────────────────────
    { url: url('/use-cases/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/use-cases/', [
      'tenant-screening', 'rent-collection', 'lease-management', 'maintenance-management',
      'property-listing', 'showing-scheduling', 'owner-reporting', 'vendor-management',
      'document-automation', 'communication-hub', 'accounting-integration', 'compliance-tracking',
    ], { changeFrequency: 'monthly', priority: 0.7 }),

    // ─── Tenant / Travel / Relocation ───────────────────────────────
    { url: url('/traveling-tenants/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/relocation-rentals/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/furnished-rentals/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/corporate-housing/'), lastModified: d, changeFrequency: 'monthly', priority: 0.7 },

    // ─── Compare ────────────────────────────────────────────────────
    { url: url('/compare/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/compare/', [
      // PM Software
      'appfolio', 'buildium', 'doorloop', 'yardi', 'propertyware', 'rent-manager',
      'entrata', 'mri-software', 'tenantcloud', 'hemlane', 'avail', 'turbo-tenant',
      'innago', 'rentec-direct', 'simplifyem', 'resman', 'payrop',
      // Canadian Platforms
      'singlekey', 'liv-rent', 'frontlobby', 'rhenti', 'rentmoola', 'openroom',
      'zumper', 'padmapper', 'rent-panda',
      // Brokerage / CRM
      'follow-up-boss', 'kvcore', 'lone-wolf', 'dotloop', 'skyslope', 'brokermint',
      'transaction-desk', 'wise-agent', 'top-producer', 'boomtown', 'real-geeks',
      'cinc', 'liondesk',
      // Maintenance
      'property-meld', 'jobber', 'servicetitan', 'happyco', 'upkeep',
      'housecall-pro', 'maintainx', 'fieldpulse', 'appwork', 'building-engines',
      // Communications
      'ringcentral', 'openphone', 'dialpad', 'aircall', 'zoom-phone',
      'intercom', 'zendesk', 'freshdesk',
      // Screening
      'transunion-smartmove', 'naborly', 'rentprep', 'sure', 'the-guarantors',
      'insurent', 'rhino', 'jetty', 'leaselock', 'trustii', 'persona',
    ], { changeFrequency: 'monthly', priority: 0.6 }),

    // ─── Integrations ───────────────────────────────────────────────
    { url: url('/integrations/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/integrations/', [
      'quickbooks', 'xero', 'sage-intacct', 'netsuite', 'zoho-books', 'zoho-crm', 'zoho-desk',
      'salesforce', 'hubspot', 'pipedrive',
      'twilio', 'ringcentral', 'openphone', 'dialpad', 'aircall', 'zoom-phone',
      'intercom', 'zendesk', 'freshdesk',
      'stripe', 'plaid', 'interac', 'klarna', 'affirm', 'paybright',
      'persona', 'trustii', 'flinks', 'singlekey-integration',
      'equifax', 'transunion', 'checkr',
      'docusign', 'dropbox-sign', 'adobe-sign',
      'slack', 'zapier', 'make',
      'microsoft-365', 'google-workspace', 'calendly', 'google-calendar',
      'google-maps', 'mapbox',
      'brokerbay', 'mls-idx',
    ], { changeFrequency: 'monthly', priority: 0.6 }),

    // ─── Support ────────────────────────────────────────────────────
    { url: url('/help/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/powered-by-revun/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/support/self-manage/'), lastModified: d, changeFrequency: 'monthly', priority: 0.6 },

    // ─── Canada ─────────────────────────────────────────────────────
    { url: url('/ca/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/ca/', [
      'ontario', 'british-columbia', 'quebec', 'alberta', 'nova-scotia', 'manitoba',
      'saskatchewan', 'new-brunswick', 'prince-edward-island', 'newfoundland-and-labrador',
    ], { changeFrequency: 'monthly', priority: 0.7 }),
    // Ontario cities
    ...pages('/ca/ontario/', [
      'toronto', 'mississauga', 'brampton', 'hamilton', 'ottawa', 'london',
      'vaughan', 'markham', 'richmond-hill', 'oakville', 'burlington',
      'kitchener', 'waterloo', 'cambridge', 'guelph', 'barrie', 'milton',
      'oshawa', 'ajax', 'pickering', 'whitby', 'st-catharines', 'niagara-falls', 'kingston',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // BC cities
    ...pages('/ca/british-columbia/', [
      'vancouver', 'burnaby', 'surrey', 'richmond', 'coquitlam', 'langley',
      'victoria', 'kelowna', 'abbotsford', 'nanaimo',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Quebec cities
    ...pages('/ca/quebec/', [
      'montreal', 'laval', 'quebec-city', 'longueuil', 'gatineau', 'sherbrooke',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Alberta cities
    ...pages('/ca/alberta/', [
      'calgary', 'edmonton', 'red-deer', 'lethbridge',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Nova Scotia
    ...pages('/ca/nova-scotia/', ['halifax', 'dartmouth'], { changeFrequency: 'monthly', priority: 0.6 }),
    // Manitoba
    ...pages('/ca/manitoba/', ['winnipeg', 'brandon'], { changeFrequency: 'monthly', priority: 0.6 }),
    // Saskatchewan
    ...pages('/ca/saskatchewan/', ['saskatoon', 'regina'], { changeFrequency: 'monthly', priority: 0.6 }),
    // New Brunswick
    ...pages('/ca/new-brunswick/', ['moncton', 'saint-john', 'fredericton'], { changeFrequency: 'monthly', priority: 0.6 }),
    // PEI
    ...pages('/ca/prince-edward-island/', ['charlottetown'], { changeFrequency: 'monthly', priority: 0.6 }),
    // Newfoundland
    ...pages('/ca/newfoundland-and-labrador/', ['st-johns'], { changeFrequency: 'monthly', priority: 0.6 }),

    // ─── United States ──────────────────────────────────────────────
    { url: url('/us/'), lastModified: d, changeFrequency: 'weekly', priority: 0.8 },
    ...pages('/us/', [
      'florida', 'texas', 'california', 'new-york', 'illinois', 'georgia',
      'north-carolina', 'arizona', 'colorado', 'new-jersey', 'virginia',
      'washington', 'nevada', 'pennsylvania', 'ohio', 'michigan', 'massachusetts', 'tennessee',
    ], { changeFrequency: 'monthly', priority: 0.7 }),
    // Florida cities
    ...pages('/us/florida/', [
      'miami', 'orlando', 'tampa', 'jacksonville', 'st-petersburg',
      'fort-lauderdale', 'west-palm-beach', 'hollywood', 'pembroke-pines', 'tallahassee',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Texas cities
    ...pages('/us/texas/', [
      'houston', 'san-antonio', 'dallas', 'fort-worth', 'austin',
      'el-paso', 'arlington', 'corpus-christi', 'plano', 'frisco',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // California cities
    ...pages('/us/california/', [
      'los-angeles', 'san-diego', 'san-jose', 'san-francisco', 'sacramento',
      'fresno', 'irvine', 'anaheim', 'long-beach', 'oakland',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // New York cities
    ...pages('/us/new-york/', [
      'new-york-city', 'buffalo', 'rochester', 'yonkers', 'syracuse', 'albany',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Illinois cities
    ...pages('/us/illinois/', [
      'chicago', 'aurora', 'naperville', 'joliet', 'rockford',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Georgia cities
    ...pages('/us/georgia/', [
      'atlanta', 'savannah', 'augusta', 'columbus', 'macon',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // North Carolina cities
    ...pages('/us/north-carolina/', [
      'charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Arizona cities
    ...pages('/us/arizona/', [
      'phoenix', 'tucson', 'mesa', 'scottsdale', 'chandler',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Colorado cities
    ...pages('/us/colorado/', [
      'denver', 'colorado-springs', 'aurora-co', 'fort-collins', 'boulder',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // New Jersey cities
    ...pages('/us/new-jersey/', [
      'newark', 'jersey-city', 'paterson', 'elizabeth', 'trenton',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Virginia cities
    ...pages('/us/virginia/', [
      'virginia-beach', 'richmond', 'arlington-va', 'norfolk', 'alexandria',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Washington cities
    ...pages('/us/washington/', [
      'seattle', 'spokane', 'tacoma', 'vancouver-wa', 'bellevue',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Nevada cities
    ...pages('/us/nevada/', [
      'las-vegas', 'henderson', 'reno', 'north-las-vegas', 'sparks',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Pennsylvania cities
    ...pages('/us/pennsylvania/', [
      'philadelphia', 'pittsburgh', 'allentown', 'erie', 'reading',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Ohio cities
    ...pages('/us/ohio/', [
      'columbus', 'cleveland', 'cincinnati', 'toledo', 'akron',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Michigan cities
    ...pages('/us/michigan/', [
      'detroit', 'grand-rapids', 'warren', 'sterling-heights', 'ann-arbor',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Massachusetts cities
    ...pages('/us/massachusetts/', [
      'boston', 'worcester', 'springfield', 'cambridge-ma', 'lowell',
    ], { changeFrequency: 'monthly', priority: 0.6 }),
    // Tennessee cities
    ...pages('/us/tennessee/', [
      'nashville', 'memphis', 'knoxville', 'chattanooga', 'clarksville',
    ], { changeFrequency: 'monthly', priority: 0.6 }),

    // ─── Legal ──────────────────────────────────────────────────────
    { url: url('/privacy/'), lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms/'), lastModified: d, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
