import React, { useState, useEffect } from 'react';
import api from '../../api';

const DropdownOrTextField = (props) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(''); 
  const [otherValue, setOtherValue] = useState(''); 
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.post(`/api/car/getlist`, {
          "data": `${props.data}`,
          ...(props.model && { "model": `${props.model}` })
        });
        setItems(result.data);
        if (result.data.length === 0) {
          setIsOtherSelected(true); // if data is empty, set isOtherSelected to true
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
      ) : (
        <>
          {isOtherSelected ? (
            <>
              <input
                name={props.data}
                className="adminInputOther"
                type="text"
                placeholder="Enter other option"
                onChange={handleOtherChange}
              />
              <button className="mainButtons backFromOther" onClick={() => {setIsOtherSelected(false); setSelectedItem('');}}>Cancel</button>
            </>
          ) : (
            <select className="adminInput" name={props.data} value={selectedItem} onChange={handleChange}>
              {items.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          )}
        </>
      )}
    </>
  );
  
};

export default DropdownOrTextField;