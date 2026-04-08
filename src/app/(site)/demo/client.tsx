'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod/v4'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

/* ── Schema ── */

const unitCounts = ['1-5', '6-20', '21-50', '51-100', '100+'] as const
const roleOptions = ['Self-Managing Owner', 'Property Manager', 'Broker/Agent', 'Other'] as const

const demoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid work email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  company: z.string().min(1, 'Company name is required'),
  units: z.enum(unitCounts),
  role: z.enum(roleOptions),
})

type DemoFormData = z.infer<typeof demoSchema>

const unitLabels: Record<(typeof unitCounts)[number], string> = {
  '1-5': '1-5 units',
  '6-20': '6-20 units',
  '21-50': '21-50 units',
  '51-100': '51-100 units',
  '100+': '100+ units',
}

/* ── Shared styles ── */

const inputClasses =
  'h-10 w-full rounded-lg border border-[#D3D5DB] bg-transparent px-3 py-2 text-sm text-[#2C2E33] outline-none transition-colors placeholder:text-[#555860] focus:border-[#176FEB] focus:ring-2 focus:ring-[#176FEB]/30 disabled:cursor-not-allowed disabled:opacity-50'

const selectClasses =
  'flex h-10 w-full appearance-none rounded-lg border border-[#D3D5DB] bg-transparent px-3 py-2 text-sm text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] focus:ring-2 focus:ring-[#176FEB]/30'

/* ── Component ── */

export function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      units: '1-5',
      role: 'Self-Managing Owner',
    },
  })

  async function onSubmit(_data: DemoFormData) {
    setStatus('loading')

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setStatus('success')
    reset()
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5EA500]/10">
          <CheckCircle2 className="h-7 w-7 text-[#5EA500]" />
        </div>
        <h3 className="text-lg font-bold text-[#0A1628]">
          Demo request received
        </h3>
        <p className="max-w-xs text-sm text-[#555860]">
          We will reach out within 24 hours to schedule your personalized demo.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm font-medium text-[#176FEB] hover:text-[#176FEB]/80"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Full Name */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-name">Full name</Label>
        <Input
          id="demo-name"
          placeholder="Jane Smith"
          className={inputClasses}
          aria-invalid={!!errors.name}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
        {errors.name && (
          <p className="text-xs text-[#E7000B]">{errors.name.message}</p>
        )}
      </div>

      {/* Work Email */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-email">Work email</Label>
        <Input
          id="demo-email"
          type="email"
          placeholder="jane@company.com"
          className={inputClasses}
          aria-invalid={!!errors.email}
          {...register('email', {
            required: 'Work email is required',
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

      {/* Phone Number */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-phone">Phone number</Label>
        <Input
          id="demo-phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={inputClasses}
          aria-invalid={!!errors.phone}
          {...register('phone', {
            required: 'Phone number is required',
            minLength: { value: 7, message: 'Please enter a valid phone number' },
          })}
        />
        {errors.phone && (
          <p className="text-xs text-[#E7000B]">{errors.phone.message}</p>
        )}
      </div>

      {/* Company Name */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-company">Company name</Label>
        <Input
          id="demo-company"
          placeholder="Acme Property Management"
          className={inputClasses}
          aria-invalid={!!errors.company}
          {...register('company', {
            required: 'Company name is required',
          })}
        />
        {errors.company && (
          <p className="text-xs text-[#E7000B]">{errors.company.message}</p>
        )}
      </div>

      {/* Number of Units */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-units">Number of units</Label>
        <select
          id="demo-units"
          className={selectClasses}
          aria-invalid={!!errors.units}
          {...register('units', { required: 'Please select a unit count' })}
        >
          {unitCounts.map((count) => (
            <option key={count} value={count}>
              {unitLabels[count]}
            </option>
          ))}
        </select>
        {errors.units && (
          <p className="text-xs text-[#E7000B]">{errors.units.message}</p>
        )}
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <Label htmlFor="demo-role">Role</Label>
        <select
          id="demo-role"
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

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-lg border border-[#E7000B]/20 bg-[#E7000B]/5 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E7000B]" />
          <p className="text-sm text-[#E7000B]">Something went wrong. Please try again.</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#176FEB] px-8 text-base font-semibold text-white transition-all hover:bg-[#0B5AD4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book My Demo'
        )}
      </button>

      <p className="text-center text-xs text-[#555860]">
        We will reach out within 24 hours to schedule your demo.
      </p>
    </form>
  )
}
