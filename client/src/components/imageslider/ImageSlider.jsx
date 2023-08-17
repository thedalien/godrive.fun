import Flickity from 'react-flickity-component';
import '../carousel/Flickity.min.css';
import './ImageSlider.css';
//import { useEffect, useState } from 'react';
//import axios from 'axios';
//import { useSelector } from 'react-redux';

const flickityOptions = {
    initialIndex: 1,
    wrapAround: true,
    pageDots: false,
}

export default function ImageSlider() {
    /* const serverURL = useSelector((state) => state.app.serverURL);
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
        const carCards = carData.map((car) => {
            console.log(car);
            return <CarCard key={car.id} car={car} />
        })
    }, []) */

    return (
        <Flickity
            className={'imgSlider'}
            elementType={'div'}
            options={flickityOptions}
            disableImagesLoaded={false}
        >
            <h1>Carousel</h1>
            <h2>Nah</h2>
            <h1>Carousel</h1>
            <h2>Nah</h2>
            <h1>Carousel</h1>
            <h2>Nah</h2>
        </Flickity>
    )
}