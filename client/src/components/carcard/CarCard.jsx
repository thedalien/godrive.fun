import './CarCard.css'

export default function CarCard() {
  return (
    <div className="carCard">
      <h1>Skoda Fabia{/* carName */}</h1>
      <img src="https://skodavisualizer.blob.core.windows.net/skoda3d/fabia.jpg" /* carImg */ />
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
