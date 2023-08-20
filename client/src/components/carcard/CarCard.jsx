import { useNavigate } from "react-router-dom";
import ImageSlider from "../imageslider/ImageSlider";
import './CarCard.css'
//import CarSlider from '../carslider/CarSlider';

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/cars/${car.id}`); 
  }
  if (!car) {
    return <div>Loading...</div>
  }

  return (
    <div className="carCard">
      <h1>{car.brand} {car.model}</h1>
      {/* <ImageSlider images={car.images} /> */}
      <img src={car.images[0].url} alt="car" />
      <div className="carDetails">
        <p>{car.year}</p>
        <p>{car.dayPrice}</p>
        <p>{car.licensePlate}</p>
      </div>
      <button onClick={showDetails} >Show more details</button>
    </div>
  )
}
