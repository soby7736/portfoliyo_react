import { useState, useEffect } from "react";
import "./Nav.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  /* navbar shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* highlight active section */
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = NAV_LINKS.findIndex(
              (link) => link.href.replace("#", "") === entry.target.id,
            );

            if (index !== -1) {
              setActiveIdx(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-80px 0px -40% 0px",
      },
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, i, href) => {
    e.preventDefault();
    setActiveIdx(i);
    setMenuOpen(false);

    const section = document.querySelector(href);
    if (section) {
      const navHeight = 64;
      const top = section.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className={`nav-bar ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand */}
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => handleLinkClick(e, 0, "#home")}
        >
          Soby<span className="brand-dot"></span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className={`nav-link ${
                  activeIdx === i ? "nav-link--active" : ""
                }`}
                aria-current={activeIdx === i ? "page" : undefined}
                onClick={(e) => handleLinkClick(e, i, link.href)}
              >
                {link.label}
                <span className="nav-link-bar"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${menuOpen ? "drawer-open" : ""}`}>
        <ul className="drawer-links">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className={`drawer-link ${
                  activeIdx === i ? "drawer-link--active" : ""
                }`}
                onClick={(e) => handleLinkClick(e, i, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
