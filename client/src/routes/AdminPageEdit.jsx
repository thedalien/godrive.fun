import React, { useEffect } from 'react'
import { useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function AdminPageEdit() {
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
      
      const { id } = useParams();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await api.get(`/api/car/getcar/${id}`);
                setCar(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/car/update/${id}`, car);
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
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
            
          </tbody>
        </table>
        <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
