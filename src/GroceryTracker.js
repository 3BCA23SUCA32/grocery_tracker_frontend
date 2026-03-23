import { useState } from "react";
import { addItem } from "./services/GroceryService";

export default function GroceryTracker() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ NEW

  const handleAdd = () => {
    if (itemName.trim() === "" || quantity === "") {
      setError("Please enter item name and quantity");
      setSuccess(""); // clear success
      return;
    }

    addItem({
      itemName,
      quantity: Number(quantity),
      purchased: false
    })
      .then(() => {
        setItemName("");
        setQuantity("");
        setError("");
        setSuccess("Item added successfully!"); // ✅ NEW
      })
      .catch(() => {
        setError("Failed to add item");
        setSuccess(""); // clear success
      });
  };

  return (
    <div style={{
      width: "300px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h3>Grocery Tracker</h3>

      {/* ✅ ERROR MESSAGE */}
      {error && (
        <p style={{
          color: "white",
          backgroundColor: "red",
          padding: "5px",
          borderRadius: "5px"
        }}>
          {error}
        </p>
      )}

      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <p style={{
          color: "white",
          backgroundColor: "green",
          padding: "5px",
          borderRadius: "5px"
        }}>
          {success}
        </p>
      )}

      <input
        placeholder="Item name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add Item
      </button>
    </div>
  );
}