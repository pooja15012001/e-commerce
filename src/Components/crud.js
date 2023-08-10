import React, { useState } from "react";

const Crud = () => {
  const [name, setName] = useState();
  const [prize, setPrize] = useState();
  const [value, setValue] = useState([]);
  const [items, setIteams] = useState([]);
  const [totalcal, setTotalcal] = useState(0);
  const handleAdd = () => {
    const selectedItem = { name: name, prize: prize };
    setValue([...value, selectedItem]);
    setName("");
    setPrize("");
  };
  const handleDelete = (index) => {
    const filterdata = value.filter((item, i) => i !== index);
    setValue(filterdata);
  };
  const handleChange = (index) => {
    const updatedItems = value[index];
    if (!items.includes(updatedItems)) {
      setIteams([...items, updatedItems]);
    } else {
      const NEW = items.filter((item) => item !== updatedItems);
      setIteams(NEW);
    }
  };
  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + parseFloat(item.prize), 0);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={prize}
        placeholder="enter your prize"
        onChange={(e) => setPrize(e.target.value)}
      />
      <button onClick={handleAdd}>add item</button>
      {value.map((item, index) => {
        return (
          <div>
            {item.name}={item.prize}
            <input type="checkbox" onChange={() => handleChange(index)} />
            <button onClick={() => handleDelete(index)}>delete</button>
          </div>
        );
      })}
      <div>
        selected items
        <p>
          {items.map((data) => {
            return (
              <div>
                <p>
                  {data?.name}={data?.prize}
                </p>
              </div>
            );
          })}
          <p>Total Price: ${calculateTotalPrice()}</p>
        </p>
      </div>
    </div>
  );
};

export default Crud;
