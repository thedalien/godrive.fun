import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../api";
import { useSelector } from "react-redux";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

import ImageSlider from "../components/imageslider/ImageSlider";

export default function CarDetailPage() {
  const user = useSelector((state) => state.app.user);
  const { id } = useParams();
  const [carData, setCarData] = useState([]);
  const [booking, setBooking] = useState(); 

  useEffect(() => {
    api.get(`/api/car/getcar/${id}`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id]);
  console.log(carData);

  // const handleChange = (e) => {
  //   console.log({ startDate: e[0].$d, endDate: e[1].$d });
  //   setBooking({ startDate: e[0].$d, endDate: e[1].$d });
  //   console.log(booking);
  // };

  useEffect(() => {
    console.log('booking', booking);
  }, [booking]);

  const handleBooking = (e) => {
    e.preventDefault();
    api.post(`/api/book/createBooking`, { ...booking, userId: user.id, carId: id })
      .then((res) => {
        console.log('Booking successful:', res.data);
      })
      .catch((err) => {
        console.log('Booking failed:', err);
      })
  };

  return (
    <div className="">
      {carData && (
        <>
          <h1>{carData.brand} {carData.model}</h1>
          <ImageSlider images={carData.images} />
          <div className="carDetails">
            <p>{carData.year}</p>
            <p>{carData.dayPrice}</p>
            <p>{carData.licensePlate}</p>
          </div>
          <div>
            <h2>Reservations</h2>
          {!user && 
            <button>Log in to make a reservation</button>
          }
          </div>
            {user && (
              <form onSubmit={handleBooking}>
                <Space direction="vertical" size={10}>
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="DD-MM-YYYY HH:mm"
                    onChange={(e) => setBooking( {startDate: e[0].$d, endDate: e[1].$d} )}
                    required
                    name="datePicker"
                  />
                </Space>
                <button type="submit">Book Now</button>
              </form>
            )}
            {!user && <p>Please log in to make a reservation.</p>}
          
        </>
      )}
    </div>
  );
}