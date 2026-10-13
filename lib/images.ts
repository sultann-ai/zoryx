/** Content marks missing images with bracketed placeholders like "[OWNER PHOTO]". */
export function isPlaceholderImage(value: string): boolean {
  return value.startsWith("[");
}
