import React, { useState } from 'react';
// import TextField from '@mui/material/TextField'; 
// import styled from '@mui/material/styles';
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

    // const StyledTextField = styled(TextField)`
    //     & .Mui-disabled .MuiOutlinedInput-notchedOutline {
    //         border-color: white;
    //     }

    // `;

  return (
    <div id="admin">
        <h1>AdminPage</h1>
        <fieldset id="addCar">
            <legend>Add Car</legend>
            <form>
                {/* <TextField
                    name="brand"
                    id="outlined-required"
                    label="Required"
                    variant="outlined"
                    helperText="Enter the Brand of your Car"
                    onChange={getCarData}
                /> */}
                <DropdownOrTextField data='brand'/> 
                {/* {carData.brand ? <DropdownOrTextField getCarData={getCarData} brand={carData.brand} data="model"/> : null } */}
                {/* <DropdownOrTextField type="year"/> */}
            </form>
        </fieldset>
    </div>
  )
}