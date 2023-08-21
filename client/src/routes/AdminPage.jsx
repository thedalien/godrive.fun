import { useState } from 'react';
import './css/Admin.css';
import AddCar from '../components/admin/AddCar';
import AllCars from '../components/admin/AllCars';


export default function AdminPage() {
    const [showAddCar, setShowAddCar] = useState(false);
    const [showAllCars, setShowAllCars] = useState(false);

  return (
    <div id="admin">
        <h1>Admin Page</h1>
        {showAddCar ? <AddCar setShowAddCar={setShowAddCar} /> : <button onClick={() => setShowAddCar(true)}>Add Car</button>}
        <br />
        {showAllCars ? <AllCars setShowAllCars={setShowAllCars} /> : <button onClick={() => setShowAllCars(true)}>All Cars</button>}
    </div>
  )
}