import { useState } from 'react';
import '../../routes/css/Admin.css';
import DropdownOrTextField from '../inputs/DropdownOrTextField';
import api from '../../api';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const db = getFirestore();


export default function AddCar({setShowAddCar}) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        console.log(e.target.files);
        setSelectedFiles(e.target.files);
    };

    const uploadImageToFirebase = async () => {
        if (!selectedFiles) {
            return;
        }
    
        let localDownloadURLs = [];
    
        const uploadPromises = Array.from(selectedFiles).map(async selectedFile => {
            const storageRef = ref(storage, `carImages/${carData.licensePlate}/` + selectedFile.name);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile, {
                contentType: selectedFile.type,
            });
    
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    }, 
                    (error) => {
                        console.error(error);
                        reject(error);
                    }, 
                    async () => {
                        try {
                            const originalURL = await getDownloadURL(uploadTask.snapshot.ref);
                            const baseNameWithoutExtension = originalURL.split('/').pop().split('?')[0];
                            const newFileName = baseNameWithoutExtension.replace(/(\.\w+)$/, "_300x300.webp");
                            const transformedURL = originalURL.replace(baseNameWithoutExtension, newFileName);
                            localDownloadURLs.push(transformedURL);
                            resolve();
                        } catch (error) {
                            console.error(error);
                            reject(error);
                        }
                    }
                );
            });
        });
    
        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
    
        return localDownloadURLs;
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

    const formatLicensePlate = (value) => {
        value = value.replace(/\s+/g, '').toUpperCase();

        if (value.length > 3) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        }
    
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
    
        return value;
    }

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
        const uploadedURLs = await uploadImageToFirebase();
        
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