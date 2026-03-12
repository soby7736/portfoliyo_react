import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import emailjs from "@emailjs/browser";
import "./Contacts.css";

const CONTACT_LINKS = [
  {
    icon: "bi-envelope-fill",
    label: "Email",
    href: "mailto:sobyfrancis90@gmail.com",
    display: "sobyfrancis90@gmail.com",
    type: "email",
  },
  {
    icon: "bi-linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sobyfrancis/",
    display: "linkedin.com/in/sobyfrancis",
    type: "linkedin",
  },
  {
    icon: "bi-github",
    label: "GitHub",
    href: "https://github.com/soby7736",
    display: "github.com/soby7736",
    type: "github",
  },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_soby_portfolio", // your service ID
        "template_ir8ybd9", // your template ID
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "5S92BMjX0l8U94InV",
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Email error:", error);
      });
  };
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Header */}
        <div className="text-center contact-header">
          <p className="contact-subtitle">Get In Touch</p>
          <h2 className="contact-title">Contact Me</h2>
          <div className="contact-divider" />
        </div>

        {/* Two-column layout */}
        <div className="contact-layout">
          {/* Left — contact cards */}
          <div className="contact-cards">
            {CONTACT_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.type !== "email" ? "_blank" : undefined}
                rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                className={`contact-card contact-card--${link.type}`}
              >
                <div className="contact-card-icon">
                  <i className={`bi ${link.icon}`} />
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">{link.label}</span>
                  <span className="contact-card-display">{link.display}</span>
                </div>
                <i className="bi bi-arrow-up-right contact-card-arrow" />
              </a>
            ))}
          </div>

          {/* Right — message form */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  className="contact-send-btn"
                  onClick={() => setSent(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="cf-name">Your Name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="cf-email">Email Address</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="contact-form-group">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`contact-send-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="contact-spinner" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
