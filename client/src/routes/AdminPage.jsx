import { useState } from 'react';
import './css/Admin.css';
import DropdownOrTextField from '../components/inputs/DropdownOrTextField';
import api from '../api';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import AddCar from '../components/admin/AddCar';


export default function AdminPage() {
    const [showAddCar, setShowAddCar] = useState(false);
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
        {showAddCar ? <AddCar setShowAddCar={setShowAddCar} /> : <button onClick={() => setShowAddCar(true)}>Add Car</button>}
    </div>
  )
}