import { contact } from "@/data/contact";
import { Arrow } from "@/components/Arrow";
import { FaEnvelope, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="contact-section page-shell">
      <div className="contact-layout">
        <div className="flex items-center justify-center self-stretch text-center">
          <h2 id="contact-heading" className="contact-heading">
            Let’s build <span>and connect.</span>
          </h2>
        </div>
        <div className="contact-links">
          <p className="eyebrow">Start a conversation</p>
          <a href={`mailto:${contact.email}`} className="contact-link" aria-label="Email Kane Zuniega">
            <span className="contact-link-label"><FaEnvelope className="contact-icon" aria-hidden="true" focusable="false" /><span>Email</span></span>
            <Arrow />
          </a>
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
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {contact.name}</p>
      </div>
    </footer>
  );
}
