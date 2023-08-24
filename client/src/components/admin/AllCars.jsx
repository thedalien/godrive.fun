import api from "../../api";
import { useEffect, useState } from "react";
import '../../routes/css/Admin.css';
import { useNavigate } from "react-router-dom";

export default function AllCars({setShowAllCars}) {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get('/api/car/all');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this car?');
        if (!confirmDelete) return;
        try {
            await api.delete(`/api/car/delete/${id}`);
            const response = await api.get('/api/car/all');
            setCars(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/admin/edit/${id}`);
    };

  return (
    <fieldset id="editCar">
        <legend>Edit / Delete Cars</legend>
        <div className="adminCarGrid">
            <div className="adminCarHeader">
                <div>Brand</div>
                <div>Model</div>
                <div>Year</div>
                <div>L. Plate</div>
                <div>Actions</div>
            </div>
            {cars.map((car) => (
                <div className="adminCarGridRow" key={car.id}>
                    <div>{car.brand}</div>
                    <div>{car.model}</div>
                    <div>{car.year}</div>
                    <div>{car.licensePlate}</div>
                    <div>
                        <button className="mainButtons" onClick={() => handleEdit(car.id)}>Edit</button>
                        <button className="mainButtons" onClick={() => handleDelete(car.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
        <button className="mainButtons adminCarGridClose" onClick={() => setShowAllCars(false)}>Close List</button>
    </fieldset>
  )
}
