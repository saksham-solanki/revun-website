import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'integrationCategory' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'setupDifficulty',
      title: 'Setup Difficulty',
      type: 'string',
      options: { list: ['easy', 'medium', 'advanced'] },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: [
        { title: 'Available', value: 'available' },
        { title: 'Coming Soon', value: 'coming-soon' },
        { title: 'Beta', value: 'beta' },
      ]},
      initialValue: 'available',
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
})
