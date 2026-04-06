import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publishingControls',
  title: 'Publishing Controls',
  type: 'object',
  fields: [
    defineField({
      name: 'canonicalOverride',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Leave empty for self-referencing canonical',
    }),
    defineField({
      name: 'noindex',
      title: 'Noindex',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'includedInSitemap',
      title: 'Include in Sitemap',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'redirectTo',
      title: 'Redirect To',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
  ],
})
