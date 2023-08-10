import React, { useState } from 'react';

function Extra() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const addItem = () => {
    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: parseFloat(itemPrice), selected: false };
      setItems([...items, newItem]);
      setItemName('');
      setItemPrice('');
    }
  }

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };


  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].selected = !updatedItems[index].selected;
    setItems(updatedItems);
  
    const selectedItem = updatedItems[index];
    if (selectedItem.selected) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      const updatedSelectedItems = selectedItems.filter((item) => item !== selectedItem);
      setSelectedItems(updatedSelectedItems);
    }
  };
  

  return (
    <div>
    <section>
    <h2>ADD ITEM</h2>
    <input
      type="text"
      placeholder="Name"
      value={itemName}
      onChange={(e) => setItemName(e.target.value)}
    />
    <input
      type="number"
      placeholder="Price"
      value={itemPrice}
      onChange={(e) => setItemPrice(e.target.value)}
    />
    <button onClick={addItem}>Add</button>
  </section>
      <section>
        <h2>LIST OF ITEMS</h2>
        {items.map((item, index) => (
          <div key={index}>
            <span>{item.name} - ${item.price}</span>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => handleCheckboxChange(index)}
            />
            <button onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
      </section>
      <section>
        <h2>SELECTED ITEMS</h2>
        {selectedItems.map((item, index) => (
          <div key={index}>
            <span>{item.name} - ${item.price}</span>
          </div>
        ))}
        <p>Total Price: ${calculateTotalPrice()}</p>
      </section>
    </div>
  );
}

export default Extra;
