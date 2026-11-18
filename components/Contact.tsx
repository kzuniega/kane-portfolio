import { contact } from "@/data/contact";
import { Arrow } from "@/components/Arrow";
import { ContactForm } from "@/components/ContactForm";
import { DailyViewerCount } from "@/components/DailyViewerCount";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="contact-section page-shell">
      <div className="contact-layout">
        <div className="contact-intro">
          <h2 id="contact-heading" className="contact-heading">
            Let’s build <span>and connect.</span>
          </h2>
          <div className="contact-links">
            <p className="eyebrow">Profiles</p>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Kane Zuniega on LinkedIn (opens in a new tab)" className="contact-link">
              <span className="contact-link-label"><FaLinkedinIn className="contact-icon" aria-hidden="true" focusable="false" /><span>LinkedIn</span></span>
              <Arrow />
            </a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Kane Zuniega on Facebook (opens in a new tab)" className="contact-link">
              <span className="contact-link-label"><FaFacebookF className="contact-icon" aria-hidden="true" focusable="false" /><span>Facebook</span></span>
              <Arrow />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {contact.name}</p>
        <DailyViewerCount />
      </div>
    </footer>
  );
}
