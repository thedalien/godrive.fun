import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/Contact.css'

export default function ContactPage() {
  return (
    <div id="contact">
      <div id="contactText">
        <h1>Contact us, start driving</h1>
        <p>Do you have questions regarding our services? We&apos;re happy to answer them under the following Phonenumber XXXX or E-Mail XXXX. Else you can send a request over the Contactform.</p>
      </div>
      <div id="contactForm">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="text" placeholder="Your Lastname" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Your Phonenumber" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Message" rows="5" required></textarea>
        </form>
      <button type="submit">Submit</button>
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
