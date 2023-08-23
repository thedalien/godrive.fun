import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ConfigProvider, DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

import ImageSlider from "../components/imageslider/ImageSlider";

export default function CarDetailPage() {
  const user = useSelector((state) => state.app.user);
  const { id } = useParams();
  const [carData, setCarData] = useState([]);
  const [booking, setBooking] = useState(); 
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/car/getcar/${id}`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/cars');
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
    api.post(`/api/book/create`, { ...booking, userId: user.id, carId: id })
      .then((res) => {
        console.log('Booking successful:', res.data);
        if (res.data) {
          alert('Booking successful');
          navigate('/profile');
        }
      })
      .catch((err) => {
        console.log('Booking failed:', err);
      })
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('minute');
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
                      onChange={(e) => setBooking( {startDate: e[0].$d, endDate: e[1].$d} )}
                      name="datePicker"
                      required
                    />
                  </Space>
                </ConfigProvider>
                <button type="submit">Book Now</button>
              </form>
            )}
            {!user && <p>Please log in to make a reservation.</p>}
          
        </>
      )}
    </div>
  );
}