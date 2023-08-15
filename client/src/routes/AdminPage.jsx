import { useState } from 'react';
import './css/Admin.css';
import DropdownOrTextField from '../components/inputs/DropdownOrTextField';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CarCard from '../components/carcard/CarCard';
// import useAuthToken from '../functions/useAuthToken';


export default function AdminPage() {
    // useAuthToken();

    const [carData, setCarData] = useState({
        "brand": "Toyota",
        "model": "Camry",
        "year": 2021,
        "color": "Blue",
        "seats": 5,
        "trunkVolume": 15.1,
        "poweredBy": "Gasoline",
        "dayPrice": 70,
        "hourPrice": 10,
        "door": 4,
        "licensePlate": "XYZ-1234"
    });
    const [showEditCars, setShowEditCars] = useState(false);
    const [showDeleteCars, setShowDeleteCars] = useState(false);

    const serverURL = useSelector((state) => state.app.serverURL);

    const showEditable = () => setShowEditCars(true);
    const showDeletable = () => setShowDeleteCars(true);

    const getCarData = (e) => {
        // if name is licensePlate, make it uppercase and add a space after 3 letters
        if (e.target.name === 'licensePlate') {
            let value = event.target.value.replace(/\s+/g, '').toUpperCase();

            if (value.length > 3) {
              value = value.slice(0, 3) + ' ' + value.slice(3);
            }
        
            if (value.length > 8) {
              value = value.slice(0, 8);
            }
        
            e.target.value = value;
        }

        setCarData({
            ...carData,
            [e.target.name]: e.target.value,
        });
    }

    const submitCarData = async (e) => {
        e.preventDefault();
        axios.post(`${serverURL}/api/car/addCar`, carData)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        console.log(carData);
    }

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
            </div>
            <div>
                <DropdownOrTextField data='trunkVolume' name='Trunk Volume' onChange={getCarData}/>
                <DropdownOrTextField data='poweredBy' name='Car powered by' onChange={getCarData}/>
                <DropdownOrTextField data='door' name='Car Doors' onChange={getCarData}/>
                <DropdownOrTextField data='dayPrice' name='Price per Day' onChange={getCarData}/>
                <DropdownOrTextField data='hourPrice' name='Price per Hour' onChange={getCarData}/>
                <label className='adminLabel' htmlFor='licensePlate'>License Plate</label>
                <input name='licensePlate' className='adminInput' maxLength="8" placeholder='License Plate' onChange={getCarData}/>

                <button id="addCarButton" type='submit' name='submit' onClick={submitCarData}>Add Car to garage</button>
            </div>
            </form>
            <button id="addCarButton" type='submit' name='submit' onClick={submitCarData}>Add Car to garage</button>
        </fieldset>
        <fieldset id="editCar">
            <legend>Edit Car</legend>
            {showEditCars ? 
                <div id="carGridEdit">
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div><div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                    <div className="editThisCar">
                        <CarCard/>
                        <button>
                            Edit Car
                        </button>
                    </div>
                </div>
            : "Please select the Show Car button"}
            <button id="showCars" onClick={showEditable}>Show Cars</button> {/* Show cars */}
        </fieldset>
        <fieldset id="deleteCar">
            <legend>Delete Car</legend>
            {showDeleteCars ? 
                <div id="carGridDelete">
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                    <div className="deleteThisCar">
                        <CarCard/>
                        <button>
                            Delete Car
                        </button>
                    </div>
                </div>
            : "Please select the Show Car button"}
            <button id="showCars" onClick={showDeletable}>Show Cars</button> {/* Show cars */}
        </fieldset>
    </div>
  )
}