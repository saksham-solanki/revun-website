import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const type = body?._type

    if (type) {
      revalidateTag(type, 'default')
    }

    return NextResponse.json({ revalidated: true, type })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
