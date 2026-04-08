'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be 10 digits'),
})

type SignUpFormData = z.infer<typeof signupSchema>

function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`
}

function extractDigits(formatted: string): string {
  return formatted.replace(/\D/g, '')
}

export function SignUpClient() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const phoneValue = watch('phone')
  const phoneDisplay = formatPhoneInput(phoneValue)

  const onSubmit = async (data: SignUpFormData) => {
    const params = new URLSearchParams({ email: data.email })
    router.push(`/password/?${params.toString()}`)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = extractDigits(e.target.value)
    setValue('phone', raw, { shouldValidate: true })
  }

  return (
    <div>
      <h1 className="mb-6 text-center font-heading text-2xl font-bold tracking-tight text-[#10171E]">
        Create your <span className="text-[#176FEB]">Revun</span> account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#555860]">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className={`h-14 w-full rounded-xl border px-4 text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] ${
              errors.name ? 'border-[#E7000B]' : 'border-[#E5E7EB]'
            }`}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-[#E7000B]">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#555860]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`h-14 w-full rounded-xl border px-4 text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] ${
              errors.email ? 'border-[#E7000B]' : 'border-[#E5E7EB]'
            }`}
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-[#E7000B]">{errors.email.message}</p>
          ) : (
            <p className="mt-1 text-sm text-[#555860]">
              You&apos;ll need to confirm this email later
            </p>
          )}
        </div>

        {/* Phone number */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[#555860]">
            Phone number
          </label>
          <div className="relative">
            {/* Country prefix */}
            <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-sm text-[#2C2E33]">
              <span className="text-base">🇨🇦</span>
              <span>+1</span>
            </div>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(416) 123 - 4567"
              value={phoneDisplay}
              onChange={handlePhoneChange}
              className={`h-14 w-full rounded-xl border pl-[4.5rem] pr-4 text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] ${
                errors.phone ? 'border-[#E7000B]' : 'border-[#E5E7EB]'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-[#E7000B]">{errors.phone.message}</p>
          )}
        </div>

        {/* Continue button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`h-14 w-full rounded-xl font-heading text-base font-semibold transition-colors ${
            isValid
              ? 'bg-[#176FEB] text-white hover:bg-[#1260D1]'
              : 'cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]'
          }`}
        >
          Continue
        </button>
      </form>

      {/* OR divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E5E7EB]" />
        <span className="text-sm font-medium text-[#9CA3AF]">OR</span>
        <div className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      {/* Social signup buttons */}
      <div className="flex justify-center gap-4">
        {/* Google */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
          aria-label="Sign up with Google"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
          aria-label="Sign up with Apple"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors hover:border-[#176FEB]/30"
          aria-label="Sign up with Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
          </svg>
        </button>
      </div>

      {/* Sign in link */}
      <p className="mt-8 text-center text-sm text-[#555860]">
        Already have an account?{' '}
        <Link href="/login/" className="font-semibold text-[#176FEB] hover:text-[#1260D1]">
          Sign in
        </Link>
      </p>
    </div>
  )
}
