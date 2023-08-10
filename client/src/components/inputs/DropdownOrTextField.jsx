import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const DropdownOrTextField = (props) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(''); // Initialize with empty string
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const serverURL = useSelector((state) => state.app.serverURL);
  console.log(props);
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
    setSelectedItem(value);

    if (value === 'other') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : isOtherSelected ? (
        <input
          type="text"
          placeholder="Enter other option"
          value={selectedItem === 'other' ? '' : selectedItem}
          onChange={handleChange}
        />
      ) : (
        <select value={selectedItem} onChange={handleChange}>
        {items.map((item, index) => (
            <option key={index} value={item.value}> {/* Use index as a key */}
            {item}
            </option>
        ))}
        <option value="other">Other</option>
        </select>
      )}
    </div>
  );
};

export default DropdownOrTextField;
