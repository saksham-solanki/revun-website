import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pricingPackage',
  title: 'Pricing Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Self-Manage', value: 'self-manage' },
          { title: 'Agent', value: 'agent' },
          { title: 'Brokerage', value: 'brokerage' },
          { title: 'Operator', value: 'operator' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Enterprise', value: 'enterprise' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      options: { list: ['/day', '/month', '/user', 'custom'] },
    }),
    defineField({ name: 'priceNote', title: 'Price Note', type: 'string', description: 'E.g., "per active unit", "starting from"' }),
    defineField({ name: 'targetAudience', title: 'Target Audience', type: 'reference', to: [{ type: 'audienceTrack' }] }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'highlightedFeatures', title: 'Highlighted Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'popular', title: 'Popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier' } },
})
