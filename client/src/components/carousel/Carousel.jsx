import Flickity from 'react-flickity-component';
import './Flickity.min.css';

const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    draggable: '>3',
    pageDots: false,
    autoPlay: 5000,
    pauseAutoPlayOnHover: true,
    imagesLoaded: true
}

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
      <img src="https://toppng.com/uploads/preview/tesla-model-x-11562971244z3uhlgfqpe.png"/>
      <img src="https://w7.pngwing.com/pngs/268/386/png-transparent-tesla-roadster-tesla-model-s-car-tesla-model-x-2017-tesla-model-s-p100d-compact-car-sedan-car.png"/>
      <img src="https://e7.pngegg.com/pngimages/984/295/png-clipart-tesla-tesla.png"/>
    </Flickity>
  )
}


        {/* <h1>
          Are you looking for a Car to rent?
          <br />We're happy to help you with your needs!
        </h1>
        <Link to="#cars" id="goToCars">
          <p>
            Go to Cars
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </p>
        </Link> */}