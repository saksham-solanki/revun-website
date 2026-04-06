export type GTMEvent =
  | { event: 'book_demo'; page: string; audience?: string }
  | { event: 'start_trial'; page: string; package?: string }
  | { event: 'enterprise_consultation'; page: string }
  | { event: 'self_manage_signup'; page: string; tier?: string }
  | { event: 'compare_click'; page: string; competitor: string }
  | { event: 'integration_click'; page: string; integration: string }
  | { event: 'pricing_tab_switch'; page: string; tab: string }
  | { event: 'contact_form_submit'; page: string; inquiry_type: string }
  | { event: 'scroll_depth'; page: string; depth: 25 | 50 | 75 | 100 }
  | { event: 'outbound_click'; page: string; url: string; link_text: string }
  | { event: 'phone_click'; page: string; phone_number: string }
  | { event: 'email_click'; page: string; email_address: string }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function pushEvent(event: GTMEvent): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event as Record<string, unknown>)
  }
}

export function trackOutboundClick(url: string, linkText: string): void {
  pushEvent({
    event: 'outbound_click',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    url,
    link_text: linkText,
  })
}

export function trackDemoRequest(audience?: string): void {
  pushEvent({
    event: 'book_demo',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    audience,
  })
}
