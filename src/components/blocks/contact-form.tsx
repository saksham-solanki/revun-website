'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod/v4'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

/* ── Schema ── */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
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
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const roles = [
  { value: 'Owner', label: 'Owner' },
  { value: 'PMC', label: 'Property Management Company' },
  { value: 'Brokerage', label: 'Brokerage' },
  { value: 'Agent', label: 'Agent' },
  { value: 'Maintenance', label: 'Maintenance / Vendor' },
  { value: 'REIT', label: 'REIT / Institutional' },
  { value: 'Other', label: 'Other' },
] as const

/* ── Component ── */

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: 'Owner',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    setServerMessage('')

    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setStatus('error')
        setServerMessage(json.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setServerMessage(json.message || 'Message sent successfully.')
      reset()
    } catch {
      setStatus('error')
      setServerMessage('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="font-heading text-lg font-bold text-brand-indigo">
          Message sent
        </h3>
        <p className="max-w-xs text-sm text-brand-slate-600">
          {serverMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm font-medium text-brand-violet hover:text-brand-violet-dark"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          placeholder="Your full name"
          className="h-10"
          aria-invalid={!!errors.name}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          className="h-10"
          aria-invalid={!!errors.email}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-company">
          Company <span className="text-brand-slate-400">(optional)</span>
        </Label>
        <Input
          id="contact-company"
          placeholder="Your company name"
          className="h-10"
          {...register('company')}
        />
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-role">Role</Label>
        <select
          id="contact-role"
          className="flex h-10 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-invalid={!!errors.role}
          {...register('role', { required: 'Please select a role' })}
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-xs text-destructive">{errors.role.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="How can we help?"
          className="min-h-[120px]"
          aria-invalid={!!errors.message}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{serverMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="cta-primary-shadow inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-violet px-8 text-base font-semibold text-white transition-all hover:bg-brand-violet-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
