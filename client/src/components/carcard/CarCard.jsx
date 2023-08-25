import { useNavigate } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCarDoor, mdiCarSeat, mdiCarBack, mdiGasStation, mdiFactory } from '@mdi/js';
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
          <img draggable="false" onClick={showDetails} src={car.images && car.images.length > 0 ? car.images[0].url : "No source found"} alt={car.brand+" "+car.model} />
          <div className="carHeader">
            <div className="carName">
              {car.brand} {car.model}
            </div>
            <div className="carPrice">
              ${car.dayPrice} / day
            </div>
          </div>
          <div className="carDetails">
            <div>
              <Icon path={mdiCarSeat} />
              <p>{car.seats}</p>
            </div>
            <div>
              <Icon path={mdiCarDoor} />
              <p>{car.door}</p>
            </div>
            <div>
              <Icon path={mdiCarBack} />
              <p>{car.trunkVolume}l</p>
            </div>
            <div>
              <Icon path={mdiGasStation} />
              <p>{car.poweredBy}</p>
            </div>
            <div>
              <Icon path={mdiFactory} />
              <p>{car.year}</p>
            </div>
          </div>
          <button onClick={showDetails} className="showDetails">Show more details</button>
        </>
      )}
    </div>
  )
}
