import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'province',
  title: 'Province / State',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: { list: [{ title: 'Canada', value: 'ca' }, { title: 'United States', value: 'us' }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'abbreviation', title: 'Abbreviation', type: 'string', description: 'Province/state abbreviation (e.g., ON, FL)' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() })] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title', subtitle: 'country' } },
})
