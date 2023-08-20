import { useEffect, useState } from 'react';
import api from '../api';

import CarCard from '../components/carcard/CarCard';
import './css/Car.css';

export default function CarPage() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    api.get(`/api/car/get-all-cars`)
      .then((res) => {
        console.log(res.data);
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const checkAvailable = () => {
    // check if the car is available at this Dat & Time

  };

  

  const carCards = carData.map((car) => (
    <CarCard key={car.id} car={car} />
  ));

  return (
    <div id="car">
      <h1>Car Page</h1>
      <div className="carSearch">
        <label className="">From</label>
        <input type="datetime-local" onChange={checkAvailable}/>

        <label className="">To</label>
        <input type="datetime-local" />
      </div>
      <div id="carGrid">
        {carCards}
      </div>
    </div>
  )
}