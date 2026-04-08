'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil } from 'lucide-react'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)} - ${digits.slice(7)}`
  }
  return raw
}

const CODE_LENGTH = 6

export function VerifyClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const phoneRaw = searchParams.get('phone') ?? ''
  const phoneDisplay = phoneRaw ? formatPhone(phoneRaw) : '+1 (416) 123 - 4567'

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [submitting, setSubmitting] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const allFilled = digits.every((d) => d !== '')

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const id = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [countdown])

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus()
  }, [])

  const updateDigit = useCallback(
    (index: number, value: string) => {
      setError(false)
      setDigits((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    },
    [],
  )

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Allow only single digit
      const digit = value.replace(/\D/g, '').slice(-1)
      updateDigit(index, digit)
      if (digit && index < CODE_LENGTH - 1) {
        focusInput(index + 1)
      }
    },
    [updateDigit, focusInput],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (digits[index]) {
          updateDigit(index, '')
        } else if (index > 0) {
          updateDigit(index - 1, '')
          focusInput(index - 1)
        }
        e.preventDefault()
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
        e.preventDefault()
      } else if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
        focusInput(index + 1)
        e.preventDefault()
      }
    },
    [digits, updateDigit, focusInput],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
      if (!pasted) return
      setError(false)
      const newDigits = Array(CODE_LENGTH).fill('')
      for (let i = 0; i < pasted.length; i++) {
        newDigits[i] = pasted[i]
      }
      setDigits(newDigits)
      // Focus last filled or next empty
      const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1)
      focusInput(focusIdx)
    },
    [focusInput],
  )

  const handleResend = useCallback(() => {
    if (countdown > 0) return
    setCountdown(60)
    setDigits(Array(CODE_LENGTH).fill(''))
    setError(false)
    focusInput(0)
  }, [countdown, focusInput])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!allFilled || submitting) return

      setSubmitting(true)
      // Simulate verification - replace with real API call
      const code = digits.join('')
      // For now, any 6-digit code is "valid" except 000000
      await new Promise((resolve) => setTimeout(resolve, 600))

      if (code === '000000') {
        setError(true)
        setSubmitting(false)
        return
      }

      router.push('/')
    },
    [allFilled, submitting, digits, router],
  )

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h1 className="mb-2 text-center font-heading text-2xl font-bold text-[#10171E]">
        Enter code
      </h1>

      <p className="mb-8 text-center text-sm text-[#555860]">
        We sent 6-digit code to {phoneDisplay}
      </p>

      {/* OTP inputs */}
      <div className="mb-2 flex justify-center gap-3">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className={`h-14 w-14 rounded-xl border text-center font-heading text-xl outline-none transition-colors ${
              error
                ? 'border-[#E7000B] bg-[#E7000B]/5'
                : 'border-[#E5E7EB] bg-white focus:border-[#176FEB]'
            }`}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="mb-4 text-center text-sm text-[#E7000B]">
          This code is invalid. Please check and try again.
        </p>
      )}

      {!error && <div className="mb-4" />}

      {/* Verify button */}
      <button
        type="submit"
        disabled={!allFilled || submitting}
        className={`h-14 w-full rounded-xl font-sans text-base font-semibold transition-colors ${
          allFilled && !submitting
            ? 'bg-[#176FEB] text-white hover:bg-[#1260D1]'
            : 'cursor-not-allowed bg-[#E5E7EB] text-[#9CA3AF]'
        }`}
      >
        {submitting ? 'Verifying...' : 'Verify'}
      </button>

      {/* Bottom row */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className={`text-sm underline ${
              countdown > 0
                ? 'cursor-not-allowed text-[#9CA3AF]'
                : 'text-[#176FEB] hover:text-[#1260D1]'
            }`}
          >
            Resend code
          </button>
          {countdown > 0 && (
            <span className="text-sm text-[#9CA3AF]">{countdown} Sec</span>
          )}
        </div>

        <Link
          href="/login/"
          className="inline-flex items-center gap-1.5 text-sm text-[#555860] hover:text-[#10171E]"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit phone number
        </Link>
      </div>
    </form>
  )
}
