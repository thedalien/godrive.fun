import Flickity from 'react-flickity-component';
import './Flickity.min.css';
import './Carousel.css';
import CarCard from '../carcard/CarCard';

const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    draggable: '>3',
    pageDots: false,
    autoPlay: 5000,
    pauseAutoPlayOnHover: true,
    imagesLoaded: true
}

// Create map for CarCard to display Cars in the carousel

export default function Carousel() {
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      <CarCard />
      
    </Flickity>
  )
}