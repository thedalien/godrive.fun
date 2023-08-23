import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Contact.css'

export default function ContactPage() {
  return (
    <div id="contact">
      <div id="contactText">
        <h1>Contact us, start driving</h1>
        <p>Do you have questions regarding our services? We&apos;re happy to answer them under the following Phonenumber XXXX or E-Mail XXXX. Else you can send a request with the following Contactform.</p>
      </div>
      <div id="contactForm">
        <form className="contact-form">
          <div>
            <input type="text" placeholder="Your Name" required />
            <input type="text" placeholder="Your Lastname" required />
            <input type="email" placeholder="Your Email" required />
            <input type="tel" placeholder="Your Phonenumber" required />
          </div>
          <div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div id="contactInfo">
        <img src='/carRentalLogo.png' style={{width:'50px'}} alt="logo" />
        <p>
          Car Rental Company <br />
          Other Name of Company <br />
          Address <br />
          Postalcode and Location
        </p>
        <div id="buttons">
          <button className="contactButton" title="Go to webpage">
            <FontAwesomeIcon icon="fa-solid fa-globe" size="lg" />
          </button>
          <button className="contactButton" title="Call us">
            <FontAwesomeIcon icon="fa-solid fa-phone" size="lg" />
          </button>
          <button className="contactButton" title="Write us an E-Mail">
            <FontAwesomeIcon icon="fa-solid fa-envelope" size="lg" />
          </button>
        </div>
      </div>
    </div>
  )
}
