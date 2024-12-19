import { useEffect, useState } from "react"; 

function Dropdown() {
  const initialDropdownData = ["Item 1", "Item 2", "Item 3"];
  const [dropdown, setDropdown] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(""); // State to hold selected item

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setDropdown(initialDropdownData);
  }

  function addItem() {
    if (newItem.trim() !== "" && !dropdown.includes(newItem)) {
      setDropdown([...dropdown, newItem]);
      setNewItem(""); // Clear the input field
    }
  }

  // Handler to update selected item
  function handleSelectionChange(e) {
    setSelectedItem(e.target.value);
  }

  return (
    <div className="dropdown">
      <select onChange={handleSelectionChange} value={selectedItem}>
        <option value="">Select an item</option>
        {dropdown.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {selectedItem && <div className="item-details">Details of {selectedItem}</div>}

      <div className="add-item">
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

export default Dropdown;
