import './CarCard.css'
import CarSlider from '../carslider/CarSlider';

export default function CarCard() {
  return (
    <div className="carCard">
      <h1>Skoda Fabia{/* carName */}</h1>
      <CarSlider />
      <div className="carDetails">
        <p>Some Data here{/* carData */}</p>
        <p>Some more Data{/* carData */}</p>
        <p>Some more Data{/* carData */}</p>
        <p>Some more Data{/* carData */}</p>
        <p>Some more Data{/* carData */}</p>
        <p>Some more Data{/* carData */}</p>
      </div>
    </div>
  )
}
