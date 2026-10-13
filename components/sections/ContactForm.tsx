"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactPage } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { buildDemoMessage, buildWhatsAppLink } from "@/lib/whatsapp";

type FieldName = "name" | "shopName" | "area" | "phone" | "businessType" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: Values = { name: "", shopName: "", area: "", phone: "", businessType: "", message: "" };
const REQUIRED: FieldName[] = ["name", "shopName", "phone"];
// 03XXXXXXXXX or +923XXXXXXXXX (FR-C4)
const PHONE_PATTERN = /^(03\d{9}|\+923\d{9})$/;

const control =
  "text-body min-h-12 w-full rounded-md border border-green/40 bg-white px-4 py-3 text-ink aria-[invalid=true]:border-tomato aria-[invalid=true]:border-2";

function validate(values: Values): Errors {
  const errors: Errors = {};
  for (const field of REQUIRED) {
    if (!values[field].trim()) errors[field] = contactPage.validation.required;
  }
  if (!errors.phone && !PHONE_PATTERN.test(values.phone.replace(/[\s-]/g, ""))) {
    errors.phone = contactPage.validation.phone;
  }
  return errors;
}

export function ContactForm() {
  const { form } = contactPage;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      // No form service configured: hand the details to WhatsApp instead.
      trackEvent("whatsapp_click", { location: "contact_form" });
      window.open(buildWhatsAppLink(buildDemoMessage(values)), "_blank", "noopener,noreferrer");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      trackEvent("form_submit");
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (field: FieldName) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onChange: (event: { target: { value: string } }) => update(field, event.target.value),
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="space-y-6">
      <FormField id="contact-name" label={form.nameLabel} required error={errors.name}>
        <input type="text" autoComplete="name" required aria-required="true" className={control} {...fieldProps("name")} />
      </FormField>
      <FormField id="contact-shopName" label={form.shopNameLabel} required error={errors.shopName}>
        <input type="text" autoComplete="organization" required aria-required="true" className={control} {...fieldProps("shopName")} />
      </FormField>
      <FormField id="contact-area" label={form.areaLabel}>
        <input type="text" autoComplete="address-level2" className={control} {...fieldProps("area")} />
      </FormField>
      <FormField id="contact-phone" label={form.phoneLabel} required error={errors.phone}>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-required="true"
          className={control}
          {...fieldProps("phone")}
        />
      </FormField>
      <FormField id="contact-businessType" label={form.businessTypeLabel}>
        <select className={control} {...fieldProps("businessType")}>
          <option value="">—</option>
          {form.businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="contact-message" label={form.messageLabel}>
        <textarea rows={4} className={`${control} resize-y`} {...fieldProps("message")} />
      </FormField>

      <Button type="submit" variant="onCream" disabled={status === "sending"} className="w-full sm:w-auto">
        {form.submitLabel}
      </Button>

      {status === "success" ? (
        <p role="status" className="text-body rounded-md bg-green/10 p-4 font-bold text-green">
          {contactPage.successMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-body rounded-md border-2 border-tomato p-4 font-bold text-ink">
          {contactPage.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
