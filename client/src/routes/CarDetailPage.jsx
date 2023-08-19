import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../api";

import ImageSlider from "../components/imageslider/ImageSlider";

export default function CarDetailPage() {
  const { id } = useParams();
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    api.get(`/api/car/get-car/${id}`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id]);
  console.log(carData);
  return (
    <div className="carCard">
      {carData && (
        <>
          <h1>{carData.brand} {carData.model}</h1>
          <ImageSlider images={carData.images} />
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
