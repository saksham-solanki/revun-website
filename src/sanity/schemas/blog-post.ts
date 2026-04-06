import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2 }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() })] }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Industry', value: 'industry' },
          { title: 'Guide', value: 'guide' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'News', value: 'news' },
        ],
      },
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
})
