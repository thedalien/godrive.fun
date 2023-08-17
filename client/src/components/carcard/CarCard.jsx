import { useNavigate } from "react-router-dom";
import './CarCard.css'
//import CarSlider from '../carslider/CarSlider';

export default function CarCard(props) {
  const navigate = useNavigate();
  return (
    <div className="carCard" onClick={() => navigate(`/cars/${props.car.id}`)}>
      <h1>{props.car.brand} {props.car.model}</h1>
{/*       <CarSlider />
*/}      <div className="carDetails">
        <p>{props.car.year}</p>
        <p>{props.car.dayPrice}</p>
        <p>{props.car.licensePlate}</p>
      </div>
    </div>
  )
}
