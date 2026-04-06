import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'competitor',
  title: 'Competitor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'PM Software', value: 'pm-software' },
          { title: 'Canadian Rental Platform', value: 'canadian-rental' },
          { title: 'Brokerage/CRM', value: 'brokerage-crm' },
          { title: 'Communications', value: 'communications' },
          { title: 'Maintenance/Field Service', value: 'maintenance' },
          { title: 'Screening/Verification', value: 'screening' },
          { title: 'Accounting/Financial', value: 'accounting' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'pricingSummary', title: 'Pricing Summary', type: 'string' }),
    defineField({ name: 'keyFeatures', title: 'Key Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'strengths', title: 'Strengths', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'weaknesses', title: 'Weaknesses', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'logo' } },
})
