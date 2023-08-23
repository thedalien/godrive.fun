import { useNavigate } from "react-router-dom";
import './CarCard.css'

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/cars/${car.id}`); 
  }

  return (
    <div className="carCard">
      {car && (
        <>
          <img src={car.images && car.images.length > 0 ? car.images[0].url : "No source found"} alt={car.brand+" "+car.model} />
          <div className="carDetails">
            <p>Brand/Model: {car.brand} {car.model}</p>
            <p>Color: {car.color}</p>
            <p>Car seats: {car.seats}</p>
            <p>Car doors: {car.door}</p>
            <p>Trunk volume: {car.trunkVolume}</p>
            <p>Powered by: {car.poweredBy}</p>
            <p>Year: {car.year}</p>
            <p>Price per hour{car.hourPrice}</p>
            <p>Price per day: {car.dayPrice}</p>
          </div>
          <button onClick={showDetails} >Show more details</button>
        </>
      )}
    </div>
  )
}
