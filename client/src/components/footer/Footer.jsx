import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-padding">
        <div className="footer-links">
          <a href="/contact">Contact</a>
          <a href="/profile">Profile</a>
          <a href="/cars">Cars</a>
        </div>
        <div className="footer-copyright">
          <p>© 2022 Your Company Name</p>
        </div>
      </div>
    </footer>
    )
}
