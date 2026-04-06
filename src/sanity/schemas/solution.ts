import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'audienceTrack', title: 'Audience Track', type: 'reference', to: [{ type: 'audienceTrack' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title', subtitle: 'headline' } },
})
