import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ImageSlider from "../components/imageslider/ImageSlider";

export default function CarDetailPage() {
  const serverURL = useSelector((state) => state.app.serverURL);
  const { id } = useParams();
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios.get(`${serverURL}/api/car/get-car/${id}`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id]);

  return (
    <div className="carCard">
      {carData && (
        <>
          <h1>{carData.brand} {carData.model}</h1>
          <ImageSlider />
          <div className="carDetails">
            <p>{carData.year}</p>
            <p>{carData.dayPrice}</p>
            <p>{carData.licensePlate}</p>
          </div>
        </>
      )}
    </div>
  );
}
