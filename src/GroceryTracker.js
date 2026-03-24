import { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "./services/GroceryService";

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  login-feature
  const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ NEW
  main

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

  const clearForm = () => {
    setItemName("");
    setQuantity("");
    setEditingId(null);
  };

  const saveItem = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      setSuccess("");
      return;
    }
    
    login-feature
    const payload = {
      itemName: itemName.trim(),
    setLoading(true); // ✅ start loading

    addItem({
      itemName,
 main
      quantity: Number(quantity),
      purchased: false
    };

    setLoading(true);

    const request = editingId ? updateItem(editingId, payload) : addItem(payload);

    request
      .then(() => {
        setSuccess(editingId ? "Item updated successfully!" : "Item added successfully!");
        setError("");
login-feature
        clearForm();
        fetchItems();
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => {
        setError(editingId ? "Failed to update item" : "Failed to add item");
        setSuccess("");
      })
      .finally(() => setLoading(false));
  };

  const editItem = (item) => {
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setEditingId(item.id);
    setSuccess("");
    setError("");
  };

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
      <div style={{ marginBottom: "20px", border: "1px solid #ddd", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", backgroundColor: "#fafafa" }}>
        <h3 style={{ marginBottom: "15px", color: "#333" }}>🛒 Grocery Tracker</h3>

        {error && <p style={{ color: "#fff", backgroundColor: "#dc3545", padding: "8px", borderRadius: "5px", marginBottom: "10px" }}>{error}</p>}
        {success && <p style={{ color: "#fff", backgroundColor: "#28a745", padding: "8px", borderRadius: "5px", marginBottom: "10px" }}>{success}</p>}

        <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
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
          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "none", backgroundColor: loading ? "#999" : "#28a745", color: "white", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Saving..." : editingId ? "Update Item" : "➕ Add Item"}
        </button>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h4 style={{ marginBottom: "12px" }}>Grocery List</h4>

        {loading && items.length === 0 ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p style={{ color: "#666" }}>No items yet. Add your first item.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px" }}>Item</th>
                <th style={{ textAlign: "center", borderBottom: "1px solid #eee", padding: "8px" }}>Qty</th>
                <th style={{ textAlign: "right", borderBottom: "1px solid #eee", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "8px" }}>{item.itemName}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    <button onClick={() => editItem(item)} style={{ marginRight: "8px", padding: "4px 8px", borderRadius: "5px", border: "1px solid #007bff", background: "#007bff", color: "white", cursor: "pointer" }}>✏️</button>
                    <button onClick={() => handleDelete(item.id)} style={{ padding: "4px 8px", borderRadius: "5px", border: "1px solid #dc3545", background: "#dc3545", color: "white", cursor: "pointer" }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

        setSuccess("Item added successfully!");

        // ✅ Auto hide success after 2 sec
        setTimeout(() => setSuccess(""), 2000);
      })
      .catch(() => {
        setError("Failed to add item");
        setSuccess("");
      })
      .finally(() => {
        setLoading(false); // ✅ stop loading
      });
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "60px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#fafafa"
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>🛒 Grocery Tracker</h3>

      {/* ❌ ERROR */}
      {error && (
        <p
          style={{
            color: "white",
            backgroundColor: "#dc3545",
            padding: "6px",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {error}
        </p>
      )}

      {/* ✅ SUCCESS */}
      {success && (
        <p
          style={{
            color: "white",
            backgroundColor: "#28a745",
            padding: "6px",
            borderRadius: "6px",
            marginBottom: "10px"
          }}
        >
          {success}
        </p>
      )}

      {/* INPUT - ITEM */}
      <input
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      {/* INPUT - QUANTITY */}
      <input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "#999" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
main
    </div>
  );
}
