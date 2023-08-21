import { useState, useEffect } from 'react';
import './css/Admin.css';
import AddCar from '../components/admin/AddCar';
import AllCars from '../components/admin/AllCars';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


export default function AdminPage() {
    const [showAddCar, setShowAddCar] = useState(false);
    const [showAllCars, setShowAllCars] = useState(false);
    const user = useSelector((state) => state.app.user);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return null;
        }
    }, []);


  return (
    <div id="admin">
        <h1>Admin Page</h1>
        {showAddCar ? <AddCar setShowAddCar={setShowAddCar} /> : <button onClick={() => setShowAddCar(true)}>Add Car</button>}
        <br />
        {showAllCars ? <AllCars setShowAllCars={setShowAllCars} /> : <button onClick={() => setShowAllCars(true)}>All Cars</button>}
    </div>
  )
}