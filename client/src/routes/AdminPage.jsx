import { useState, useEffect } from 'react';
import './css/Admin.css';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import AddCar from '../components/admin/AddCar';
import AllCars from '../components/admin/AllCars';
import AllUsers from '../components/admin/AllUsers';

export default function AdminPage() {
    const [showAddCar, setShowAddCar] = useState(false);
    const [showAllCars, setShowAllCars] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const user = useSelector((state) => state.app.user);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            // return null;
        }
    }, []);


  return (
    <div id="admin">
        <h1>Admin Panel</h1>
        <div className="adminFunctions">
          <fieldset className="adminCars">
            <legend>Cars</legend>
            {showAddCar ? <AddCar setShowAddCar={setShowAddCar} /> : !showAllCars && <button className="mainButtons adminButtons" onClick={() => {setShowAddCar(true); setShowAllCars(false);}}>add</button>}
            {showAllCars ? <AllCars setShowAllCars={setShowAllCars} /> : !showAddCar && <button className="mainButtons adminButtons" onClick={() => {setShowAllCars(true); setShowAddCar(false);}}>edit & delete</button>}
          </fieldset>
          <fieldset className="adminUsers">
            <legend>Users</legend>
            {showAllUsers ? 
            <>
            <AllUsers setShowAllUsers={setShowAllUsers} /> 
            <button className="mainButtons adminButtons" onClick={() => {setShowAllUsers(false);}}>Hide All users</button>
            </>
            : <button className="mainButtons adminButtons" onClick={() => {setShowAllUsers(true);}}>Show All users</button>}
          </fieldset>
        </div>
    </div>
  )
}