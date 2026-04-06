import { NextResponse } from 'next/server'
import { z } from 'zod/v4'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  company: z.string().optional(),
  role: z.enum([
    'Owner',
    'PMC',
    'Brokerage',
    'Agent',
    'Maintenance',
    'REIT',
    'Other',
  ]),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs and try again.' },
        { status: 400 },
      )
    }

    const { name, email, company, role, message } = parsed.data

    // Log for now. Replace with email service (Resend, SendGrid, etc.) later.
    console.log('[Contact Form Submission]', {
      name,
      email,
      company: company || '(none)',
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
