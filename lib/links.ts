/** "DEMO: +92 300 0000000" -> "tel:+923000000000" */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** "DEMO: hello@zoryx.dev" -> "mailto:hello@zoryx.dev" */
export function mailtoHref(email: string): string {
  const address = email.match(/[^\s:]+@[^\s]+/)?.[0] ?? email;
  return `mailto:${address}`;
}

/** True once a placeholder like "[INSTAGRAM URL]" has been replaced by a real URL. */
export function isRealUrl(value: string): boolean {
  return value.startsWith("https://") || value.startsWith("http://");
}
