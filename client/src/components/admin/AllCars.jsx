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
    <>
        <button onClick={() => setShowAllCars(false)} className="back-button">Hide All Cars</button>

        <table className="car-table">
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Color</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cars.map((car) => (
                    <tr key={car.id}>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.color}</td>
                        <td><button onClick={() => handleEdit(car.id)}>Edit</button></td>
                        <td><button onClick={() => handleDelete(car.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
  )
}
