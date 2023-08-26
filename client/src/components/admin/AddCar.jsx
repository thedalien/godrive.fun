import { useState } from 'react';
import '../../routes/css/Admin.css';
import DropdownOrTextField from '../inputs/DropdownOrTextField';
import api from '../../api';
import formatLicensePlate from '../functions/formatLicensePlate';
import uploadImageToFirebase from '../../firebase/uploadImages';


export default function AddCar({setShowAddCar}) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        console.log(e.target.files);
        setSelectedFiles(e.target.files);
    }; 
    const [carData, setCarData] = useState({
        "brand": "Skoda",
        "model": "Fabia",
        "year": 2017,
        "color": "Blue",
        "seats": 5,
        "trunkVolume": 15.1,
        "poweredBy": "Gasoline",
        "dayPrice": 70,
        "hourPrice": 10,
        "door": 4,
        "licensePlate": "XYZ-1234"
    });

    const getCarData = (e) => {
        if (e.target.name === 'licensePlate') {
            e.target.value = formatLicensePlate(e.target.value);
        }

        setCarData({
            ...carData,
            [e.target.name]: e.target.value,
        });
    }

    const submitCarData = async (e) => {
        e.preventDefault();
        const uploadedURLs = await uploadImageToFirebase(carData, selectedFiles, setUploadProgress );
        
        const carInfo = {
          ...carData,
          carImages: uploadedURLs,
        };
      
        api.post(`/api/car/addCar`, carInfo)
        .then((res) => {
            setInterval(() => {
                setShowAddCar(false);
            }, 5000);
            return <div>Car added successfully</div>
        }).catch((err) => {
            console.log(err);
        });
    };
      
  return (
    <>
        <fieldset id="addCar">
            <legend>Add Car</legend>
            <form id="addCarForm">
                <div>
                    <DropdownOrTextField data='brand' name='Car Brand' onChange={getCarData}/>
                    <DropdownOrTextField data='model' name='Car Model' onChange={getCarData}/>
                    <DropdownOrTextField data='year' name='Build Year' onChange={getCarData}/>
                    <DropdownOrTextField data='color' name='Car Color' onChange={getCarData}/>
                    <DropdownOrTextField data='seats' name='Car Seats' onChange={getCarData}/>
                    <DropdownOrTextField maxLength="8" data='licensePlate' name='Car License Plate' onChange={getCarData}/>
                </div>
                <div>
                    <DropdownOrTextField data='trunkVolume' name='Trunk Volume' onChange={getCarData}/>
                    <DropdownOrTextField data='poweredBy' name='Car powered by' onChange={getCarData}/>
                    <DropdownOrTextField data='door' name='Car Doors' onChange={getCarData}/>
                    <DropdownOrTextField data='dayPrice' name='Price per Day' onChange={getCarData}/>
                    <DropdownOrTextField data='hourPrice' name='Price per Hour' onChange={getCarData}/>
                    <label className='adminLabel' htmlFor='carImage'>Car Images:</label>
                    <label htmlFor="carImage" className="adminInputFile">
                        Choose images...
                    </label>
                    <input type='file' id='carImage' className='' style={{display: 'none'}} multiple onChange={handleFileChange} accept="image/*"/>
                    <i>(multiple image's possible)</i>
                </div>
                <div>
                    <label className='adminLabel' htmlFor='description'>Car Description:</label>
                    <textarea className='adminInput' id='description' name='description' onChange={getCarData}></textarea>
                </div>
                <div>
                    <button className="mainButtons adminCarButtons" name='submit' onClick={submitCarData}>Add Car to garage</button>
                    {uploadProgress > 0 && uploadProgress < 100 && <progress value={uploadProgress} max="100" />}
                    <button className="mainButtons adminCarButtons" onClick={() => setShowAddCar(false)}>Cancel</button>
                </div>
            </form>
        </fieldset>
    </>
  )
}