'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'

/* ── Schema ── */

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'Invalid mobile number. Try Again!')
    .regex(/^\d{10}$/, 'Invalid mobile number. Try Again!'),
})

type PhoneFormData = z.infer<typeof phoneSchema>

/** Zod-based resolver for react-hook-form */
function zodResolver(schema: typeof phoneSchema) {
  return async (values: PhoneFormData) => {
    const result = schema.safeParse(values)
    if (result.success) {
      return { values: result.data, errors: {} }
    }
    const fieldErrors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      if (!fieldErrors[path]) {
        fieldErrors[path] = { type: 'validation', message: issue.message }
      }
    }
    return { values: {}, errors: fieldErrors }
  }
}

/* ── Helpers ── */

/** Format a raw digit string as (XXX) XXX-XXXX */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/** Strip formatting back to digits only */
function stripPhone(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10)
}

/* ── Component ── */

export function LoginClient() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
    mode: 'onSubmit',
  })

  const phoneValue = watch('phone')
  const isValid = /^\d{10}$/.test(phoneValue)

  function onSubmit() {
    router.push('/verify/')
  }

  return (
    <div className="relative">
      {/* Skip link */}
      <Link
        href="/"
        className="absolute -top-12 right-0 text-sm font-medium text-[#555860] transition-colors hover:text-[#176FEB]"
      >
        Skip
      </Link>

      {/* Heading */}
      <h1 className="font-heading mb-8 text-center text-2xl font-bold tracking-tight text-[#2C2E33]">
        Sign in to{' '}
        <span className="text-[#176FEB]">Revun</span>
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Phone input */}
        <div>
          <div
            className={`flex h-14 items-center overflow-hidden rounded-xl border transition-colors ${
              errors.phone
                ? 'border-[#E7000B]'
                : 'border-[#E5E7EB] focus-within:border-[#176FEB]'
            }`}
          >
            {/* Country code prefix */}
            <span className="flex shrink-0 items-center gap-1.5 border-r border-[#E5E7EB] px-3 text-sm text-[#2C2E33]">
              <span className="text-base" aria-hidden="true">
                &#x1F1E8;&#x1F1E6;
              </span>
              +1
            </span>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="(XXX) XXX-XXXX"
              className="h-full flex-1 bg-transparent px-3 text-sm text-[#2C2E33] outline-none placeholder:text-[#9CA3AF]"
              {...register('phone', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const raw = stripPhone(e.target.value)
                  e.target.value = formatPhone(raw)
                  setValue('phone', raw, { shouldValidate: false })
                },
              })}
              value={formatPhone(phoneValue)}
            />
          </div>

          {errors.phone ? (
            <p className="mt-2 text-xs text-[#E7000B]">{errors.phone.message}</p>
          ) : (
            <p className="mt-2 text-xs text-[#555860]">
              We will send you code to confirm your phone number.
            </p>
          )}
        </div>

        {/* Continue button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`h-14 w-full rounded-xl text-sm font-semibold transition-colors ${
            isValid
              ? 'bg-[#176FEB] text-white hover:bg-[#1260d1]'
              : 'cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]'
          }`}
        >
          Continue
        </button>
      </form>

      {/* OR divider */}
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#E5E7EB]" />
        <span className="text-xs font-medium text-[#9CA3AF]">OR</span>
        <span className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      {/* Social login row */}
      <div className="flex items-center justify-center gap-4">
        {/* Google */}
        <button
          type="button"
          aria-label="Sign in with Google"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98Z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
              fill="#EA4335"
            />
          </svg>
        </button>

        {/* Apple */}
        <button
          type="button"
          aria-label="Sign in with Apple"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="black" aria-hidden="true">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.62-2.2.44-3.06-.4C3.79 16.17 4.36 9.53 8.7 9.28c1.23.06 2.09.7 2.81.73.99-.2 1.93-.77 2.99-.7 1.27.1 2.22.6 2.84 1.5-2.6 1.54-1.98 4.93.36 5.87-.47 1.24-.82 1.85-1.65 2.6ZM12.05 9.2c-.15-2.34 1.84-4.38 4.04-4.2.3 2.58-2.32 4.5-4.04 4.2Z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          aria-label="Sign in with Facebook"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
          </svg>
        </button>

        {/* Email */}
        <button
          type="button"
          aria-label="Sign in with Email"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
        >
          <Mail className="h-5 w-5 text-[#555860]" />
        </button>
      </div>

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-[#555860]">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup/"
          className="font-semibold text-[#176FEB] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
