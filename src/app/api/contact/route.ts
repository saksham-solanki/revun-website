import { NextResponse } from 'next/server'
import { z } from 'zod/v4'

/* ── Simple in-memory rate limiter ─────────────────────────────────────────── */
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5 // max 5 requests per window per IP
const ipRequestMap = new Map<string, { count: number; resetAt: number }>()

let lastCleanup = Date.now()

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  // Lazily clean up stale entries instead of using setInterval
  // (setInterval at module scope prevents clean shutdown in serverless)
  if (now - lastCleanup > RATE_LIMIT_WINDOW_MS * 2) {
    for (const [key, entry] of ipRequestMap) {
      if (now > entry.resetAt) ipRequestMap.delete(key)
    }
    lastCleanup = now
  }

  const entry = ipRequestMap.get(ip)

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email(),
  company: z.string().max(200).optional(),
  portfolio_size: z.enum(['1-5', '6-25', '26-100', '101-500', '500+']),
  role: z.enum([
    'Owner',
    'Property Manager',
    'Tenant',
    'Brokerage',
    'Maintenance',
    'Other',
  ]),
  message: z.string().min(10).max(5000),
})

export async function POST(request: Request) {
  try {
    /* ── Rate limiting ───────────────────────────────────────────────────── */
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 },
      )
    }
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400 },
      )
    }

    const { name, email, company, portfolio_size, role, message } = parsed.data

    // TODO: Replace with email service (Resend, SendGrid, etc.)
    // eslint-disable-next-line no-console
    console.info('[Contact Form Submission]', {
      name,
      email,
      company: company || '(none)',
      portfolio_size,
      role,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Thank you. We will be in touch within one business day.' },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
