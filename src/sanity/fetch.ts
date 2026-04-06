import { client } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: { tags },
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null as T
  }
}
