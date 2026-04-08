'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

/* ── Schema ── */

const portfolioSizes = ['1-5', '6-25', '26-100', '101-500', '500+'] as const
const roleOptions = ['Owner', 'Property Manager', 'Tenant', 'Brokerage', 'Maintenance', 'Other'] as const

interface ContactFormData {
  name: string
  email: string
  company?: string
  portfolio_size: (typeof portfolioSizes)[number]
  role: (typeof roleOptions)[number]
  message: string
}

const portfolioSizeLabels: Record<(typeof portfolioSizes)[number], string> = {
  '1-5': '1-5 units',
  '6-25': '6-25 units',
  '26-100': '26-100 units',
  '101-500': '101-500 units',
  '500+': '500+ units',
}

/* ── Shared styles ── */

const inputClasses =
  'h-10 w-full rounded-lg border border-[#D3D5DB] bg-transparent px-3 py-2 text-sm text-[#2C2E33] outline-none transition-colors placeholder:text-[#555860] focus:border-[#176FEB] focus:ring-2 focus:ring-[#176FEB]/30 disabled:cursor-not-allowed disabled:opacity-50'

const selectClasses =
  'flex h-10 w-full appearance-none rounded-lg border border-[#D3D5DB] bg-transparent px-3 py-2 text-sm text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] focus:ring-2 focus:ring-[#176FEB]/30'

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
      portfolio_size: '1-5',
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
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5EA500]/10">
          <CheckCircle2 className="h-7 w-7 text-[#5EA500]" />
        </div>
        <h3 className="text-lg font-bold text-[#0A1628]">
          Message sent
        </h3>
        <p className="max-w-xs text-sm text-[#555860]">
          {serverMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm font-medium text-[#176FEB] hover:text-[#176FEB]/80"
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
          className={inputClasses}
          aria-invalid={!!errors.name}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
        {errors.name && (
          <p className="text-xs text-[#E7000B]">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          className={inputClasses}
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
          <p className="text-xs text-[#E7000B]">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-company">
          Company <span className="text-[#555860]">(optional)</span>
        </Label>
        <Input
          id="contact-company"
          placeholder="Your company name"
          className={inputClasses}
          {...register('company')}
        />
      </div>

      {/* Portfolio Size */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-portfolio-size">Portfolio Size</Label>
        <select
          id="contact-portfolio-size"
          className={selectClasses}
          aria-invalid={!!errors.portfolio_size}
          {...register('portfolio_size', { required: 'Please select a portfolio size' })}
        >
          {portfolioSizes.map((size) => (
            <option key={size} value={size}>
              {portfolioSizeLabels[size]}
            </option>
          ))}
        </select>
        {errors.portfolio_size && (
          <p className="text-xs text-[#E7000B]">{errors.portfolio_size.message}</p>
        )}
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-role">Role</Label>
        <select
          id="contact-role"
          className={selectClasses}
          aria-invalid={!!errors.role}
          {...register('role', { required: 'Please select a role' })}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="text-xs text-[#E7000B]">{errors.role.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="How can we help?"
          className="min-h-[120px] w-full rounded-lg border border-[#D3D5DB] bg-transparent px-3 py-2 text-sm text-[#2C2E33] outline-none transition-colors placeholder:text-[#555860] focus:border-[#176FEB] focus:ring-2 focus:ring-[#176FEB]/30"
          aria-invalid={!!errors.message}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'Message must be at least 10 characters' },
          })}
        />
        {errors.message && (
          <p className="text-xs text-[#E7000B]">{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-lg border border-[#E7000B]/20 bg-[#E7000B]/5 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E7000B]" />
          <p className="text-sm text-[#E7000B]">{serverMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-all hover:bg-[#0B5AD4] disabled:cursor-not-allowed disabled:opacity-60"
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
