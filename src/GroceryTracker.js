import { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "./services/GroceryService";

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Items
  const fetchItems = () => {
    setLoading(true);
    getItems()
      .then((res) => {
        setItems(res.data || []);
        setError("");
      })
      .catch(() => setError("Unable to load items"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔹 Clear Form
  const clearForm = () => {
    setItemName("");
    setQuantity("");
    setEditingId(null);
  };

  // 🔹 Add / Update Item
  const saveItem = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      setSuccess("");
      return;
    }

    const payload = {
      itemName: itemName.trim(),
      quantity: Number(quantity),
      purchased: false
    };

    setLoading(true);

    const request = editingId
      ? updateItem(editingId, payload)
      : addItem(payload);

    request
      .then(() => {
        setSuccess(
          editingId
            ? "Item updated successfully!"
            : "Item added successfully!"
        );
        setError("");
        clearForm();
        fetchItems();
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => {
        setError(
          editingId
            ? "Failed to update item"
            : "Failed to add item"
        );
        setSuccess("");
      })
      .finally(() => setLoading(false));
  };

  // 🔹 Edit Item
  const editItem = (item) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setEditingId(item.id);
    setError("");
    setSuccess("");
  };

  // 🔹 Delete Item
  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;

    setLoading(true);
    deleteItem(id)
      .then(() => {
        fetchItems();
        setSuccess("Item deleted successfully!");
        setError("");
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => setError("Failed to delete item"))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ width: "420px", margin: "30px auto", fontFamily: "Arial, sans-serif" }}>

      {/* 🔹 Form Section */}
      <div style={{
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fafafa"
      }}>
        <h3 style={{ marginBottom: "15px" }}>🛒 Grocery Tracker</h3>

        {error && <p style={{ color: "white", backgroundColor: "#dc3545", padding: "8px", borderRadius: "5px" }}>{error}</p>}
        {success && <p style={{ color: "white", backgroundColor: "#28a745", padding: "8px", borderRadius: "5px" }}>{success}</p>}

        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <input
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          onClick={saveItem}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: loading ? "#999" : "#28a745",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Saving..." : editingId ? "Update Item" : "➕ Add Item"}
        </button>
      </div>

      {/* 🔹 Table Section */}
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff"
      }}>
        <h4>Grocery List</h4>

        {loading && items.length === 0 ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Item</th>
                <th style={{ textAlign: "center" }}>Qty</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={() => editItem(item)}>✏️</button>
                    <button onClick={() => handleDelete(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
