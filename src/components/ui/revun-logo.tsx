import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface RevunLogoProps {
  /** Height class — e.g. "h-8", "h-9", "h-7" */
  size?: string
  /** Wrap in a Link to "/" */
  linked?: boolean
  className?: string
}

/**
 * Revun brand logo — uses the exact Revun Logo.png (Instrument Sans Bold,
 * white text on blue background). Single source of truth for every logo
 * placement across the site.
 */
export function RevunLogo({ size = 'h-8', linked = true, className }: RevunLogoProps) {
  const logo = (
    <Image
      src="/revun-logo.png"
      alt="Revun"
      width={140}
      height={44}
      priority
      className={cn('w-auto rounded', size, className)}
    />
  )

  if (!linked) return logo

  return (
    <Link
      href="/"
      className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
    >
      {logo}
    </Link>
  )
}
