import Flickity from 'react-flickity-component';
import CarCard from '../carcard/CarCard';
import './Flickity.min.css';
import './Carousel.css';

const flickityOptions = {
    initialIndex: 1,
    //groupCells: 2,
    wrapAround: true,
    pageDots: false,
    autoPlay: 5000,
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
      <CarCard />
      <CarCard />
      <CarCard />
    </Flickity>
  )
}