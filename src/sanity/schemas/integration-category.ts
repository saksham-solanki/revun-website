import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'integrationCategory',
  title: 'Integration Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name' } },
})
