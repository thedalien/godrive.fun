import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const DropdownOrTextField = (props) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(''); 
  const [otherValue, setOtherValue] = useState(''); 
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const serverURL = useSelector((state) => state.app.serverURL);
  // console.log(props);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.post(`${serverURL}/api/car/getlist`, {
          "data": `${props.data}`,
          ...(props.model && { "model": `${props.model}` })
        });
        setItems(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Optionally, set an error state here to handle it in the UI
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    props.onChange(event);
    
    if (value === 'other') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
    setSelectedItem(value);
  };
  const handleOtherChange = (event) => {
    const value = event.target.value;
    setOtherValue(value);
    props.onChange(event);
  };

  return (
    <>
      <label className="adminLabel" htmlFor={props.data} >{props.name}: </label>
      {loading ? (
        <div>Loading...</div>
      ) : isOtherSelected && (
        <input
          name={props.data}
          className="adminInputOther"
          type="text"
          placeholder="Enter other option"
          onChange={handleOtherChange}
        />
      )}
        <select className="adminInput" name={props.data} value={selectedItem} onChange={handleChange}>
        {items.map((item, index) => (
            <option key={index} value={item}>
            {item}
            </option>
        ))}
        <option value="other">Other</option>
        </select>
    </>
  );
};

export default DropdownOrTextField;