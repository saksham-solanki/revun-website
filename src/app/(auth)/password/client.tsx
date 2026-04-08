'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

const rules = [
  { label: '8-25 Characters only', test: (p: string) => p.length >= 8 && p.length <= 25 },
  { label: '1 Number', test: (p: string) => /\d/.test(p) },
  { label: '1 Uppercase', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Special character', test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  { label: 'No space', test: (p: string) => !/\s/.test(p) },
  { label: '1 Lowercase', test: (p: string) => /[a-z]/.test(p) },
]

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(25, 'Password must be at most 25 characters')
      .regex(/\d/, 'Must contain at least 1 number')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Must contain at least 1 lowercase letter')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least 1 special character')
      .regex(/^\S+$/, 'Must not contain spaces'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

export function PasswordClient() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const allRulesMet = rules.every((rule) => rule.test(password))
  const passwordsMatch = password.length > 0 && password === confirmPassword
  const isFormValid = allRulesMet && passwordsMatch

  const onSubmit = async (_data: PasswordFormData) => {
    router.push('/')
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold tracking-tight text-[#2C2E33]">
        Set your password
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New password field */}
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#2C2E33]">
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="h-14 w-full rounded-xl border border-[#E5E7EB] px-4 pr-12 text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB]"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#555860]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Password requirement tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {rules.map((rule) => {
              const met = rule.test(password)
              const typed = password.length > 0

              let colorClass = 'text-[#555860]'
              if (typed) {
                colorClass = met ? 'text-[#5EA500]' : 'text-[#E7000B]'
              }

              return (
                <span
                  key={rule.label}
                  className={`inline-flex items-center gap-1 text-sm ${colorClass}`}
                >
                  {typed &&
                    (met ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    ))}
                  {rule.label}
                </span>
              )
            })}
          </div>
        </div>

        {/* Confirm password field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-medium text-[#2C2E33]"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className={`h-14 w-full rounded-xl border px-4 pr-12 text-[#2C2E33] outline-none transition-colors focus:border-[#176FEB] ${
                confirmPassword.length > 0 && !passwordsMatch
                  ? 'border-[#E7000B]'
                  : 'border-[#E5E7EB]'
              }`}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#555860]"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-sm text-[#E7000B]">Passwords do not match.</p>
          )}
        </div>

        {/* Confirm button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`h-14 w-full rounded-xl text-base font-semibold transition-colors ${
            isFormValid
              ? 'bg-[#176FEB] text-white hover:bg-[#1260d4]'
              : 'cursor-not-allowed bg-[#E5E7EB] text-[#555860]'
          }`}
        >
          Confirm
        </button>
      </form>
    </div>
  )
}
