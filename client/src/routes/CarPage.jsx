import { useEffect, useState } from 'react';
import api from '../api';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ConfigProvider, DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
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

  const checkAvailable = (e) => {
    console.log(e);
    // {startDate: e[0].$d, endDate: e[1].$d}
    const startDate = e[0].$d;
    const endDate = e[1].$d;
    api.post('/api/book/getAvailableCars', { startDate, endDate })
      .then((res) => {
        setCarData(res.data);
      }
      ).catch((err) => { console.log(err) });
      


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

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('minute');
  };

  return (
  <div id="car">
    <h1>Checkout our Cars</h1>
    <div className="carSearch">
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              colorPrimary: 'rgb(122, 165, 210);',
              colorSecondary: 'rgb(122, 165, 210);',
              borderRadius: '5px;',
              colorText: 'rgb(48, 56, 65);',
            },
            TimePicker: {
              colorPrimary: 'rgb(122, 165, 210);',
              colorText: 'rgb(48, 56, 65);',
              colorPrimaryBg: 'rgb(122, 165, 210);',
              algorithm: true,

            },
            Input: {
              colorPrimaryText: 'rgb(48, 56, 65);',
              colorSecondaryText: 'rgb(48, 56, 65);',

              algorithm: true,

            },
            Button: {
              colorPrimary: 'rgb(122, 165, 210);',
              algorithm: true,

            },
          },
        }}
      >
        <Space direction="vertical" size={10}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="DD.MM.YYYY / HH:mm"
            disabledDate={disabledDate}
            size='large'
            changeOnBlur
            onChange={checkAvailable}
          />
        </Space>
      </ConfigProvider>
    </div>
    <div id="carGrid">
      {carCards}
    </div>
  </div>
  )
}