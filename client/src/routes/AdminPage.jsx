import { useState } from 'react';
import './css/Admin.css';
import DropdownOrTextField from '../components/inputs/DropdownOrTextField';
import api from '../api';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";





export default function AdminPage() {
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
                            const tokenPart = originalURL.split('?').slice(1).join('?');
                            const baseName = selectedFile.name.split('.').slice(0, -1).join('.');
                            const newFileName = baseName + "_300x300.webp";
                            const transformedURL = `https://firebasestorage.googleapis.com/v0/b/carrental-38eea.appspot.com/o/images%2F${encodeURIComponent(newFileName)}?${tokenPart}`;
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
        console.log(carInfo); 
      
        api.post(`/api/car/addCar`, carInfo)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
      };
      

  return (
    <div id="admin">
        <h1>Admin Page</h1>
        <fieldset id="addCar">
            <legend>Add Car</legend>
            <form id="addCarForm">
            <div>
                <DropdownOrTextField data='brand' name='Car Brand' onChange={getCarData}/>
                <DropdownOrTextField data='model' name='Car Model' onChange={getCarData}/>
                <DropdownOrTextField data='year' name='Build Year' onChange={getCarData}/>
                <DropdownOrTextField data='color' name='Car Color' onChange={getCarData}/>
                <DropdownOrTextField data='seats' name='Car Seats' onChange={getCarData}/>
                <label className='adminLabel' htmlFor='licensePlate'>License Plate</label>
                <input name='licensePlate' className='adminInput' maxLength="8" placeholder='License Plate' onChange={getCarData}/>
            </div>
            <div>
                <DropdownOrTextField data='trunkVolume' name='Trunk Volume' onChange={getCarData}/>
                <DropdownOrTextField data='poweredBy' name='Car powered by' onChange={getCarData}/>
                <DropdownOrTextField data='door' name='Car Doors' onChange={getCarData}/>
                <DropdownOrTextField data='dayPrice' name='Price per Day' onChange={getCarData}/>
                <DropdownOrTextField data='hourPrice' name='Price per Hour' onChange={getCarData}/>
                <label className='adminLabel' htmlFor='carImage'>Car Image</label>
                <input type='file' name='carImage' className='adminInput' multiple onChange={handleFileChange}/>
            </div>
            </form>
            <button id="addCarButton" type='button' name='submit' onClick={submitCarData}>Add Car to garage</button>
            {uploadProgress > 0 && uploadProgress < 100 && <progress value={uploadProgress} max="100" />}
        </fieldset>
    </div>
  )
}