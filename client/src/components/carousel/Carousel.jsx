import Flickity from 'react-flickity-component';
import CarCard from '../carcard/CarCard';
import './Flickity.min.css';
import './Carousel.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  const serverURL = useSelector((state) => state.app.serverURL);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios.get(`${serverURL}/api/car/get-all-cars`)
      .then((res) => {
        // console.log(res.data);
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const carCards = carData.map((car) => {
    console.log(car);
    return <CarCard key={car.id} car={car} />
  })
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {carCards}
    </Flickity>
  )
}