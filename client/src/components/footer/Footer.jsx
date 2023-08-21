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
          <p>© 2023 Best Car Rental</p>
        </div>
      </div>
    </footer>
    )
}
