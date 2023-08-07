import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div id="hero">
      <div id="heroBg">
        <h1>
          Are you looking for a Car to rent?
          <br />We're happy to help you with your needs!
        </h1>
        <Link to="#cars" id="goToCars">
          <p>
            Go to Cars
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </p>
        </Link>
      </div>
    </div>
  )
}
