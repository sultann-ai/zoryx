import { contactPage, site } from "@/content/site";

export interface DemoMessageInput {
  name?: string;
  shopName?: string;
  area?: string;
  businessType?: string;
  message?: string;
}

/** Builds a wa.me link. Falls back to the default message from content. */
export function buildWhatsAppLink(message?: string): string {
  const number = site.whatsappNumber.replace(/\D/g, "");
  const text = message ?? site.defaultWhatsAppMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Builds the pre-filled WhatsApp message from contact form fields. */
export function buildDemoMessage({
  name,
  shopName,
  area,
  businessType,
  message,
}: DemoMessageInput): string {
  const { form } = contactPage;
  const lines = [
    site.demoMessageIntro,
    name && `${form.nameLabel}: ${name}`,
    shopName && `${form.shopNameLabel}: ${shopName}`,
    area && `${form.areaLabel}: ${area}`,
    businessType && `${form.businessTypeLabel}: ${businessType}`,
    message,
  ];
  return lines.filter(Boolean).join("\n");
}
