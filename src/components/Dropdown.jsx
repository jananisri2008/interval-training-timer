import { useEffect, useState } from "react";
function Dropdown() {
  const initialDropdownData = ["Item 1", "Item 2", "Item 3"];
  const [dropdown, setDropdown] = useState([]);
  const [newItem, setNewItem] = useState("");
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
  return (
    <div className="dropdown">
      <select>
        {dropdown.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
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












