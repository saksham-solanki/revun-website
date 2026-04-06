import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonPage',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'competitor', title: 'Competitor', type: 'reference', to: [{ type: 'competitor' }], validation: (Rule) => Rule.required() }),
    defineField({
      name: 'featureRows',
      title: 'Feature Comparison',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'feature', title: 'Feature', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'revunValue', title: 'Revun', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'competitorValue', title: 'Competitor', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'category', title: 'Category', type: 'string', description: 'Group features by category (e.g., Core, Pricing, Support)' }),
        ],
        preview: { select: { title: 'feature' } },
      }],
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title' } },
})
