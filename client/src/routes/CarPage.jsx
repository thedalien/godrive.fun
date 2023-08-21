import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import api from '../api';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

import CarCard from '../components/carcard/CarCard';
import './css/Car.css';

export default function CarPage() {
  const [carData, setCarData] = useState([]);
  
  useEffect(() => {
    api.get(`/api/car/all`)
      .then((res) => {
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

  const handleBooking = (carId) => {
    api.post(`/api/book`, { carId })
      .then((res) => {
        console.log('Booking successful:', res.data);
      })
      .catch((err) => {
        console.log('Booking failed:', err);
      })
  };

  return (
  <div id="car">
    <h1>Car Page</h1>
    <div className="carSearch">
      <Space direction="vertical" size={10}>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="DD-MM-YYYY HH:mm"
        />
      </Space>
    </div>
    <div id="carGrid">
      {carCards}
    </div>
  </div>
  )
}