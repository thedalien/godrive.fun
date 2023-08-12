import { useState } from 'react';
import './css/Admin.css';
import DropdownOrTextField from '../components/inputs/DropdownOrTextField';

export default function AdminPage() {
    const [carData, setCarData] = useState({});

    const getCarData = (e) => {
        // e.preventDefault();
        setCarData({
            ...carData,
            [e.target.name]: e.target.value,
        });
    }

    const submitCarData = (e) => {
        e.preventDefault();
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
            </div>
            </form>
            <button id="addCarButton" type='submit' name='submit' onClick={submitCarData}>Add Car to garage</button>
        </fieldset>
    </div>
  )
}