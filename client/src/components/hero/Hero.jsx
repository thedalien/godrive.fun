import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div id="hero">
      <div id="heroBg">
        <div id="heroText">
          <h1>Are you looking for a Car to rent?</h1>
          <p>We&apos;re happy to help you with your needs!</p>
        </div>
        <Link to="#cars" id="goToCars" reloadDocument >
          <p>
            Go to Cars
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </p>
        </Link>
      </div>
    </div>
  )
}
