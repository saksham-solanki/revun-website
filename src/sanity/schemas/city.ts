import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'province', title: 'Province / State', type: 'reference', to: [{ type: 'province' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'population', title: 'Population', type: 'number' }),
    defineField({ name: 'rentalMarketSize', title: 'Rental Market Size', type: 'string', description: 'E.g., "45,000+ rental units"' }),
    defineField({ name: 'averageRent', title: 'Average Rent', type: 'number', description: 'Average monthly rent for a 1-bedroom' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() })] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls' }),
  ],
  preview: { select: { title: 'title', subtitle: 'province.title' } },
})
