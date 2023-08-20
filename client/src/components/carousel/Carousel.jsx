import Flickity from 'react-flickity-component';
import CarCard from '../carcard/CarCard';
import './Flickity.min.css';
import './Carousel.css';
import { useEffect, useState } from 'react';
import api from '../../api';

const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    pageDots: false,
    autoPlay: 5000,
    imagesLoaded: true
}

export default function Carousel() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    api.get(`/api/car/get-all-cars`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const carCards = carData.map((car) => {
    return <CarCard key={car.id} car={car} />
  })
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
    >
      {carCards}
    </Flickity>
  )
}