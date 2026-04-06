import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Industry Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title' } },
})
