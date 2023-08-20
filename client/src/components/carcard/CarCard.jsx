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
    return null;
  }

  return (
    <div className="carCard">
      <h1>{car.brand} {car.model}</h1>
      {/* <ImageSlider images={car.images} /> */}
      <img src={car.images && car.images.length > 0 ? car.images[0].url : "https://tdc-prod.ams3.digitaloceanspaces.com/21f8e4e1-c95d-447a-b147-18aa41725aab.jpg"} alt="car" />
      <div className="carDetails">
        <p>{car.year}</p>
        <p>{car.dayPrice}</p>
        <p>{car.licensePlate}</p>
      </div>
      <button onClick={showDetails} >Show more details</button>
    </div>
  )
}
