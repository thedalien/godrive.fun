import './CarCard.css'
import CarSlider from '../carslider/CarSlider';

export default function CarCard(props) {
  return (
    <div className="carCard">
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
