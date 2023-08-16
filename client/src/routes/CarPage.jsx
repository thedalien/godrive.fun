import { useEffect, useState } from 'react';
import CarCard from '../components/carcard/CarCard';
import './css/Car.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CarPage() {
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
    <div id="car">
      <h1>Car Page</h1>
      <div id="carGrid">
        {carCards}
      </div>
    </div>
  )
}
