import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <p className="footer-brand">
          Soby<span className="footer-dot"></span>
        </p>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} Soby Francis. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
