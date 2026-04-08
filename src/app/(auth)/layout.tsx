import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Image
              src="/logo-dark.svg"
              alt="Revun"
              width={120}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>
        </div>

        {children}

        {/* Language selector */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#555860] transition-colors duration-200 hover:border-[#176FEB]/30"
          >
            <span className="text-base">🇬🇧</span>
            English
          </button>
        </div>
      </div>
    </div>
  )
}
