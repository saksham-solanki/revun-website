import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildCanonicalUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://revun.com'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const withTrailingSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
  return `${base}${withTrailingSlash}`
}

export function sanitizeJsonLd(obj: Record<string, unknown>): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

export function formatCurrency(amount: number, currency = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
