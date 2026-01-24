import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔹 READ – fetch all groceries
  const fetchItems = () => {
    fetch("http://localhost:8080/api/groceries")
      .then(res => res.json())
      .then(data => setItems(data))
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
      fetch("http://localhost:8080/api/groceries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(() => {
          setItemName("");
          setQuantity("");
          fetchItems();
        })
        .catch(err => console.error("Add error:", err));
    }
    // UPDATE
    else {
      fetch(`http://localhost:8080/api/groceries/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(() => {
          setEditingId(null);
          setItemName("");
          setQuantity("");
          fetchItems();
        })
        .catch(err => console.error("Update error:", err));
    }
  };

  // 🔹 EDIT (load values into input)
  const editItem = (item) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setEditingId(item.id);
  };

  // 🔹 DELETE
  const deleteItem = (id) => {
    fetch(`http://localhost:8080/api/groceries/${id}`, {
      method: "DELETE"
    })
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
            <button onClick={() => deleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
