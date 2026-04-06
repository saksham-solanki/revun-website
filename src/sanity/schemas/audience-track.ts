import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'audienceTrack',
  title: 'Audience Track',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'label', title: 'Short Label', type: 'string', description: 'For tabs and navigation (e.g., "Self-Manage", "Operator")' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g., "home", "building-2")' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'label' } },
})
