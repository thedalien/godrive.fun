import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uploadImageToFirebase from '../firebase/uploadImages';



export default function AdminPageEdit() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        color: '',
        seats: 0,
        trunkVolume: 0,
        poweredBy: '',
        door: 0,
        dayPrice: 0,
        hourPrice: 0,
        licensePlate: ''
      });
    const [images, setImages] = useState([]);
      
      const { id } = useParams();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await api.get(`/api/car/getcar/${id}`);
                setCar(response.data);
                // map images to array of urls
                const images = response.data.images.map(image => image.url);
                setImages(images);
                console.log(images);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedCar = { ...car, images };
        try {
            await api.put(`/api/car/update/${id}`, updatedCar);
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    const onDragEnd = (result) => {
      if (!result.destination) return;
  
      const reorderedImages = Array.from(images);
      const [movedItem] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, movedItem);
  
      setImages(reorderedImages);
    };
    const handleFileChange = (e) => {
      console.log(e.target.files);
      setSelectedFiles(e.target.files);
  }; 

  const handleUploadImage = async () => {
    const uploadedURLs = await uploadImageToFirebase(car, selectedFiles, setUploadProgress);
    setImages([...images, ...uploadedURLs]);
  };
    

  return (
    <div className="car-form">
        <table className="car-table"> 
          <tbody>
            <tr>
              <td>Brand</td>
              <td><input type="text" value={car.brand} onChange={(e) => setCar({...car, brand: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Model</td>
              <td><input type="text" value={car.model} onChange={(e) => setCar({...car, model: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Year</td>
              <td><input type="number" value={car.year} onChange={(e) => setCar({...car, year: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Color</td>
              <td><input type="text" value={car.color} onChange={(e) => setCar({...car, color: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Seats</td>
              <td><input type="number" value={car.seats} onChange={(e) => setCar({...car, seats: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Trunk Volume</td>
              <td><input type="number" value={car.trunkVolume} onChange={(e) => setCar({...car, trunkVolume: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Powered By</td>
              <td><input type="text" value={car.poweredBy} onChange={(e) => setCar({...car, poweredBy: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Door</td>
              <td><input type="number" value={car.door} onChange={(e) => setCar({...car, door: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Day Price</td>
              <td><input type="number" value={car.dayPrice} onChange={(e) => setCar({...car, dayPrice: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Hour Price</td>
              <td><input type="number" value={car.hourPrice} onChange={(e) => setCar({...car, hourPrice: e.target.value})} /></td>
            </tr>
            <tr>
              <td>License Plate</td>
              <td><input type="text" value={car.licensePlate} onChange={(e) => setCar({...car, licensePlate: e.target.value})} /></td>
            </tr>
            <tr>
              <td>Images</td>
              <td><input type='file' id='carImage' className='' multiple onChange={handleFileChange} accept="image/*"/>
              <button onClick={handleUploadImage}>Upload</button>
              {uploadProgress > 0 && uploadProgress < 100 && <progress value={uploadProgress} max="100" />}
              </td>
            </tr>
            
          </tbody>
        </table>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
                  {images.map((img, index) => (
                    <Draggable key={img} draggableId={img} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={img} alt="" width={100} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
         </DragDropContext>
        <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
