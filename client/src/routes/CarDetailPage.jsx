import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import api from "../api";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ConfigProvider, DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

import Icon from '@mdi/react';
import { mdiCarDoor, mdiCarSeat, mdiCarBack, mdiGasStation, mdiFactory } from '@mdi/js';

import "./css/CarDetail.css";
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

  const logIn = () => {
    navigate('/login'); 
  }

  const goToCars = () => {
    navigate('/cars'); 
  }

  return (
    <div id="carDetail">
      <button className="mainButtons backToCars" onClick={goToCars}>Back to Cars</button>
      {carData && (
        <div className="carDetailContainer">
          <h1>
            <div>
              {carData.brand} {carData.model}
            </div>
            <div className="detailPrice">
              <div>
                &euro;{carData.hourPrice} / hour
              </div>
              <div>
                &euro;{carData.dayPrice} / day
              </div>
            </div>
          </h1>
          <ImageSlider images={carData.images} />
          <div className="carDetails">
            <div>
              <Icon path={mdiCarSeat} />
              <p>{carData.seats}</p>
            </div>
            <div>
              <Icon path={mdiCarDoor} />
              <p>{carData.door}</p>
            </div>
            <div>
              <Icon path={mdiCarBack} />
              <p>{carData.trunkVolume}l</p>
            </div>
            <div>
              <Icon path={mdiGasStation} />
              <p>{carData.poweredBy}</p>
            </div>
            <div>
              <Icon path={mdiFactory} />
              <p>{carData.year}</p>
            </div>
          </div>
          <p className="detailText">{/* carData.description here */}Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam beatae soluta eveniet sunt iste architecto aut dicta dolore perferendis at possimus eius iure, animi repudiandae perspiciatis doloremque, temporibus nesciunt! Error?</p>
          {!user && 
            <>
              <p className="logInToBook">Please log in to make a reservation.</p>
              <button className="mainButtons logInToBookBtn" onClick={logIn}>Login</button>
            </>
          }
          {user && (
            <>
              <form onSubmit={handleBooking}>
                <h3>Choose your date</h3>
                <div className="detailBooking">
                  <ConfigProvider
                    theme={{
                      components: {
                        DatePicker: {
                          colorPrimary: 'rgb(122, 165, 210);',
                          colorSecondary: 'rgb(122, 165, 210);',
                          borderRadius: '5px;',
                          colorText: 'rgb(48, 56, 65);',
                          width: '50%',
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
                  <button className="mainButtons bookNow" type="submit">Book Now</button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}