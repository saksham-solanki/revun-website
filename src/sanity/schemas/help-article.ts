import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'helpArticle',
  title: 'Help Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'Account & Billing', value: 'account-billing' },
          { title: 'Self-Manage', value: 'self-manage' },
          { title: 'Operator', value: 'operator' },
          { title: 'Integrations', value: 'integrations' },
          { title: 'Troubleshooting', value: 'troubleshooting' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'portableContent' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title', subtitle: 'category' } },
})
