import React, { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem
} from "./services/GroceryService";


function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔹 READ
  const fetchItems = () => {
    getItems()
      .then(res => setItems(res.data))
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔹 ADD + UPDATE
  const saveItem = () => {
    if (!itemName || !quantity) {
      alert("Enter item name and quantity");
      return;
    }

    const payload = {
      itemName: itemName,
      quantity: Number(quantity),
      purchased: false
    };

    // ADD
    if (editingId === null) {
      addItem(payload)
        .then(() => {
          setItemName("");
          setQuantity("");
          fetchItems();
        })
        .catch(err => console.error("Add error:", err));
    }
    // UPDATE
    else {
      updateItem(editingId, payload)
        .then(() => {
          setEditingId(null);
          setItemName("");
          setQuantity("");
          fetchItems();
        })
        .catch(err => console.error("Update error:", err));
    }
  };

  // 🔹 EDIT
  const editItem = (item) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setEditingId(item.id);
  };

  // 🔹 DELETE
  const handleDelete = (id) => {
    deleteItem(id)
      .then(() => fetchItems())
      .catch(err => console.error("Delete error:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Grocery Tracker</h1>

      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={saveItem}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      <h2>Grocery List</h2>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.itemName} - {item.quantity}{" "}
            <button onClick={() => editItem(item)}>✏️</button>{" "}
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
