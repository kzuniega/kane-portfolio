import { z } from "zod";

function hasMessageContent(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;|&#x0*a0;/gi, " ")
    .trim();

  return text.length > 0;
}

export const contactFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(254, "Email must be 254 characters or fewer.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(160, "Subject must be 160 characters or fewer.")
    .refine((value) => !/[\r\n]/.test(value), "Subject cannot contain line breaks."),
  body: z
    .string()
    .max(15_000, "Message must be 15,000 characters or fewer.")
    .refine(hasMessageContent, "Write a message."),
  termsAccepted: z.boolean().refine((accepted) => accepted, "Please accept the terms to send your message."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
