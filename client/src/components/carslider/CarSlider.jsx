import { useState, useEffect } from 'react';
import './CarSlider.css';

function ImageSlider() {
  const [imageUrls, setImageUrls] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

/*   useEffect(() => {
    async function fetchImageUrls() {
      try {
        const response = await getImageUrls(); // Replace with your API call
        setImageUrls(response.data.imageUrls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    }

    fetchImageUrls();
  }, []); */

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} />
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}>&#10094;</button>
      <button className="next-button" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default ImageSlider;
