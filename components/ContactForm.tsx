"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormInputValues, type ContactFormValues } from "@/lib/contact-schema";

type SubmissionStatus = {
  message: string;
  type: "success" | "error";
};

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormInputValues, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      body: "",
      termsAccepted: false,
    },
  });
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor: currentEditor }) => {
      setValue("body", currentEditor.getHTML(), { shouldDirty: true, shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class: "contact-editor-content",
        role: "textbox",
      "aria-label": "Give me a message",
        "aria-multiline": "true",
      },
    },
  });

  async function submitMessage(values: ContactFormValues) {
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setStatus({ type: "error", message: "Your message could not be sent. Please try again later." });
        return;
      }

      reset();
      editor?.commands.clearContent(false);
      setStatus({ type: "success", message: "Thanks for reaching out. Your message has been sent." });
    } catch {
      setStatus({
        type: "error",
        message: "Your message could not be sent. Please check your connection and try again.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(submitMessage)} noValidate>
      <p className="eyebrow">Send a message</p>
      <div className="contact-form-field">
        <label htmlFor="contact-name">Name (Optional)</label>
        <input
          {...register("name")}
          id="contact-name"
          type="text"
          autoComplete="name"
          maxLength={120}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && <p id="contact-name-error" className="contact-field-error">{errors.name.message}</p>}
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          {...register("email")}
          id="contact-email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && <p id="contact-email-error" className="contact-field-error">{errors.email.message}</p>}
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-subject">Subject</label>
        <input
          {...register("subject")}
          id="contact-subject"
          type="text"
          maxLength={160}
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
        {errors.subject && <p id="contact-subject-error" className="contact-field-error">{errors.subject.message}</p>}
      </div>
      <div className="contact-form-field">
        <span id="contact-body-label">Give me a message</span>
        <div className="contact-editor">
          <div className="contact-editor-toolbar" aria-label="Text formatting">
            <button
              type="button"
              aria-label="Bold"
              aria-pressed={editor?.isActive("bold") ?? false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={!editor}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              aria-label="Italic"
              aria-pressed={editor?.isActive("italic") ?? false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              disabled={!editor}
            >
              <em>I</em>
            </button>
            <button
              type="button"
              aria-label="Bulleted list"
              aria-pressed={editor?.isActive("bulletList") ?? false}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              disabled={!editor}
            >
              • List
            </button>
          </div>
          <EditorContent editor={editor} />
        </div>
        {errors.body && <p className="contact-field-error">{errors.body.message}</p>}
      </div>
      <label className="contact-terms">
        <input
          {...register("termsAccepted")}
          type="checkbox"
          aria-invalid={Boolean(errors.termsAccepted)}
          aria-describedby={errors.termsAccepted ? "contact-terms-error" : undefined}
        />
        <span>I agree to be contacted about this inquiry</span>
      </label>
      {errors.termsAccepted && <p id="contact-terms-error" className="contact-field-error">{errors.termsAccepted.message}</p>}
      <button className="contact-submit" type="submit" disabled={!isValid || !editor || isSubmitting}>
        {isSubmitting ? "Sending…" : "Submit"}
      </button>
      <p className="contact-form-status" role="status" aria-live="polite" data-error={status?.type === "error" || undefined}>
        {status?.message}
      </p>
    </form>
  );
}
