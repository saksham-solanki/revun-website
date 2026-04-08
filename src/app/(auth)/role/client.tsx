'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, Building2, Briefcase } from 'lucide-react'

const roles = [
  {
    id: 'renter',
    title: "I'm Looking for a Home",
    description:
      'Browse listings, book showings, chat, apply, pay rent, and access secure documents.',
    icon: Home,
    href: '/',
  },
  {
    id: 'owner',
    title: 'I Own or Manage Property',
    description:
      'Find tenants, manage rentals, track maintenance, and collect payments.',
    icon: Building2,
    href: '/',
  },
  {
    id: 'realtor',
    title: "I'm a Realtor",
    description:
      'Manage leads while Revun handles paperwork, CRM and communication.',
    icon: Briefcase,
    href: '/',
  },
] as const

export function RoleClient() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(role: (typeof roles)[number]) {
    setSelected(role.id)
    router.push(role.href)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Heading */}
      <h1 className="font-heading text-center text-2xl font-bold text-[#0A1628]">
        Choose your role to get started
      </h1>
      <p className="mt-2 text-center text-sm text-[#555860]">
        We'll personalize your experience based on what you want to do in Revun.
      </p>

      {/* Role cards */}
      <div className="mt-8 flex w-full flex-col gap-3">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selected === role.id

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleSelect(role)}
              className={`flex w-full cursor-pointer items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#176FEB] bg-[#E8F2FE]/50'
                  : 'border-[#E5E7EB] hover:border-[#176FEB]/30 hover:bg-[#E8F2FE]/30'
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FE]">
                <Icon className="h-6 w-6 text-[#176FEB]" />
              </div>
              <div>
                <span className="font-heading text-base font-semibold text-[#0A1628]">
                  {role.title}
                </span>
                <p className="mt-1 text-sm text-[#555860]">
                  {role.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-[#555860]">
        By continuing, you agree to our{' '}
        <Link href="/terms/" className="underline hover:text-[#176FEB]">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy/" className="underline hover:text-[#176FEB]">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
